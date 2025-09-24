import Link from "next/link";

export default function NotFound() {
  return (
    <main className="container min-h-[60vh] grid place-items-center text-center">
      <div>
        <h1 className="text-2xl">Page not found</h1>
        <p className="mt-2 text-sm text-neutral-700">Try the Works or About pages.</p>
        <p className="mt-4"><Link className="underline" href="/works">Works</Link> · <Link className="underline" href="/about">About</Link></p>
      </div>
    </main>
  );
}
