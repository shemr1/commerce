import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import { signIn, useSession, getProviders } from "next-auth/react";

export default function Login() {
	const router = useRouter();
	const contentType = "application/json";
	const { data: session, status } = useSession();
	if (status === "authenticated") {
		router.push("/");
	}
	const [form, setForm] = useState({
		name: "",
		email: "",
		password: "",
		confirmPassword: "",
		image: "",
	});

	const register = async (form) => {
		try {
			await fetch("/api/users", {
				method: "POST",
				headers: {
					Accept: contentType,
					"Content-Type": contentType,
				},
				body: JSON.stringify(form),
			});
			router.push("/");
		} catch (error) {
			console.log(error.message);
		}
	};

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
		console.log("submitting");
		e.preventDefault();
		register(form);
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
							Register
						</h2>
						<p className="mt-2 text-center text-sm text-gray-600">
							Or{" "}
							<Link href="/login">
								<a className="font-medium text-indigo-600 hover:text-indigo-500">
									Login if you already have an account
								</a>
							</Link>
						</p>
					</div>
					<form className="mt-8 space-y-6" onSubmit={handleSubmit}>
						<div className="rounded-md shadow-sm -space-y-px">
							<div>
								<label htmlFor="email-address" className="sr-only">
									User Name
								</label>
								<input
									id="name"
									name="name"
									type="text"
									onChange={handleChange}
									required
									className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
									placeholder="Username"
								/>
							</div>
							<div>
								<label htmlFor="email-address" className="sr-only">
									Email address
								</label>
								<input
									id="email"
									name="email"
									type="email"
									onChange={handleChange}
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
									required
									className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
									placeholder="Password"
								/>
							</div>
							<div>
								<label htmlFor="password" className="sr-only">
									Confirm Password
								</label>
								<input
									id="confirmPassword"
									name="confirmPassword"
									type="password"
									onChange={handleChange}
									required
									className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
									placeholder="Confirm Password"
								/>
							</div>
						</div>

						<div className="flex items-center justify-between">
							<div className="flex items-center"></div>
						</div>

						<div>
							<button
								type="submit"
								className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
							>
								Sign up
							</button>
						</div>
					</form>
				</div>
			</div>
		</>
	);
}
