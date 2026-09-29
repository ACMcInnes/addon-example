import Link from 'next/link'
import ContactForm from "@/components/shared/contact-form";

export default function Contact() {
  return (
    <section className="w-full max-w-(--breakpoint-xl)">
      <h1 className="mx-auto text-center mt-2 text-balance text-4xl font-semibold tracking-tight text-indigo-600 dark:text-indigo-500 sm:text-5xl">
        Contact
      </h1>
      <div className="mx-auto my-8 text-center text-balance">
        <p className="mx-auto max-w-2xl">
          During the beta testing period we may not be able to get back to every
          message. Thanks for your support and understanding! Have a question?
          Check out our{" "}
          <Link
            href="/faq"
            className="text-indigo-600 hover:text-indigo-500 dark:text-indigo-500 dark:hover:text-indigo-400"
          >
            FAQs
          </Link>{" "}
          first.
        </p>
        <br />
        <p>Want to provide feedback?</p>
        <ContactForm />
      </div>
    </section>
  );
}
