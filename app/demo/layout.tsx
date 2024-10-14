import type { Metadata } from "next";
import Link from "next/link";
import Banner from "@/components/dashboard/banner";
import Nav from "@/components/dashboard/nav";
import Footer from "@/components/dashboard/footer";

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
        <h1 className="text-3xl font-semibold">Demo Dashboard</h1>
        <p>
          To see the application with your webstore data{" "}
          <Link href={`/neto/login?type=webstore`} className="text-indigo-600 hover:text-indigo-500 dark:text-sky-500 dark:hover:text-sky-400">
            login
          </Link>
        </p>
        {children}
      </main>
      <Footer/>
    </>
  );
}
