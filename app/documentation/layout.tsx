import type { Metadata } from "next";
import Banner from "@/components/shared/banner";
import Nav from "@/components/shared/nav";
import Footer from "@/components/shared/footer";
import Sidebar from "@/components/documentation/sidebar";
import SidebarContent from "@/components/documentation/sidebar-content";

import { library } from '@fortawesome/fontawesome-svg-core';
import { faArrowsRotate, faCode, faNotdef, faRocket } from '@fortawesome/free-solid-svg-icons';

library.add(faArrowsRotate, faCode, faRocket, faNotdef);

export const metadata: Metadata = {
  title: "Seller Documentation",
  description: "Commerce Sommelier Seller Documentation",
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
      <main className="flex flex-wrap lg:flex-nowrap items-center px-5 w-full mx-auto max-w-(--breakpoint-xl)">
        <Sidebar>
          <SidebarContent />
        </Sidebar> 
        <section className="w-full break-words text-pretty self-stretch! grow-1 shrink-1 p-2 pl-4">
          {children}
        </section>
      </main>
      <Footer/>
    </>
  );
}
