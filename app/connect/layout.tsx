import type { Metadata } from "next";
import Banner from "@/components/shared/banner";
import Nav from "@/components/shared/nav";
import Footer from "@/components/shared/footer";

export const metadata: Metadata = {
  title: "Platforms",
  description: "Learn how to connect your ecommerce platform to the Commerce Sommelier",
};

export default function FaqLayout({
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
        {children}
      </main>
      <Footer/>
    </>
  );
}
