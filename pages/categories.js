// pages/categories.js
import React from "react";
import Link from "next/link";
import commerce from "../lib/commerce";
import CategoriesList from "../components/CategoryList";

export async function getStaticProps() {
	const { data: categories } = await commerce.categories.list();
	console.log(categories);
	return {
		props: {
			categories,
		},
	};
}

export default function categoriesPage({ categories }) {
	return (
		<div>
			<h1 className="text-5xl dark:text-indigo-600 border bg-orange-300 rounded-md font font-extrabold text-center ">
				Categories
			</h1>

			<CategoriesList categories={categories} />
			<br />

			<div className="relative bg-white overflow-hidden">
				<div className="pt-16 pb-80 sm:pt-24 sm:pb-40 lg:pt-40 lg:pb-48">
					<div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 sm:static">
						<div className="sm:max-w-lg">
							<h1 className="text-4xl font font-extrabold tracking-tight text-orange-500 sm:text-6xl">
								New products are almost here
							</h1>
							<p className="mt-4 text-xl text-gray-500">
								This year, our new and returning customers have shown us that we
								can commit to new products and so we would like give you a peek
								of our new products.
							</p>
						</div>
						<div>
							<div className="mt-10">
								{/* Decorative image grid */}
								<div
									aria-hidden="true"
									className="pointer-events-none lg:absolute lg:inset-y-0 lg:max-w-7xl lg:mx-auto lg:w-full"
								>
									<div className="absolute transform sm:left-1/2 sm:top-0 sm:translate-x-8 lg:left-1/2 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-8">
										<div className="flex items-center space-x-6 lg:space-x-8">
											<div className="flex-shrink-0 grid grid-cols-1 gap-y-6 lg:gap-y-8">
												<div className="w-44 h-64 rounded-lg overflow-hidden sm:opacity-0 lg:opacity-100">
													<img
														src="/promo1.jpg"
														alt=""
														className="w-full h-full object-center object-cover"
													/>
												</div>
												<div className="w-44 h-64 rounded-lg overflow-hidden">
													<img
														src="/promo2.jpg"
														alt=""
														className="w-full h-full object-center object-cover"
													/>
												</div>
											</div>
											<div className="flex-shrink-0 grid grid-cols-1 gap-y-6 lg:gap-y-8">
												<div className="w-44 h-64 rounded-lg overflow-hidden">
													<img
														src="/promo3.jpg"
														alt=""
														className="w-full h-full object-center object-cover"
													/>
												</div>
												<div className="w-44 h-64 rounded-lg overflow-hidden">
													<img
														src="/promo4.jpg"
														alt=""
														className="w-full h-full object-center object-cover"
													/>
												</div>
												<div className="w-44 h-64 rounded-lg overflow-hidden">
													<img
														src="/promo5.jpg"
														alt=""
														className="w-full h-full object-center object-cover"
													/>
												</div>
											</div>
											<div className="flex-shrink-0 grid grid-cols-1 gap-y-6 lg:gap-y-8">
												<div className="w-44 h-64 rounded-lg overflow-hidden">
													<img
														src="/promo6.jpg"
														alt=""
														className="w-full h-full object-center object-cover"
													/>
												</div>
												<div className="w-44 h-64 rounded-lg overflow-hidden">
													<img
														src="/promo7.jpg"
														alt=""
														className="w-full h-full object-center object-cover"
													/>
												</div>
											</div>
										</div>
									</div>
								</div>
								<Link href="/products">
									<a className="inline-block text-center bg-indigo-600 border border-transparent rounded-md py-3 px-8 font-medium text-white hover:bg-indigo-700">
										Shop Products
									</a>
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
