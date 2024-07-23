export default function ThumbLoader({ index }: {
    index: number;
  }) {
    return (
        <section key={index} className="flex flex-col md:flex-row rounded-md my-6 bg-slate-500/50 aspect-[4/5] md:aspect-[7/4] animate-pulse"></section>
    );
}
  