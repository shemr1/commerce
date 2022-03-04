// pages/products.js
import React from "react";
import commerce from "../lib/commerce";
import ProductList from "../components/ProductList";

export async function getStaticProps() {
	const { data: products } = await commerce.products.list();

	console.log(products);

	return {
		props: {
			products,
		},
	};
}

export default function ProductsPage({ products }) {
	return (
		<React.Fragment>
			<h1 className="text-5xl dark:text-indigo-600 border bg-orange-300 rounded-md font font-extrabold text-center ">
				Products
			</h1>
			<div className="flex flex-col items-center">
				{/* <!-- Help text --> */}
				<span className="text-sm text-gray-700 dark:text-gray-400">
					Showing{" "}
					<span className="font-semibold text-gray-900 dark:text-white">1</span>{" "}
					to{" "}
					<span className="font-semibold text-gray-900 dark:text-white">
						10
					</span>{" "}
					of{" "}
					<span className="font-semibold text-gray-900 dark:text-white">
						{products.length}
					</span>{" "}
					Entries
				</span>
				{/* <!-- Buttons --> */}
				<div className="inline-flex mt-2 xs:mt-0">
					<button className="py-2 px-4 text-sm font-medium text-white bg-gray-800 rounded-l hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
						Prev
					</button>
					<button className="py-2 px-4 text-sm font-medium text-white bg-gray-800 rounded-r border-0 border-l border-gray-700 hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
						Next
					</button>
				</div>
			</div>
			<ProductList products={products} />
			<br />
			<br />
		</React.Fragment>
	);
}
