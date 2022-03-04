import { useCartState, useCartDispatch } from "../context/cart";
import commerce from "../lib/commerce";
import Link from "next/link";

function CartItem({ id, name, quantity, line_total, image }) {
	const { setCart } = useCartDispatch();
	const handleUpdateCart = ({ cart }) => setCart(cart);

	const removeItem = () => {
		commerce.cart.remove(id).then(handleUpdateCart);
	};

	const decrement = () => {
		quantity > 1
			? commerce.cart
					.update(id, { quantity: quantity - 1 })
					.then(handleUpdateCart)
			: removeItem();
	};

	const increment = () => {
		commerce.cart.update(id, { quantity: quantity + 1 }).then(handleUpdateCart);
	};

	return (
		<>
			<div className="card w-96 bg-base-100 shadow-xl">
				<figure>
					<img src={image.url} alt="Shoes" />
				</figure>
				<div className="card-body  ">
					<h2 className="card-title font-bold dark:text-indigo-700 place-content-center">
						{name}
					</h2>
					<p className="place-content-center">
						{line_total.formatted_with_symbol}
					</p>
					<div className="card-actions  ">
						<div className="flex  space-x-20  place-content-center">
							<button
								onClick={decrement}
								className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
							>
								-
							</button>
							<p>{quantity}</p>

							<button
								onClick={increment}
								className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
							>
								+
							</button>
						</div>
						<div>
							<button onClick={removeItem}>remove</button>
						</div>
					</div>
				</div>
			</div>
			<br />
			<br />
		</>
	);
}

export default function CartPage() {
	const { line_items, subtotal, id } = useCartState();
	console.log(line_items);

	const isEmpty = line_items.length === 0;

	if (isEmpty) {
		return <p> Your cart is empty! </p>;
	}

	return (
		<div>
			<h1 className="text-5xl dark:text-indigo-600 border bg-orange-300 rounded-md font font-extrabold text-center ">
				Cart
			</h1>
			<br />
			{line_items.map((item) => (
				<CartItem key={item.id} {...item} />
			))}

			<hr />
			<p>
				<strong> Sub total:</strong> {subtotal.formatted_with_symbol}
			</p>
			<Link href="/checkout">
				<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
					Checkout
				</button>
			</Link>
		</div>
	);
}
