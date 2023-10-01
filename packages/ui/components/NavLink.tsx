"use client";

import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import { PropsWithChildren } from "react";
import { Button } from "./Button";

type NavLinkProps = PropsWithChildren & LinkProps;

export function NavLink({ children, href, ...props }: NavLinkProps) {
  const pathname = usePathname();

  const isActive = pathname === href;

  return (
    <Button variant={isActive ? "default" : "secondary"} asChild>
      <Link href={href} {...props}>
        {children}
      </Link>
    </Button>
  );
}
