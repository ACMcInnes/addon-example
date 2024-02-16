import Link from 'next/link'
import ContactForm from "@/components/dashboard/contact-form";
import Banner from '@/components/dashboard/banner';
import Footer from '@/components/dashboard/footer';

export default function Login() {
  return (
    <>
      <p>Please note, this contact form is not currently monitored and is for testing purposes only</p>
      <p>Return <Link href="/" className="text-sky-500">Home</Link></p>
      <br/>
      <p>Want to provide feedback?</p>
      <ContactForm />
    </>
  );
}
