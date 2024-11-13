import Link from 'next/link'
import ContactForm from "@/components/dashboard/contact-form";

export default function Contact() {
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
