"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";

export default function Home() {
  const { data: session, status } = useSession();

  useEffect(() => {
    async function handleAuth(session: any) {
      let email = session.user?.email;
      let name = session.user?.name;
      try {
        let exists = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/users?email=${email}`
        );
        console.log("Exists:", exists);
        localStorage.setItem("userid", exists.data.data[0].id);
      } catch (err) {
        let res = await axios.post(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/users`,
          {
            name: name,
            email: email,
          }
        );
        console.log("Userid:", res);
        localStorage.setItem("userid", res.data.data[0].userid);

      }
    }

    if (status === "authenticated") {
      // console.log("Inside:", status);
      // console.log(session);
      handleAuth(session);
    }
  }, [status]);

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
