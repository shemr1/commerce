// pages/index.js
import React from "react";
import ReactDOM from "react-dom";
import ProductList from "../components/ProductList";
import CategoryList from "../components/CategoryList";
import commerce from "../lib/commerce";

export default function IndexPage({ merchant, categories, results }) {
	return (
		<React.Fragment>
			<div
				className="hero-container bg-[url('/banne.jpg')] bg-cover bg-center h-60 p-4
			 "
			>
				<div className="hero-overlay bg-opacity-60"></div>
				<div className="text-center hero-content text-neutral-content">
					<div className="max-w-md">
						<h1 className="mb-5 text-5xl font-bold text-white text-center">
							Brishnell House of Flavour
						</h1>
					</div>
				</div>
			</div>
			<h1 className=" text-4xl p-4 font-['Open_Sans'] text-cyan-800">
				Categories
			</h1>
			<CategoryList categories={categories} />
			<h1 className=" text-4xl p-4 font-['Open_Sans']  text-cyan-800">
				Featured Items
			</h1>
			<ProductList products={results} />
		</React.Fragment>
	);
}
export async function getStaticProps() {
	const merchant = await commerce.merchants.about();
	const { data: categories } = await commerce.categories.list();
	const { data: products } = await commerce.products.list();

	const results = products.filter((products) =>
		products.name.includes("Burger"),
	);

	console.log(merchant);
	return {
		props: {
			merchant,
			categories,
			results,
		},
	};
}
