import type { Metadata } from "next";
import Banner from "@/components/shared/banner";
import Footer from "@/components/shared/slim-footer";
import Breadcrumbs from "@/components/shared/breadcrumbs";

export const metadata: Metadata = {
  title: "Seller Account",
  description: "Your details",
};

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <header>
        <Banner/>
        <Breadcrumbs />
      </header>
      <main className="flex flex-col items-center px-5">
        <h2 className="mt-12 text-base/7 font-semibold text-indigo-600 dark:text-indigo-500">Seller Account</h2>
        {children}
      </main>
      <Footer/>
    </>
  );
}
