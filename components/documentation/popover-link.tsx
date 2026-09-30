'use client'

import Link, { LinkProps } from "next/link";
import { forwardRef } from "react";

interface PopoverLinkProps extends LinkProps, Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {}

export const PopoverLink = forwardRef<HTMLAnchorElement, PopoverLinkProps>(
  ({ href, children, className = "", ...props }, ref) => {
  return <Link href={href} className={className} ref={ref} {...props} >{children}</Link>
})
