import type { Metadata } from "next";
import Banner from "@/components/shared/banner";
import Footer from "@/components/shared/slim-footer";

export const metadata: Metadata = {
  title: "Account",
  description: "Your details",
};

export default function BetterAuthServerTestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <header>
        <Banner/>
      </header>
      <main className="flex flex-col items-center px-5">
        <h2 className="text-base/7 font-semibold text-indigo-600 dark:text-indigo-500">Account</h2>
        {children}
      </main>
      <Footer/>
    </>
  );
}
