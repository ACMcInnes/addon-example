import type { Metadata } from "next";
import Banner from "@/components/shared/banner";
import Nav from "@/components/shared/nav";
import Footer from "@/components/shared/footer";
import User from "@/components/dashboard/user";

export const metadata: Metadata = {
  title: "Addon Dashboard",
  description: "A webstore addon dashboard",
};

export default function DashboardLayout({
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
        <User />
        <section className="align-start lg:px-24 pb-6 w-full max-w-screen-xl">
          <h1 className="mx-auto max-w-2xl sm:px-6 lg:max-w-7xl lg:px-8 text-base/7 font-semibold text-indigo-500 dark:text-indigo-400">Dashboard</h1>
          {children}
        </section>
      </main>
      <Footer/>
    </>
  );
}
