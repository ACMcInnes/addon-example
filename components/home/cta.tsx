import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartSimple, faDollarSign, faEarthOceania, faRocket } from "@fortawesome/free-solid-svg-icons";

const ctas = [
  { name: 'Australian Based', description: 'Locally grown and sourced by a Brisbane | Meanjin based developer', icon: faEarthOceania },
  { name: 'No Upfront Cost', description: 'Free to use while application is in beta', icon: faDollarSign },
  { name: 'Lighting Fast', description: 'Access your content quick', icon: faRocket },
  { name: 'Your Data', description: 'We won\'t sell your data, run it through AI, or laugh at anything awkward we see', icon: faChartSimple },
]
  
export default function Cta() {
  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-5">
          <div className="col-span-2">
            <h2 className="mt-2 text-4xl font-semibold tracking-tight text-pretty sm:text-5xl text-indigo-600 dark:text-indigo-500">
              Why a Commerce Sommelier
            </h2>
            <p className="mt-6 text-base/7 text-gray-700 dark:text-gray-300">
              Stop making customers search for what they want, instead ask them what they want. Just &quot;Ask Gus&quot;.
            </p>
          </div>
          <dl className="col-span-3 grid grid-cols-1 gap-x-8 gap-y-10 text-base/7 text-gray-600 sm:grid-cols-2 lg:gap-y-16 dark:text-gray-400">
            {ctas.map((cta) => (
              <div key={cta.name} className="relative pl-9">
                <dt className="font-semibold text-gray-900 dark:text-white">
                  <FontAwesomeIcon
                    aria-hidden="true"
                    className="absolute top-1 left-0 !size-5 text-indigo-500 dark:text-indigo-400"
                    icon={cta.icon}
                  />
                  {cta.name}
                </dt>
                <dd className="mt-2">{cta.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}
