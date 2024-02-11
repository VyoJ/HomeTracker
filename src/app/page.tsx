// "use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
// import { useState, useEffect } from "react";
// import { useSession } from "next-auth/react";
// import { authUser, createUser } from "./actions";

export default function Home() {
  // const { data: session, status } = useSession();
  // const [userState, setUserState] = useState({
  //   name: "",
  //   email: "",
  // });

  // if (status === "authenticated") {
  //   console.log("User:", session.user);
  //   let email = session.user?.email;
  //   let name = session.user?.name;
  //   try {
  //     authUser(email as string).then((res) => {
  //       console.log(res);
  //       if (res?.status === 200) {
  //         setUserState({
  //           ...userState,
  //           name: name as string,
  //           email: email as string,
  //         });
  //         localStorage.setItem("userid", res?.data!);
  //       } else if (res?.status === 404) {
  //         createUser({ email, name }).then((res) => {
  //           console.log(res);
  //           localStorage.setItem("userid", res.data!);
  //         });
  //       }
  //     });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

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
