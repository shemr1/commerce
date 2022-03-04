import { useCartState, useCartDispatch } from "../context/cart";
import commerce from "../lib/commerce";
import Link from "next/link";

function CartItem({ id, name, quantity, line_total }) {
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
		<div>
			<p>{name}</p>
			<p>{quantity}</p>
			<p>{line_total.formatted_with_symbol}</p>
			<div>
				<button onClick={decrement}>-</button>
				<button onClick={increment}>+</button>
			</div>
			<div>
				<button onClick={removeItem}>&times</button>
			</div>
		</div>
	);
}

export default function CartPage() {
	const { line_items, subtotal, id } = useCartState();

	const isEmpty = line_items.length === 0;

	if (isEmpty) {
		return <p> Your cart is empty! </p>;
	}

	return (
		<div>
			<h1>Cart {id}</h1>
			{line_items.map((item) => (
				<CartItem key={item.id} {...item} />
			))}

			<hr />
			<Link href="/checkout">
				<p>
					<strong> Sub total:</strong> {subtotal.formatted_with_symbol}
				</p>
			</Link>
		</div>
	);
}
