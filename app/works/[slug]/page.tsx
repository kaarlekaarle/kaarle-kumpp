type Props = { params: { slug: string } };
export default function Client({ params }: Props) {
  return (
    <main className="container min-h-[70vh] mt-10">
      <h1 className="text-2xl">{params.slug}</h1>
      <div className="mt-6 h-[420px] w-full max-w-3xl bg-black" />
      <p className="mt-4 max-w-2xl text-sm text-neutral-700">Summary placeholder.</p>
    </main>
  );
}
