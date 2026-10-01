import { Metadata } from 'next';
import Link from 'next/link'

export const metadata: Metadata = {
  title: "Case Studies | Resources",
  description: "See who is using Commerce Sommelier",
};

export default function CaseStudies() {
  return (
    <>
      <p>Case Studies</p>
      <p>Return <Link href="/" className="text-sky-500">Home</Link></p>
    </>
  );
}
