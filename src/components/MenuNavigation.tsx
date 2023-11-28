"use client";
import type { ReactNode } from "react";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../components/ui/navigation-menu";

import { buttonVariants } from "./ui/button";

interface Iprops {
  children: ReactNode;
  links?: {
    href: string;
    text: string;
    image: ReactNode;
  }[];
}

function MenuNavigationLinks({ children, links }: Iprops) {
  return (
    <NavigationMenu className={buttonVariants({ variant: "ghost" })}>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>{children}</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="w-[200px] lg:w-[275px] p-4 flex flex-col gap-2">
              {links?.map((link) => (
                <NavigationMenuLink key={link.href} href={link.href}>
                  <p className="text-md flex gap-2 items-center">
                    {link.image} {link.text}
                  </p>
                </NavigationMenuLink>
              ))}
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

export default MenuNavigationLinks;
