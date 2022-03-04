import NextAuth from "next-auth";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "/lib/mongodb";
import connectDB from "../../../lib/connectDB";
import User from "../../../models/userModel";
import bcrypt from "bcryptjs";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import TwitterProvider from "next-auth/providers/twitter";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
	adapter: MongoDBAdapter(clientPromise),
	session: {
		strategy: "jwt",
	},
	jwt: {
		maxAge: 30 * 24 * 60 * 60,
	},
	providers: [
		CredentialsProvider({
			// The name to display on the sign in form (e.g. "Sign in with...")
			name: "Credentials",
			// The credentials is used to generate a suitable form on the sign in page.
			// You can specify whatever fields you are expecting to be submitted.
			// e.g. domain, username, password, 2FA token, etc.
			// You can pass any HTML attribute to the <input> tag through the object.
			credentials: {
				email: { label: "Email", type: "email", placeholder: "jsmith" },
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials) {
				console.log("authorization started");
				// Add logic here to look up the user from the credentials supplied
				connectDB();
				const { email, password } = credentials;
				console.log(email, password);

				const user = await User.findOne({ email: email });

				if (!user) {
					// return res
					// 	.status(404)
					// 	.json({ error: "user dont exists with that email" });
					console.log("user doesnt exist");
				} else {
				}
				const doMatch = await bcrypt.compare(password, user.password);

				if (!doMatch) {
					// return res.status(401).json({ error: "Invalid credentials" });
					console.log("Invalid credentials");
				}

				if (user) {
					// Any object returned will be saved in `user` property of the JWT

					return user;
				} else {
					// If you return null then an error will be displayed advising the user to check their details.
					return null;

					// You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
				}
			},
		}),

		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
		}),
		GitHubProvider({
			clientId: process.env.GITHUB_CLIENT_ID,
			clientSecret: process.env.GITHUB_CLIENT_SECRET,
		}),
		TwitterProvider({
			clientId: process.env.TWITTER_ID,
			clientSecret: process.env.TWITTER_SECRET,
			version: "2.0", // opt-in to Twitter OAuth 2.0
		}),
	],
	pages: {
		// signIn: "/login",
	},
	callbacks: {
		async jwt({ token, account, user }) {
			if (account) {
				token[account.provider] = {
					accessToken: account.oauth_token,
					refreshToken: account.oauth_token_secret,
				};
				token.user = user;
			}

			return token;
		},
		async session({ session, token }) {
			session.user = token.user;
			session.userId = token.sub;
			session.accessToken = token.accessToken;
			session.error = token.error;
			return session;
		},
	},

	database: process.env.DATABASE_URL,
	secret: process.env.SECRET_KEY,
});
