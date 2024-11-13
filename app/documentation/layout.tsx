import type { Metadata } from "next";
import Banner from "@/components/dashboard/banner";
import Nav from "@/components/dashboard/nav";
import Footer from "@/components/dashboard/footer";
import Sidebar from "@/components/documentation/sidebar";

export const metadata: Metadata = {
  title: "Documentation",
  description: "Addon Documentation",
};

export default function DocumentationLayout({
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
      <main className="flex flex-wrap items-center px-5">
        <h1 className="text-3xl basis-full grow-0 shrink-0 text-center font-semibold">Documentation</h1>
        <Sidebar />
        <section className="!self-stretch basis-full lg:basis-2/3 xl:basis-3/4 grow-1 shrink-0 p-2 max-w-screen-xl">
          {children}
        </section>
      </main>
      <Footer/>
    </>
  );
}
