'use client'

import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { faArrowRightFromBracket, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

export default function Sidebar({ children }: { children: React.ReactNode }) {
  const [sidebar, setSidebar] = useState(true);

  return (
    <aside className={`!self-stretch grow-0 shrink-1 basis-full p-2 ${sidebar ? 'lg:basis-1/3' : 'lg:basis-auto'}`}>
      <Popover className="group h-full mx-auto lg:hidden max-w-md p-2">
        <PopoverButton className="w-full lg:w-max py-3 text-gray-100 bg-indigo-600 dark:bg-indigo-500">
          Addon Documentation{" "}<FontAwesomeIcon icon={faChevronRight} className="ml-4 group-data-[open]:rotate-90" />
        </PopoverButton>
        <PopoverPanel className="flex flex-col">
        {children}
        </PopoverPanel>
      </Popover>
      {/* 
        Could make the following div sticky depending on how long the documentation menu gets 
         - remove 'h-full'
         - move border to '<aside>' and adjust padding
         - add a 'top' value to the sticky div for the fixed offset
      */}
      <div className="hidden lg:flex lg:flex-col h-full max-w-md p-2 pr-4 border-r-2 border-neutral-200 dark:border-slate-800">
        <div className={`flex flex-row ${sidebar ? 'justify-between items-center' : 'justify-end'}`}>
          <p className={`${sidebar ? '' : 'hidden'}`}>Addon Documentation</p>
          <button
            title="Toggle Sidebar"
            className="text-xl text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
            onClick={() => setSidebar(!sidebar)}
          >
            <FontAwesomeIcon
              icon={faArrowRightFromBracket}
              className={`${sidebar && "rotate-180"}`}
            />
          </button>
        </div>
        <div className={`${sidebar ? '' : 'hidden'}`}>
          {children}
        </div>
      </div>
    </aside>
  );
}
