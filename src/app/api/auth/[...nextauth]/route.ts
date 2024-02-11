import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { authUser, createUser } from "@/app/actions";
// import PostgresAdapter from "@auth/pg-adapter"
// import { Pool } from "pg";

// const pool = new Pool({
//   host: process.env.DATABASE_HOST!,
//   user: process.env.DATABASE_USER!,
//   password: process.env.DATABASE_PASSWORD!,
//   port: 5432,
//   database: process.env.DATABASE_DB_NAME!,
//   max: 20,
//   idleTimeoutMillis: 30000,
//   connectionTimeoutMillis: 2000,
// })

const authHandler = NextAuth({
  // adapter: PostgresAdapter(pool) as any,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
  ],
  // callbacks: {
  //   async signIn({ account, profile }, ) {
  //     if (account?.provider === "google") {
  //       let email = profile?.email;
  //       let name = profile?.name;
  //       console.log(email, name);
  //       let res = await authUser(email as string);
  //       console.log(res);
  //       if (res?.status === 404) {
  //         let create = await createUser({ email, name });
  //         console.log(create);
  //         localStorage.setItem("userid", create.data!);
  //       } else {
  //         localStorage.setItem("userid", res?.data!);
  //       }
  //     }
  //     return true;
  //   },
  // },
  secret: process.env.NEXTAUTH_SECRET,
});

export { authHandler as GET, authHandler as POST };