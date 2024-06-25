import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link'

export default function Assets() {
  return (
    <>
      <h2 className="text-2xl font-semibold">- Assets -</h2>
      <section className="align-start px-3 lg:px-24 py-6 max-w-screen-xl">
        <p>
          Profile icons generated using{" "} 
          <Link
            className="text-sky-500 hover:text-sky-600"
            href="https://boringavatars.com/"
            target="_blank"
          >
            Boring Avatars <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
          </Link>
        </p>
      </section>
    </>
  );
}
