/* scripts/type-audit.ts */
import fs from "fs";
import path from "path";

const ROOT = process.cwd();
const SCAN_DIRS = ["app","components","styles","lib"].map(p=>path.join(ROOT,p));
const EXT = [".css",".ts",".tsx",".js",".jsx"];

function walk(d:string):string[]{
  let out:string[]=[];
  for(const e of fs.readdirSync(d,{withFileTypes:true})){
    if(e.name==="node_modules"||e.name===".next"||e.name.startsWith(".")) continue;
    const p=path.join(d,e.name);
    if(e.isDirectory()) out.push(...walk(p));
    else if(EXT.includes(path.extname(e.name))) out.push(p);
  }
  return out;
}
const files = SCAN_DIRS.flatMap(walk);

type Hit={file:string; line:number; text:string};
function grep(re:RegExp):Hit[]{
  const hits:Hit[]=[];
  for(const f of files){
    const t=fs.readFileSync(f,"utf8");
    const lines=t.split(/\r?\n/);
    lines.forEach((ln,i)=>{
      if(re.test(ln)) hits.push({file:path.relative(ROOT,f), line:i+1, text:ln.trim()});
    });
  }
  return hits;
}

// Disallow any bold/700 for sans
const cssBold   = grep(/\bfont-weight\s*:\s*(700|bold)\b/i);
const twBold    = grep(/\bfont-(bold|semibold)\b/);
const varWght   = grep(/font-variation-settings\s*:\s*["'][^"']*wght[^"']*["']/i);

// Require canonical right-column rule (weight 400, synthesis none)
const globals = path.join(ROOT,"app/globals.css");
const globalsCss = fs.existsSync(globals)?fs.readFileSync(globals,"utf8"):"";
const rightGuardOk = /\[data-id="right-block"][\s\S]*(h1|h2|a|\.right-sans)[\s\S]*font-weight\s*:\s*400/i.test(globalsCss)
                  && /font-synthesis\s*:\s*none/i.test(globalsCss);

// Require size tokens
const tokens = path.join(ROOT,"styles/tokens.css");
const tokensCss = fs.existsSync(tokens)?fs.readFileSync(tokens,"utf8"):"";
const tokensOk = /--fs-logo:/.test(tokensCss)&&/--fs-right:/.test(tokensCss)&&/--fs-contact:/.test(tokensCss);

// Check that pages use the correct size utilities somewhere (at least once)
const usesFsLogo    = grep(/\bfs-logo\b/).length>0;
const usesFsRight   = grep(/\bfs-right\b/).length>0;
const usesFsContact = grep(/\bfs-contact\b/).length>0;

// Check parity helpers exist
const typeCssPath = path.join(ROOT,"styles/type.css");
const typeCss = fs.existsSync(typeCssPath)?fs.readFileSync(typeCssPath,"utf8"):"";
const parityOk = /\.fs-logo\s+\.serif|\.[\w-]*serif\.fs-logo/.test(typeCss)
              && /\.fs-right\s+\.serif|\.serif\.fs-right/.test(typeCss)
              && /\.fs-contact\.serif|\.serif\.fs-contact/.test(typeCss);

// Report
function table(title:string,h:Hit[]){ console.log(`\n# ${title} (${h.length})`); h.slice(0,100).forEach(x=>console.log(`- ${x.file}:${x.line}  ${x.text}`)); }

table("CSS font-weight 700/bold", cssBold);
table("Tailwind font-bold/semibold", twBold);
table("Variable wght usage", varWght);

if(!rightGuardOk) console.log("\n❌ Missing/weak right-column guard (weight 400 + font-synthesis:none)");
if(!tokensOk)     console.log("\n❌ Missing size tokens --fs-logo/--fs-right/--fs-contact");
if(!parityOk)     console.log("\n❌ Missing serif parity helpers");
if(!(usesFsLogo&&usesFsRight&&usesFsContact)) console.log("\n❌ Size utilities not detected in code (fs-logo/right/contact)");

// Fail conditions
const fail = cssBold.length||twBold.length||varWght.length||!rightGuardOk||!tokensOk||!parityOk||!(usesFsLogo&&usesFsRight&&usesFsContact);
console.log(`\nSUMMARY: ${fail?"FAIL":"PASS"}`);
process.exit(fail?1:0);
