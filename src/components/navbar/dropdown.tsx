import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import type { SVGProps } from "react";
import { links } from "./links";

export function Menu(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="currentColor"
        d="M3 18v-2h18v2zm0-5v-2h18v2zm0-5V6h18v2z"
      ></path>
    </svg>
  );
}

export function NavDropdown({ slug }: { slug: string }) {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger className="flex items-center gap-2 text-orange-500 outline-hidden hover:underline md:hidden">
        <Menu
          className="h-8 w-8 transition-opacity hover:opacity-75"
          aria-label="Menu"
        />
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          align="end"
          className="flex flex-col overflow-hidden rounded-md bg-orange-950 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2"
        >
          {links.map((link) => (
            <DropdownMenu.Item
              key={link.href}
              asChild
              aria-current={
                (
                  link.slug
                    ? slug.startsWith(link.slug)
                    : slug === link.href || slug === link.href + "/"
                )
                  ? "page"
                  : undefined
              }
              className="bg-orange-900 py-1 pl-4 pr-2 text-right outline-hidden transition-opacity hover:opacity-75 aria-[current=page]:bg-orange-700"
            >
              <a href={link.href}>{link.name}</a>
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
