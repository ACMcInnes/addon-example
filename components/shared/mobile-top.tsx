"use client"

import { faArrowTurnUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


export default function MobileTop() {

    const mobileTop = () => {
        if (typeof window !== 'undefined') {
          window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
          });
        }
      };

  return (
    <button
    onClick={mobileTop}
    className={`flex items-center align-center mt-4 md:hidden`}
  >
   Back to top{" "}
   <FontAwesomeIcon icon={faArrowTurnUp} className="ml-2 py-2 px-4 rounded-md bg-blue-500 text-lg text-white" />
  </button>
  );
}
