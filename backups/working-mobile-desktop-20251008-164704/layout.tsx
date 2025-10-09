import type { Metadata } from "next";
import "./globals.css";
import { sans, serif } from "./fonts";
import "../public/desktop.css";
import "../public/mobile.css";

export const metadata: Metadata = {
  title: "Kaarle & Kumpp.",
  description: "Problem solving and storytelling.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${sans.variable} ${serif.variable} font-sans`} data-page="home">
        {/* Debug toggles: press "d" for basic debug, Shift+D for strong debug overlay */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(){
                try{
                  var q = new URLSearchParams(window.location.search);
                  if (q.get('debug') === '1') document.documentElement.classList.add('debug');
                  if (q.get('debug') === '2') document.body.classList.add('debug-on');

                  window.addEventListener('keydown', function(e){
                    if (e.key.toLowerCase() === 'd' && !(e.metaKey || e.ctrlKey || e.altKey)) {
                      if (e.shiftKey) {
                        // Shift+D: Toggle strong debug overlay
                        document.body.classList.toggle('debug-on');
                      } else {
                        // D: Toggle basic debug
                        document.documentElement.classList.toggle('debug');
                      }
                    }
                  }, {passive:true});
                }catch(err){}
              })();
            `,
          }}
        />
        <div className="site-frame">
          {children}
        </div>
      </body>
    </html>
  );
}