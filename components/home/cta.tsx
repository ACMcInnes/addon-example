import Link from "next/link";
import Image from "next/image";

const ctas = [
  { name: 'Australian Based', description: 'Locally grown and sourced by a Brisbane based developer' },
  { name: 'No Upfront Cost', description: 'Free to use while application is in beta' },
  { name: 'Lighting Fast', description: 'Access your content quick' },
  { name: 'You\'re still reading this?', description: 'Click one of the buttons below or keep on scrolling then' },
]
  
export default function Cta() {
  return (
    <div className="mt-12 w-full max-w-(--breakpoint-xl)">
      <div className="mx-auto grid max-w-2xl grid-cols-1 items-center gap-x-8 gap-y-16 px-0 py-24 sm:px-6 sm:py-32 lg:max-w-7xl lg:grid-cols-2 lg:px-8">
        <div>
          <h2 className="text-base/7 text-left font-semibold text-indigo-600 dark:text-indigo-500">
            You&apos;re still here?
          </h2>
          <p className="text-3xl mt-2 font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl">Get Connected</p>
          <p className="mt-4 text-gray-500 dark:text-gray-400">
            If you are reading this you either scrolled down really quickly and don&apos;t know whats going on, or you&apos;re very interested in the Neto Addon Example application.
            That&apos;s great! Lets keep this good thing going and create your account.
          </p>
          <dl className="mt-10 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-12 lg:gap-x-8">
            {ctas.map((cta) => (
              <div key={cta.name} className="border-t border-gray-200 pt-4">
                <dt className="font-medium text-gray-900 dark:text-gray-100">{cta.name}</dt>
                <dd className="mt-2 text-sm text-pretty text-gray-500 dark:text-gray-400">{cta.description}</dd>
              </div>
            ))}
            <div className="justify-items-center sm:justify-items-end">
              <Link href={`/documentation/getting-started`} className="block py-2 px-4 rounded-md text-gray-100 bg-indigo-600 hover:bg-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-400 border-transparent">Get Started</Link>
            </div>
            <div className="justify-items-center -mt-6 sm:justify-items-start sm:mt-0">
              <Link href={`/neto/login?type=webstore`} className="block py-2 px-4 rounded-md text-indigo-600 hover:text-indigo-500 dark:text-indigo-500 dark:hover:text-indigo-400 border-transparent">Login</Link>
            </div>
          </dl>
        </div>
        <div className="grid grid-cols-2 grid-rows-2 gap-4 sm:gap-6 lg:gap-8">
          <Image
            src={`/am_logo.svg`}
            width={248}
            height={120}
            alt="CTA 1"
            className={`w-full rounded-lg bg-neutral-100 dark:bg-[rgb(225_214_196)] px-4 py-20 dark:invert`}
          />
          <Image
            src={`/am_logo.svg`}
            width={248}
            height={120}
            alt="CTA 2"
            className={`w-full rounded-lg bg-neutral-100 dark:bg-[rgb(225_214_196)] px-4 py-20 dark:invert`}
          />
          <Image
            src={`/am_logo.svg`}
            width={248}
            height={120}
            alt="CTA 3"
            className={`w-full rounded-lg bg-neutral-100 dark:bg-[rgb(225_214_196)] px-4 py-20 dark:invert`}
          />
          <Image
            src={`/am_logo.svg`}
            width={248}
            height={120}
            alt="CTA 4"
            className={`w-full rounded-lg bg-neutral-100 dark:bg-[rgb(225_214_196)] px-4 py-20 dark:invert`}
          />
        </div>
      </div>
    </div>
  )
}
