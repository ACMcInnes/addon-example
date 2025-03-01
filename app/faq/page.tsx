import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import Link from 'next/link';

export default function Faq() {
  return (
    <section>
      <h1 className="mx-auto text-center mt-2 mb-8 text-balance text-4xl font-semibold text-gray-900 dark:text-gray-100 sm:text-5xl">
        Frequently Asked Questions
      </h1>
      <p className="mt-4 text-center">Got a question? check out the below commonly asked questions</p>

      <div className="h-full w-full py-8 px-4">
        <div className="mx-auto w-full sm:min-w-[512px] max-w-lg divide-y divide-gray-300 dark:divide-white/5 rounded-xl transition-colors bg-gray-100 dark:bg-white/5 border dark:border-transparent border-gray-300">
          
          <Disclosure as="div" className="p-6" defaultOpen={true}>
            <DisclosureButton className="group flex w-full items-center justify-between">
              <span className="text-sm/6 font-medium text-black hover:text-black/80 dark:text-white dark:group-data-hover:text-white/80">
                What is the Neto Addon Example?
              </span>
              <FontAwesomeIcon icon={faChevronDown} className="size-5 fill-white/60 group-data-hover:fill-white/50 group-data-open:rotate-180" />
            </DisclosureButton>
            <DisclosurePanel 
              transition
              className="mt-4 text-sm/5 text-black/50 dark:text-white/50 origin-top transition duration-200 ease-out data-closed:-translate-y-6 data-closed:opacity-0"
            >
              This is a work in progress / proof for how a Neto Addon may be developed and how it can function
            </DisclosurePanel>
          </Disclosure>

          <Disclosure as="div" className="p-6">
            <DisclosureButton className="group flex w-full items-center justify-between">
              <span className="text-sm/6 font-medium text-black hover:text-black/80 dark:text-white dark:group-data-hover:text-white/80">
                Is this officially supported by Neto?
              </span>
              <FontAwesomeIcon icon={faChevronDown} className="size-5 fill-white/60 group-data-hover:fill-white/50 group-data-open:rotate-180" />
            </DisclosureButton>
            <DisclosurePanel 
              transition
              className="mt-4 text-sm/5 text-black/50 dark:text-white/50 origin-top transition duration-200 ease-out data-closed:-translate-y-6 data-closed:opacity-0"
            >
              No. This is a 3rd party application which connects to Neto via its API and OAuth authentication method
            </DisclosurePanel>
          </Disclosure>

          <Disclosure as="div" className="p-6">
            <DisclosureButton className="group flex w-full items-center justify-between">
              <span className="text-sm/6 font-medium text-black hover:text-black/80 dark:text-white dark:group-data-hover:text-white/80">
                What does the Addon Do?
              </span>
              <FontAwesomeIcon icon={faChevronDown} className="size-5 fill-white/60 group-data-hover:fill-white/50 group-data-open:rotate-180" />
            </DisclosureButton>
            <DisclosurePanel 
              transition
              className="mt-4 text-sm/5 text-black/50 dark:text-white/50 origin-top transition duration-200 ease-out data-closed:-translate-y-6 data-closed:opacity-0"
            >
              At the moment, not much. You can log in with your Webstore URL and retrieve some product information. Additional features will be added over time 
            </DisclosurePanel>
          </Disclosure>

          <Disclosure as="div" className="p-6">
            <DisclosureButton className="group flex w-full items-center justify-between">
              <span className="text-sm/6 font-medium text-black hover:text-black/80 dark:text-white dark:group-data-hover:text-white/80">
                When will the Addon be released?
              </span>
              <FontAwesomeIcon icon={faChevronDown} className="size-5 fill-white/60 group-data-hover:fill-white/50 group-data-open:rotate-180" />
            </DisclosureButton>
            <DisclosurePanel 
              transition
              className="mt-4 text-sm/5 text-black/50 dark:text-white/50 origin-top transition duration-200 ease-out data-closed:-translate-y-6 data-closed:opacity-0"
            >
              There are currently no plans for this to be officially released
            </DisclosurePanel>
          </Disclosure>

          <Disclosure as="div" className="p-6">
            <DisclosureButton className="group flex w-full items-center justify-between">
              <span className="text-sm/6 font-medium text-black hover:text-black/80 dark:text-white dark:group-data-hover:text-white/80">
                How much does it cost?
              </span>
              <FontAwesomeIcon icon={faChevronDown} className="size-5 fill-white/60 group-data-hover:fill-white/50 group-data-open:rotate-180" />
            </DisclosureButton>
            <DisclosurePanel 
              transition
              className="mt-4 text-sm/5 text-black/50 dark:text-white/50 origin-top transition duration-200 ease-out data-closed:-translate-y-6 data-closed:opacity-0"
            >
              Until the Addon is officially released there is no charge for using this application
            </DisclosurePanel>
          </Disclosure>          

        </div>
      </div>

      <div className="relative flex flex-col place-items-center mt-4 py-8 border-t-2 border-indigo-600 dark:border-indigo-500">
        <p>Have a question that isn&apos;t listed above?</p>
        <Link href={`/contact`} className="block mt-2 py-2 px-4 rounded-md text-gray-100 bg-indigo-600 hover:bg-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-400 border-transparent">
          Contact Us
        </Link>
      </div>

    </section>
  );
}
