import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link'

export default function Assets() {
  return (
    <>
      <h2 className="text-2xl font-semibold">- Assets -</h2>
      <section className="align-start px-3 lg:px-24 py-6 max-w-screen-xl">
        <p>
          Profile images generated using{" "} 
          <Link
            className="text-indigo-600 hover:text-indigo-500 dark:text-sky-500 dark:hover:text-sky-400"
            href="https://boringavatars.com/"
            target="_blank"
          >
            Boring Avatars <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
          </Link>
        </p>
        <p>
          Icon library: {" "} 
          <Link
            className="text-indigo-600 hover:text-indigo-500 dark:text-sky-500 dark:hover:text-sky-400"
            href="https://fontawesome.com/"
            target="_blank"
          >
            Font Awesome <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
          </Link>
        </p>
        <p>
          OAuth implemented through: {" "} 
          <Link
            className="text-indigo-600 hover:text-indigo-500 dark:text-sky-500 dark:hover:text-sky-400"
            href="https://authjs.dev/"
            target="_blank"
          >
            Auth.js <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
          </Link>
        </p>        
        <p>
          Markdown renderer: {" "} 
          <Link
            className="text-indigo-600 hover:text-indigo-500 dark:text-sky-500 dark:hover:text-sky-400"
            href="https://markdoc.dev/"
            target="_blank"
          >
            Markdoc <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
          </Link>
        </p>        
      </section>
    </>
  );
}
