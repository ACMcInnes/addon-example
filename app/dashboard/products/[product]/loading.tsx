export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <section className="grid gap-4 grid-cols-3 w-full max-w-screen-xl m-3">
      <div className="col-span-3 md:col-span-2 flex flex-col md:flex-row rounded-md bg-slate-500/50 aspect-[22/2] animate-pulse"></div>
      <div className="col-span-3 md:col-span-2 flex flex-col md:flex-row rounded-md bg-slate-500/50 aspect-[18/20] animate-pulse"></div>
      <div className="col-span-3 md:col-span-1 rounded-md bg-slate-500/50 aspect-[6/10] animate-pulse"></div>
      <div className="col-span-3 mt-4 mb-2 rounded-md bg-slate-500/50 aspect-[18/4] animate-pulse"></div>
      <div className="col-span-3 md:col-span-2 rounded-md bg-slate-500/50 aspect-[22/2] animate-pulse"></div>
    </section>
  );
}
