import Link from 'next/link'
import ContactForm from "@/components/shared/contact-form";

export default function Contact() {
  return (
    <section className="w-full max-w-(--breakpoint-xl)">
      <h1 className="mx-auto text-center mt-2 text-balance text-4xl font-semibold tracking-tight text-gray-900 dark:text-gray-100 sm:text-5xl">
        Contact Us
      </h1>
    <div className="mx-auto my-8 text-center">
      <p>Please note, this contact form is not currently monitored and is for testing purposes only</p>
      <p>Have a question? Check out our <Link href="/faq" className="text-indigo-600 hover:text-indigo-500 dark:text-indigo-500 dark:hover:text-indigo-400">FAQs</Link></p>
      <br/>
      <p>Want to provide feedback?</p>
      <ContactForm />
    </div>
    </section>
  );
}
