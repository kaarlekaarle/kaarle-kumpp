# Exact Text for Copy-Paste

## Main Page Text (app/page.tsx)

Replace the content inside the `<div className="mt-4 space-y-3...">` with this exact text:

```html
<div className="mt-4 space-y-3 leading-[1.55] text-[16px] text-accent" style={{fontFamily: "'Garamond Premier', 'Times New Roman', serif"}}>
  <p>Everything starts with a question: <em>What are we doing here?</em> Once we agree on the task, I lay out a plan. You need clarity, the right perspective, and the right people. When we&apos;ve got those, we&apos;re halfway there.</p>
  <p>Too often, projects get tangled<br />
  in too many hands, wasted time,<br />
  and money spent. Budgets grow,<br />
  meetings multiply, and the focus shifts<br />
  from solving the problem to justifying the invoices.</p>
  <p>I do the work like it&apos;s mine. If I&apos;m not the man for the job,<br />
  I&apos;ll say so. I don&apos;t drag things out to look busy.<br />
  I don&apos;t bill by the hour. I charge by the solution.</p>
</div>
```

## About Page Text (app/about/page.tsx)

Replace the content inside the `<div className="mt-4 space-y-3...">` with this exact text:

```html
<div className="mt-4 space-y-3 leading-[1.55] text-[16px] text-accent" style={{fontFamily: "'Garamond Premier', 'Times New Roman', serif"}}>
  <p>After working with projects and companies big and small, I&apos;ve gotten good at figuring out the problem and solving it. Setting the direction and finding the right people. What the modern creative business loves – workshops, cheap talk, fetishising the processes – is what I steer away from. I design solutions that outlast me.</p>
  <p>Drawn to simple things that last, both in work and in life. Inspired by photography, internet&apos;s early and future days, crafty people, unorthodox thinking and big trees.</p>
  <p>Lives and works from Helsinki, Finland.</p>
</div>
```

## How to Use

1. **Copy the text above** for the page you want to fix
2. **Open the file** (app/page.tsx or app/about/page.tsx)
3. **Find the div** with `className="mt-4 space-y-3 leading-[1.55] text-[16px] text-accent"`
4. **Replace the entire div content** with the text above
5. **Save the file**
6. **Test the changes**

## Alternative: Use the Script

Run this command in the project root:
```bash
node scripts/fix-line-breaks.js
```

This will automatically update the main page with the correct line breaks.
