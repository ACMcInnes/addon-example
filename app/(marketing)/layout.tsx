import type { Metadata } from "next";
import Banner from "@/components/shared/banner";
import Nav from "@/components/shared/nav";
import Footer from "@/components/shared/footer";

export const metadata: Metadata = {
  title: {
    template: '%s | Commerce Sommelier',
    default: 'Commerce Sommelier'
  },
  description: "Meet Gustave, a shopping experience curator ready to push your products to the customers that need them the most",
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
        {children}
      </main>
      <Footer/>
    </>
  );
}
