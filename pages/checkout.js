import { useCartState, useCartDispatch } from "../context/cart";
import commerce from "../lib/commerce";
import { useState } from "react";
import { useRouter } from "next/router";
import { signIn, useSession, getProviders } from "next-auth/react";

let getToken = async function () {
	try {
		const response = await commerce.checkout.generateTokenFrom(
			"cart",
			commerce.cart.id(),
		);
		return console.log(response.id);
	} catch (err) {
		console.log(err.message);
	}
};

export default function Checkout() {
	const router = useRouter();
	const { data: session } = useSession();
	const { total_items, line_items, subtotal } = useCartState();
	let token = getToken();
	console.log(token, commerce.checkout.getShippingOptions);
	const [form, setForm] = useState({
		name: "",
		email: "",
		street: "",
		city: "",
		postcode: "",
	});

	const handleChange = (e) => {
		const target = e.target;
		const value = target.value;
		const name = target.name;

		setForm({
			...form,
			[name]: value,
		});
	};

	const payment = (e) => {
		commerce.checkout
			.capture(token, {
				line_items: line_items,
				customer: {
					firstname: session.user.name,
					lastname: "Doe",
					email: session.user.email,
				},
				shipping: {
					name: session.user.name,
					street: form.street,
					town_city: form.city,
					county_state: "NY",
					postal_zip_code: "11203",
					country: "US",
				},
				fulfillment: {
					// The shipping method ID for "USPS Ground" (for example)
					// You can use commerce.checkout.getShippingOptions() to get a list
					shipping_method: "ship_1ypbroE658n4ea",
				},
				payment: {
					// Test Gateway is enabled by default, and is used when you submit orders with
					// your sandbox API key
					gateway: "test_gateway",
					card: {
						number: "4242 4242 4242 4242",
						expiry_month: "01",
						expiry_year: "2023",
						cvc: "123",
						postal_zip_code: "94103",
					},
				},
			})
			.then((response) => {
				console.log(
					"Great, your checkout was captured successfully! Checkout the response object for receipt info.",
				);
				commerce.cart.empty();
				router.push("/");
			})
			.catch((error) => console.error(error));
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		payment(form);
	};

	return (
		<>
			<div className="mt-20">
				<h1 className="flex items-center justify-center font-bold text-blue-600 text-md lg:text-3xl">
					Checkout
				</h1>
			</div>
			<div className="container p-12 mx-auto">
				<div className="flex flex-col w-full px-0 mx-auto md:flex-row">
					<div className="flex flex-col md:w-full">
						<h2 className="mb-4 font-bold md:text-xl text-heading ">
							Shipping Address
						</h2>
						<form
							className="justify-center w-full mx-auto"
							onSubmit={handleSubmit}
						>
							<div className="">
								<div className="space-x-0 lg:flex lg:space-x-4">
									<div className="w-full lg:w-1/2">
										<label
											htmlFor="firstName"
											className="block mb-3 text-sm font-semibold text-gray-500"
										>
											Name
										</label>
										<input
											name="firstName"
											type="text"
											onChange={handleChange}
											placeholder="First Name"
											className="w-full px-4 py-3 text-sm border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600"
										/>
									</div>
								</div>
								<div className="mt-4">
									<div className="w-full">
										<label
											htmlFor="Email"
											className="block mb-3 text-sm font-semibold text-gray-500"
										>
											Email
										</label>
										<input
											name="email"
											type="text"
											onChange={handleChange}
											placeholder="Email"
											className="w-full px-4 py-3 text-sm border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600"
										/>
									</div>
								</div>
								<div className="mt-4">
									<div className="w-full">
										<label
											htmlFor="street"
											className="block mb-3 text-sm font-semibold text-gray-500"
										>
											Street Address
										</label>
										<input
											className="w-full px-4 py-3 text-xs border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600"
											name="street"
											onChange={handleChange}
											placeholder="Street Address"
										/>
									</div>
								</div>
								<div className="space-x-0 lg:flex lg:space-x-4">
									<div className="w-full lg:w-1/2">
										<label
											htmlFor="city"
											className="block mb-3 text-sm font-semibold text-gray-500"
										>
											City
										</label>
										<input
											name="city"
											type="text"
											onChange={handleChange}
											placeholder="City"
											className="w-full px-4 py-3 text-sm border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600"
										/>
									</div>
									<div className="w-full lg:w-1/2 ">
										<label
											htmlFor="postcode"
											className="block mb-3 text-sm font-semibold text-gray-500"
										>
											Postcode
										</label>
										<input
											name="postcode"
											type="text"
											onChange={handleChange}
											placeholder="Post Code"
											className="w-full px-4 py-3 text-sm border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600"
										/>
									</div>
								</div>

								<div className="relative pt-3 xl:pt-6">
									<label
										htmlFor="payment"
										className="block mb-3 text-sm font-semibold text-gray-500"
									></label>

									<div className="w-full pt-1 pb-5"></div>
									<div className="mb-10">
										<h1 className="text-center font-bold text-xl uppercase">
											Secure payment info
										</h1>
									</div>
									<div className="mb-3 flex -mx-2">
										<div className="px-2">
											<label
												htmlFor="type1"
												className="flex items-center cursor-pointer"
											>
												<input
													type="radio"
													className="form-radio h-5 w-5 text-indigo-500"
													name="type"
													id="type1"
													checked
												/>
												<img
													src="https://leadershipmemphis.org/wp-content/uploads/2020/08/780370.png"
													className="h-8 ml-3"
												/>
											</label>
										</div>
									</div>
									<div className="mb-3">
										<label className="font-bold text-sm mb-2 ml-1">
											Name on card
										</label>
										<div>
											<input
												className="w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors"
												placeholder="John Smith"
												type="text"
											/>
										</div>
									</div>
									<div className="mb-3">
										<label className="font-bold text-sm mb-2 ml-1">
											Card number
										</label>
										<div>
											<input
												className="w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors"
												placeholder="0000 0000 0000 0000"
												type="text"
											/>
										</div>
									</div>
									<div className="mb-3 -mx-2 flex items-end">
										<div className="px-2 w-1/2">
											<label className="font-bold text-sm mb-2 ml-1">
												Expiration date
											</label>
											<div>
												<select className="form-select w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors cursor-pointer">
													<option value="01">01 - January</option>
													<option value="02">02 - February</option>
													<option value="03">03 - March</option>
													<option value="04">04 - April</option>
													<option value="05">05 - May</option>
													<option value="06">06 - June</option>
													<option value="07">07 - July</option>
													<option value="08">08 - August</option>
													<option value="09">09 - September</option>
													<option value="10">10 - October</option>
													<option value="11">11 - November</option>
													<option value="12">12 - December</option>
												</select>
											</div>
										</div>
										<div className="px-2 w-1/2">
											<select className="form-select w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors cursor-pointer">
												<option value="2023">2023</option>
												<option value="2024">2024</option>
												<option value="2025">2025</option>
												<option value="2026">2026</option>
												<option value="2027">2027</option>
												<option value="2028">2028</option>
												<option value="2029">2029</option>
											</select>
										</div>
									</div>
									<div className="mb-10">
										<label className="font-bold text-sm mb-2 ml-1">
											Security code
										</label>
										<div>
											<input
												className="w-32 px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors"
												placeholder="000"
												type="text"
											/>
										</div>
									</div>
								</div>
								<div className="mt-4">
									<button
										type="submit"
										className="w-full px-6 py-2 text-blue-200 bg-blue-600 hover:bg-blue-900"
									>
										Process
									</button>
								</div>
							</div>
							<br />
							<br />
						</form>
					</div>
					<div className="flex flex-col w-full ml-0 lg:ml-12 lg:w-2/5">
						<div className="pt-12 md:pt-0 2xl:ps-4">
							<h2 className="text-xl font-bold">Order Summary</h2>
							<div className="mt-8">
								<div className="flex flex-col space-y-4"></div>
							</div>
							<div className="flex p-4 mt-4">
								<h2 className="text-xl font-bold">{total_items} ITEMS </h2>
							</div>
							<div className="flex items-center w-full py-4 text-sm font-semibold border-b border-gray-300 lg:py-5 lg:px-3 text-heading last:border-b-0 last:text-base last:pb-0">
								Subtotal
								<span className="ml-2">{subtotal.formatted_with_symbol}</span>
							</div>
							<div className="flex items-center w-full py-4 text-sm font-semibold border-b border-gray-300 lg:py-5 lg:px-3 text-heading last:border-b-0 last:text-base last:pb-0">
								Shipping Tax<span className="ml-2">$10</span>
							</div>
							<div className="flex items-center w-full py-4 text-sm font-semibold border-b border-gray-300 lg:py-5 lg:px-3 text-heading last:border-b-0 last:text-base last:pb-0">
								Total
								<span className="ml-2">{subtotal.formatted_with_symbol}</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
