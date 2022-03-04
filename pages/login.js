import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { signIn, useSession, getProviders } from "next-auth/react";

export default function Login({ providers }) {
	const router = useRouter();
	const { data: session, status, loading } = useSession();
	const [form, setForm] = useState({
		email: "",
		password: "",
	});
	console.log({ session, providers, loading });
	if (status === "authenticated") {
		router.push("/");
	}

	const handleChange = (e) => {
		const target = e.target;
		const value = target.value;
		const name = target.name;

		setForm({
			...form,
			[name]: value,
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		login(form);
	};

	const login = async (form) => {
		const { email, password } = form;
		try {
			signIn("credentials", { email, password });
		} catch (error) {
			console.log(error.message);
		}
	};
	return (
		<>
			<div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
				<div className="max-w-md w-full space-y-8">
					<div>
						<img
							className="mx-auto h-12 w-auto"
							src="/logo.png"
							alt="Workflow"
						/>
						<h2 className="mt-6 text-center text-3xl font-extrabold text-orange-500">
							Sign in to your account
						</h2>
						<p className="mt-2 text-center text-sm text-gray-600">
							Or{" "}
							<Link href="/register">
								<a className="font-medium text-indigo-600 hover:text-indigo-500">
									Register with us
								</a>
							</Link>
						</p>
					</div>
					<form className="mt-8 space-y-6" onSubmit={handleSubmit}>
						<input type="hidden" name="remember" defaultValue="true" />
						<div className="rounded-md shadow-sm -space-y-px">
							<div>
								<label htmlFor="email-address" className="sr-only">
									Email address
								</label>
								<input
									id="email"
									name="email"
									type="email"
									onChange={handleChange}
									autoComplete="email"
									required
									className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
									placeholder="Email address"
								/>
							</div>
							<div>
								<label htmlFor="password" className="sr-only">
									Password
								</label>
								<input
									id="password"
									name="password"
									type="password"
									onChange={handleChange}
									autoComplete="current-password"
									required
									className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
									placeholder="Password"
								/>
							</div>
						</div>

						<div className="flex items-center justify-between">
							<div className="flex items-center"></div>

							<div className="text-sm">
								<a
									href="#"
									className="font-medium text-indigo-600 hover:text-indigo-500"
								>
									Forgot your password?
								</a>
							</div>
						</div>

						<div>
							<button
								type="submit"
								className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
							>
								Sign in
							</button>
						</div>
					</form>
					<hr />
					<div className="grid gap-4 grid-cols-3">
						<button
							onClick={() => signIn("google")}
							className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
						>
							Google
						</button>
						<button
							onClick={() => signIn("github")}
							className="bg-neutral-500 hover:bg-neutral-700 text-white font-bold py-2 px-4 rounded"
						>
							Github
						</button>
						<button
							onClick={() => signIn("twitter")}
							className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
						>
							Twitter
						</button>
					</div>
				</div>
			</div>
		</>
	);
}

Login.getInitialProps = async (context) => {
	return {
		providers: await getProviders(context),
	};
};
