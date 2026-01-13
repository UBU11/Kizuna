// import { betterAuth } from "better-auth";
// import { drizzleAdapter } from "better-auth/adapters/drizzle";
// import { db } from "../../config/DB_Config.ts";
// import dotenv from "dotenv";
// import {
//   account,
//   session,
//   user,
//   verification,
// } from "../../models/auth-schema.ts";

// dotenv.config();

// export const auth = betterAuth({
//   database: drizzleAdapter(db, {
//     provider: "pg",
//     schema: {
//       user,
//       account,
//       session,
//       verification,
//     },
//   }),

//   emailVerification: {



//     // sendVerificationEmail: async ({ user, url, token }, request) => {      //set this func when custom email func is ready
//     //  try {
//     //    void sendEmail({
//     //      to: user.email,
//     //      subject: "Verify your email address",
//     //      text: `Click the link to verify your email: ${url}`,
//     //    });
//     //  } catch (error) {
//     //   console.log("email is not delivered", error, typeof(error))
//     //  }

//     // },

//     sendOnSignUp:true

//   },



//   emailAndPassword: {
//     enabled: true,
//     autoSignIn: true,
//     requireEmailVerification:true
//   },
//   socialProviders: {
//     github: {
//       clientId: process.env?.GITHUB_CLIENT_ID as string,
//       clientKey: process.env?.GITHUB_CLIENT_SECRET as string,
//     },
//     google:{
//       clientId:process.env?.GOOGLE_CLIENT_ID as string,
//       clientKey:process.env?.GOOGLE_CLIENT_SECRET as string,

//     }
//   },

//   trustedOrigins: [
//     "http://localhost:3000",
//     "http://localhost:8080",
//     "http://localhost:5173",
//   ],
// });



