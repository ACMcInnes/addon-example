import type { Metadata } from "next";
import Banner from "@/components/dashboard/banner";
import Nav from "@/components/dashboard/nav";
import Footer from "@/components/dashboard/footer";

export const metadata: Metadata = {
  title: "Resources",
  description: "Addon Resources",
};

export default function ResourcesLayout({
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
        <h2 className="text-base/7 font-semibold text-indigo-600 dark:text-indigo-500">Resources</h2>
        {children}
      </main>
      <Footer/>
    </>
  );
}
