// components/ProductList.js
import Link from "next/link";

import Product from "./Product";

export default function ProductList({ products }) {
	if (!products) return null;

	return (
		<ul className="grid grid-cols-5 gap-8 p-4">
			{products.map((product) => (
				<li key={product.permalink}>
					<Link href={`/products/${product.permalink}`}>
						<div className="relative max-w-sm min-w-[340px] bg-white shadow-md rounded-3xl p-2 mx-1 my-3 cursor-pointer">
							<div className="overflow-x-hidden rounded-2xl relative">
								<img
									className="h-40 rounded-2xl w-full object-cover"
									src={product.assets[0].url}
								/>
							</div>
							<div className="mt-4 pl-2 mb-2 flex justify-between ">
								<div>
									<p className="text-lg font-semibold text-gray-900 mb-0">
										{product.name}
									</p>
									<p className="text-md text-gray-800 mt-0">
										{product.price.formatted_with_symbol}
									</p>
								</div>
								<div className="flex flex-col-reverse mb-1 mr-4 group cursor-pointer">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="h-6 w-6 group-hover:opacity-70"
										fill="none"
										viewBox="0 0 24 24"
										stroke="gray"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
										/>
									</svg>
								</div>
							</div>
						</div>
					</Link>
				</li>
			))}
		</ul>
	);
}
