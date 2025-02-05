export default function ContentListLoader() {
  return (
    <div className="mb-4">
      <div className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <div className="rounded-md bg-slate-500/50 aspect-20/2 max-w-1/3 animate-pulse"></div>
            <div className="mt-2 rounded-md bg-slate-500/50 aspect-22/2 max-w-2/3 animate-pulse"></div>
          </div>
          <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
            <div className="rounded-md bg-slate-500/50 aspect-4/2 w-24 animate-pulse"></div>
          </div>
        </div>
        <div className="-mx-4 mt-8 sm:-mx-0">
          <div className="rounded-md bg-slate-500/50 aspect-8/4 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}
