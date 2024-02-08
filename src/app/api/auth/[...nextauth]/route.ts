import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const authHandler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    })
  ],
  secret: process.env.NEXTAUTH_SECRET,
});

export { authHandler as GET, authHandler as POST };

// import NextAuth from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import GoogleProvider from "next-auth/providers/google";

// const handler = NextAuth({
//   providers: [
//     // CredentialsProvider({
//     //   name: "credentials",
//     //   credentials: {
//     //     email: { label: "Email", type: "email" },
//     //     password: { label: "Password", type: "password" },
//     //   },
//     //   async authorize(credentials, req) {
//     //     const axios = require("axios");
//     //     console.log(credentials);

//     //     const options = {
//     //       headers: { "Content-Type": "application/json" },
//     //       withCredentials: true,
//     //     };
//     //     const res = await axios.post(
//     //       "http://localhost:3000/api/auth/login",
//     //       credentials,
//     //       options
//     //     );
//     //     console.log("res", res);
//     //     try {
//     //       const user = await res.data;
//     //       console.log("user", user);
//     //       if (user) return user.data;
//     //     } catch (err) {
//     //       console.log("err", err);
//     //       return null;
//     //     }
//     //   },
//     // }),
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID as string,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
//     }),
//   ],
//   session: {
//     strategy: "jwt",
//   },
//   callbacks: {
//     async signIn({ account, profile }) {
//       if (account?.provider === "google") {
//         console.log(account, profile);
//       }
//       return true // Do different verification for other providers that don't have `email_verified`
//     },
//   },
//   secret: process.env.NEXTAUTH_SECRET,
// });

// export { handler as GET, handler as POST };