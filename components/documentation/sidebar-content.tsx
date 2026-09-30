import { getMarkdoc } from "app/documentation/utils";
import { CloseButton } from "@headlessui/react";
import { PopoverLink } from "./popover-link";

export default function SidebarContent() {
  let pages = getMarkdoc();
  return (
    <ul className="mt-4 ml-4 space-y-5">
      <li key={`documentation`}>
        <CloseButton as={PopoverLink}
          href="/documentation"
          className="text-indigo-600 hover:text-indigo-500 dark:text-indigo-500 dark:hover:text-indigo-400"
        >
          Home
        </CloseButton>
      </li>
      {pages.map((page) => (
        <li key={`${page.slug}`}>
          <CloseButton as={PopoverLink}
            href={`/documentation/${page.slug}`}
            className="text-indigo-600 hover:text-indigo-500 dark:text-indigo-500 dark:hover:text-indigo-400"
          >
            {page.metadata.title}
          </CloseButton>
        </li>
      ))}
    </ul>
  );
}
