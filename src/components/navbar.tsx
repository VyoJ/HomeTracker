import { ModeToggle } from "@/app/themeToggle";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export async function Navbar() {
  return (
    <div className="border-b py-4 h-18">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="flex gap-1 items-center text-xl font-bold text-primary">
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
          <li>
            <Link href="/">
              <Button>Sign In</Button>
            </Link>
          </li>
          <li>
            <ModeToggle />
          </li>
        </ul>
      </div>
    </div>
  );
}
