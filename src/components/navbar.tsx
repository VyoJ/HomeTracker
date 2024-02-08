"use client";

import { ModeToggle } from "@/app/themeToggle";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";

export function Navbar() {
  const { data: session, status } = useSession();
  console.log(session, status);
  return (
    <div className="border-b py-4 h-18">
      <div className="container mx-auto flex justify-between items-center">
        <Link
          href="/"
          className="flex gap-1 items-center text-xl font-bold text-primary"
        >
          HomeTracker
        </Link>
        <ul className="flex items-center gap-x-4">
          <li>
            <Link className="hover:text-sky-500 hover:underline" href="/">
              Home
            </Link>
          </li>
          <li className="mr-4">
            <Link className="hover:text-sky-500 hover:underline" href="/pantry">
              Your Pantry
            </Link>
          </li>
          {!session ? (
            <li>
              <Button onClick={() => signIn()}>Sign In</Button>
            </li>
          ) : (
            <li>
              <Button onClick={() => signOut()}>Sign Out</Button>
            </li>
          )}
          <li>
            <ModeToggle />
          </li>
        </ul>
      </div>
    </div>
  );
}
