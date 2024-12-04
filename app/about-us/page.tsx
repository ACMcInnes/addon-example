import Link from 'next/link'

import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Avatar from 'boring-avatars';

const people = [
  {
    name: 'Andrew McInnes',
    avatar: 'Andrew McInnes',
    email: 'andrew.mcinnes@example.com',
    role: 'Founder / CEO',
    note: '\"Big Dog\"',
    endorsement: 'When life gave me lemons, I made lemonade. Then with a bright idea, and lots of trust fund money - I turned that lemonade into the most popular drink in Australia!',
  },
  {
    name: 'Andrew McInnes',
    avatar: 'Coretta Scott',
    email: 'coretta.scott@example.com',
    role: 'Director of Product',
    note: 'Watch Q4 for some exciting updates!',
    endorsement: 'People always ask me what its like working for Andrew, and I always tell em the same thing - it\'s OK',
  },  
  {
    name: 'Andrew McInnes',
    avatar: 'Maya Angeloun',    
    email: 'maya.angeloun@example.com',
    role: 'Lead Developer',
    note: 'Currently 3 sprints behind schedule',
    endorsement: 'Developing software is my passion, and leading people to develop software is also one of my passions, I can have two passions!',
  },
  {
    name: 'Andrew McInnes',
    avatar: 'Virginia Apgar',    
    email: 'virginia.apgar@example.com',
    role: 'Research & Development',
    note: 'What can ChatGPT build for us next?',
    endorsement: '\"ChatGPT, write an endorsement outlining how amazing I think the company is, thanks\"',
  },
  {
    name: 'Andrew McInnes',
    avatar: 'Pearl Kendrick',
    email: 'pearl.kendrick@example.com',
    role: 'Leg Man',
    note: 'Whatever your need Boss',
    endorsement: 'Whatever you need Boss',
  },
  {
    name: 'Andrew McInnes',
    avatar: 'Mother Frances',
    email: 'mother.frances@example.com',
    role: 'Highly Decorated Dog Walker',
    note: 'Have you every tried walking with 4 golden retrievers strapped to your waist',
    endorsement: 'Andrew and the team have a lot of dogs as pets, I like to hang around the office in the morning and collect them. Sometimes I even bring them back',
  },
  {
    name: 'Andrew McInnes',
    avatar: 'Harriet Tubman',
    email: 'harriet.tubman@example.com',
    role: 'Astronaut',
    note: 'In space, no one could hear my really bad dad jokes',
    endorsement: 'Nothing prepares you for the vast, dark, emptiness of space. Compared to that its really great working here',
  },
  {
    name: 'Andrew McInnes',
    avatar: 'Maria Mitchell',
    email: 'maria.mitchell@example.com',
    role: 'Bitcoin Miner',
    note: 'Should have got into Ethereum...',
    endorsement: 'Andrew hasn\'t noticed the GPU bank I\'ve setup in the backroom',
  },   
]

export default function About() {
  return (
    <section>
      <h1 className="mx-auto text-center mt-2 text-balance text-4xl font-semibold tracking-tight text-gray-900 dark:text-gray-100 sm:text-5xl">
        About Us
      </h1>
      <p className="mt-10">
        McInnes Design is a boutique design and development agency based in Brisbane, Australia. Starting off as a passion project, founder Andrew McInnes quickly got to work growing the team and expanding the business.
        Bringing in the best of the best was critical to their initial success.
      </p>
      <p className="mt-4">  
        Working with clients of all shapes and sizes McInnes Design quickly established itself as a key player in the Brisbane market.
        From there, global fame and renown followed. Then...
      </p>
      <p className="mt-4 text-gray-500 dark:text-gray-400">
        <span className="align-top">*</span> I Actually haven&apos;t founded anything. This <span className="italic">is</span> a passion project of mine, buts it&apos;s something being done in my spare time.
      </p>

      <h2 className="text-2xl font-semibold mt-12 mb-2">Meet The Team</h2>

      <ul role="list" className="divide-y divide-gray-300">
        {people.map((person) => (
          <li key={person.email} className="flex justify-between gap-x-6 py-5">
            <div className="flex min-w-0 gap-x-4">
              <Avatar name={person.avatar} variant="beam" size={50} colors={["#FFBF00", "#F53BAD", "#03B6FC", "#18D256"]} className="flex-none" />
              <div className="min-w-0 flex-auto">
                <p className="text-sm/6 font-semibold text-gray-800 dark:text-gray-100">{person.name}</p>
                <p className="mt-1 truncate text-xs/5 text-gray-500 dark:text-gray-400">{person.note}</p>
              </div>
            </div>
            <div className="shrink-0 flex flex-col items-end">
              <p className="text-sm/6 text-gray-800 dark:text-gray-100">{person.role}</p>
              <p className="mt-1 text-xs/5 text-gray-500">{person.email}</p>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-12 px-12 py-32 text-white text-center bg-gradient-to-br from-indigo-800 from-40% to-indigo-600 dark:from-indigo-900 dark:to-indigo-950 rounded-2xl">
        <p className="text-lg font-semibold">&quot;I'll kidnap a thousand children before I let this company die&quot;</p>
        <p className="mt-3">Henry J. Waternoose III</p>
        <p className="text-sm/5 text-gray-300">&#40;Inspirational quote of the day&#41;</p>
      </div>

      <h2 className="text-2xl font-semibold mt-16 mb-8">Endorsements</h2>

      <ul role="list" className="grid gap-x-8 gap-y-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {people.map((person) => (
          <li key={person.name}>
            <div className="flex flex-col items-center gap-x-6">
            <Avatar name={person.avatar} variant="beam" colors={["#FFBF00", "#F53BAD", "#03B6FC", "#18D256"]} square className="flex-none size-full rounded-2xl" />
              <div className="text-center">
                <h3 className="mt-4 text-base/7 font-semibold tracking-tight">{person.name}</h3>
                <p className="text-sm/6 font-semibold text-gray-500">{person.role}</p>
                <p className="mt-3 text-sm/6 text-pretty text-gray-700 dark:text-gray-300">{person.endorsement}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <p className="mt-16 text-lg text-center text-pretty">A Neto integration developed by{" "}<Link href="https://acmcinnes.au" target="_blank" className="text-indigo-600 hover:text-indigo-500 dark:text-indigo-500 dark:hover:text-indigo-400">Andrew McInnes <FontAwesomeIcon icon={faArrowUpRightFromSquare} /></Link></p>

    </section>
  );
}
