import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import Link from 'next/link';

const seller = [
  {
    key: 'seller-1',
    question: 'Why do I need a Commerce Sommelier',
    answer: 'The web is changing, most product discovery is done via AI now. If your products aren\'t in that answer you miss out. A Commerce Sommelier helps surface your products, to the right people, when they need them.',
  },
  {
    key: 'seller-2',
    question: 'How is Gustave a Commerce Sommelier',
    answer: 'Once you approve your product catalogue, Gus will build out a personalisation map that links your products to a customers needs. So your products show up exactly when a customer is ready to buy.',
  },
  {
    key: 'seller-3',
    question: 'What is the setup time',
    answer: 'Get setup in minutes. Connect your webstore using your existing commerce platform account and Gus will do the rest. No manual uploads or mapping. Everything syncs automatically.',
  },
  {
    key: 'seller-4',
    question: 'Is Gustave free to use',
    answer: 'Yes, we have a \'Basic\' seller plan to get you started. Once you start outgrowing those limits you can consider moving onto a paid plan.',
  },
];

const buyer = [
  {
    key: 'buyer-1',
    question: 'What is a Commerce Sommelier',
    answer: 'A Commerce Sommelier is a broad term for something or someone that helps you make an informed shopping decision while shopping online',
  },
  {
    key: 'buyer-2',
    question: 'Is it \'Gustave\' or \'Gus\'',
    answer: 'Both, we wanted Commerce Sommelier to be as approachable as possible. Need something a bit more high brow? Gustave knows the best designers. Need something quick and no frills? Gus knows all the locals.',
  },
  {
    key: 'buyer-3',
    question: 'Do I need an account',
    answer: 'No, you only need an account if you want to sell your products on Commerce Sommelier. If you just want to buy something all you have to do is \'Ask Gus\'',
  },
    {
    key: 'buyer-4',
    question: 'Is it secure',
    answer: 'Yes, if you decide to buy something off Commerce Sommelier you are directed to the sellers official webstore. We only partner with trusted and verified sellers, on trusted ecommerce platforms.',
  },
];

export default function Faq() {
  return (
    <section>
      <h1 className="mx-auto text-center mt-2 mb-8 text-balance text-4xl font-semibold text-indigo-600 dark:text-indigo-500 sm:text-5xl">
        FAQs
      </h1>
      <p className="mt-4 text-center">Seller Questions - what you need to know to sell on Commerce Sommelier</p>

      <div className="h-full w-full py-8 px-4">
        <div className="mx-auto w-full sm:min-w-[512px] max-w-lg divide-y divide-gray-300 dark:divide-white/5 rounded-xl transition-colors bg-gray-100 dark:bg-white/5 border dark:border-transparent border-gray-300">
          {seller.map((faq, index) => (
            <Disclosure as="div" className="p-6" defaultOpen={index ? false : true} key={faq.key}>
              <DisclosureButton className="group flex w-full items-center justify-between">
                <span className="text-sm/6 font-medium text-black hover:text-black/80 dark:text-white dark:group-data-hover:text-white/80">
                  {faq.question}
                </span>
                <FontAwesomeIcon icon={faChevronDown} className="size-5 fill-white/60 group-data-hover:fill-white/50 group-data-open:rotate-180" />
              </DisclosureButton>
              <DisclosurePanel 
                transition
                className="mt-4 text-sm/5 text-black/50 dark:text-white/50 origin-top transition duration-200 ease-out data-closed:-translate-y-6 data-closed:opacity-0"
              >
                {faq.answer}
              </DisclosurePanel>
            </Disclosure>
          ))}
        </div>
      </div>

      <p className="mt-4 text-center">Buyer Questions - what you need to know to buy from Commerce Sommelier</p>

      <div className="h-full w-full py-8 px-4">
        <div className="mx-auto w-full sm:min-w-[512px] max-w-lg divide-y divide-gray-300 dark:divide-white/5 rounded-xl transition-colors bg-gray-100 dark:bg-white/5 border dark:border-transparent border-gray-300">
          {buyer.map((faq, index) => (
            <Disclosure as="div" className="p-6" defaultOpen={index ? false : true} key={faq.key}>
              <DisclosureButton className="group flex w-full items-center justify-between">
                <span className="text-sm/6 font-medium text-black hover:text-black/80 dark:text-white dark:group-data-hover:text-white/80">
                  {faq.question}
                </span>
                <FontAwesomeIcon icon={faChevronDown} className="size-5 fill-white/60 group-data-hover:fill-white/50 group-data-open:rotate-180" />
              </DisclosureButton>
              <DisclosurePanel 
                transition
                className="mt-4 text-sm/5 text-black/50 dark:text-white/50 origin-top transition duration-200 ease-out data-closed:-translate-y-6 data-closed:opacity-0"
              >
                {faq.answer}
              </DisclosurePanel>
            </Disclosure>
          ))}
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
