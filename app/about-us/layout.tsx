import type { Metadata } from "next";
import Banner from "@/components/shared/banner";
import Nav from "@/components/shared/nav";
import Footer from "@/components/shared/footer";

export const metadata: Metadata = {
  title: "About Us",
  description: "About Us",
};

export default function AboutUsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <header>
        <Banner/>
        <Nav/>
      </header>
      <main className="flex flex-col items-center px-5">
        <h2 className="text-base/7 font-semibold text-indigo-600 dark:text-indigo-500">Unlock a bounty of company secrets</h2>
        <section className="align-start px-3 lg:px-24 pb-6 w-full max-w-(--breakpoint-xl)">
          {children}
        </section>
      </main>
      <Footer/>
    </>
  );
}
