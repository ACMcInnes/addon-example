import type { Metadata } from "next";
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
      <Banner/>
      <Nav/>
      <main className="flex min-h-screen flex-col items-center justify-between">
        <h1 className="text-3xl font-semibold">Dashboard</h1>
        {children}
      </main>
      <Footer/>
    </>
  );
}
