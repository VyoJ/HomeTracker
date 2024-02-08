import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col justify-center items-center h-[calc(100vh-288px)]">
      <div className="mx-auto mt-8 max-w-2xl">
        <div className="text-center pt-12">
          <h1 className="text-primary text-6xl font-bold tracking-tight">
            Streamline Your Kitchen Inventory with Ease
          </h1>
          <p className="m-6 text-lg leading-8 text-primary">
            Effortless Pantry Management for Smart Food Tracking and Worry-Free
            Meal Planning
          </p>
          <Link href="/pantry">
            <Button>Get Started</Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
