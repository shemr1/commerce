import React from "react";
import commerce from "../../lib/commerce";
import { useCartDispatch } from "../../context/cart";
import { useRouter } from "next/router";

export default function ProductSlug({ product }) {
	const { setCart } = useCartDispatch();

	const addToCart = () =>
		commerce.cart.add(product.id).then(({ cart }) => setCart(cart));

	return (
		<div className="bg-white">
			<div className="pt-6">
				<nav aria-label="Breadcrumb">
					<ol
						role="list"
						className="max-w-2xl mx-auto px-4 flex items-center space-x-2 sm:px-6 lg:max-w-7xl lg:px-8"
					>
						<li className="text-sm">
							<a
								aria-current="page"
								className="font-medium text-gray-500 hover:text-gray-600"
							>
								{product.name}
							</a>
						</li>
					</ol>
				</nav>

				{/* Image gallery */}
				<div className="mt-6 max-w-2xl mx-auto sm:px-6 lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-3 lg:gap-x-8">
					<div className="hidden aspect-w-3 aspect-h-4 rounded-lg overflow-hidden lg:block">
						<img
							src={product.assets[0].url}
							alt=""
							className="w-full h-full object-center object-cover"
						/>
					</div>
					<div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
						<div className="aspect-w-3 aspect-h-2 rounded-lg overflow-hidden">
							<img
								src={product.assets[1]}
								alt=""
								className="w-full h-full object-center object-cover"
							/>
						</div>
						<div className="aspect-w-3 aspect-h-2 rounded-lg overflow-hidden">
							<img
								src={product.assets[2]}
								alt=""
								className="w-full h-full object-center object-cover"
							/>
						</div>
					</div>
					<div className="aspect-w-4 aspect-h-5 sm:rounded-lg sm:overflow-hidden lg:aspect-w-3 lg:aspect-h-4">
						<img
							src={product.assets[3]}
							alt=""
							className="w-full h-full object-center object-cover"
						/>
					</div>
				</div>

				{/* Product info */}
				<div className="max-w-2xl mx-auto pt-10 pb-16 px-4 sm:px-6 lg:max-w-7xl lg:pt-16 lg:pb-24 lg:px-8 lg:grid lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8">
					<div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
						<h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
							{product.name}
						</h1>
					</div>

					{/* Options */}
					<div className="mt-4 lg:mt-0 lg:row-span-3">
						<h2 className="sr-only">Product information</h2>
						<p className="text-3xl text-gray-900">
							{product.price.formatted_with_symbol}
						</p>

						{/* Reviews */}
						<div className="mt-6">
							<h3 className="sr-only">Reviews</h3>
						</div>

						<form className="mt-10">
							<button
								onClick={addToCart}
								className="mt-10 w-full bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
							>
								Add to bag
							</button>
						</form>
					</div>

					<div className="py-10 lg:pt-6 lg:pb-16 lg:col-start-1 lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
						{/* Description and details */}
						<div>
							<h3 className="sr-only">Description</h3>

							<div className="space-y-6">
								<p className="text-base text-gray-900">{product.description}</p>
							</div>
						</div>

						<div className="mt-10">
							<h2 className="text-sm font-medium text-gray-900">Details</h2>

							<div className="mt-4 space-y-6">
								<p className="text-sm text-gray-600">{product.description}</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export async function getStaticProps({ params }) {
	const { permalink } = params;

	const product = await commerce.products.retrieve(permalink, {
		type: "permalink",
	});

	return {
		props: {
			product,
		},
	};
}

export async function getStaticPaths() {
	const { data: products } = await commerce.products.list();

	return {
		paths: products.map((product) => ({
			params: {
				permalink: product.permalink,
			},
		})),
		fallback: false,
	};
}
