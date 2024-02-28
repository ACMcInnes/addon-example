import Link from 'next/link'

import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function About() {
  return (
    <>
      <p className="mt-4">Developed by <Link href="https://acmcinnes.au" target="_blank" className="text-sky-500">Andrew McInnes <FontAwesomeIcon icon={faArrowUpRightFromSquare} /></Link></p>
    </>
  );
}
