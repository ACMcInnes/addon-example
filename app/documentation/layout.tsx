import type { Metadata } from "next";
import Banner from "@/components/shared/banner";
import Nav from "@/components/shared/nav";
import Footer from "@/components/shared/footer";
import Sidebar from "@/components/documentation/sidebar";
import SidebarContent from "@/components/documentation/sidebar_content";

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
      <h2 className="w-full text-center text-base/7 font-semibold text-indigo-600 dark:text-indigo-500">Documentation</h2>
      <main className="flex flex-wrap lg:flex-nowrap items-center px-5 w-full mx-auto max-w-screen-xl">
        <Sidebar>
          <SidebarContent />
        </Sidebar> 
        <section className="w-full break-words text-pretty !self-stretch grow-1 shrink-1 p-2 pl-4">
          {children}
        </section>
      </main>
      <Footer/>
    </>
  );
}
