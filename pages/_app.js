import "../styles/globals.css";
import Layout from "../components/Layout";
import { SessionProvider } from "next-auth/react";
import { CartProvider } from "../context/cart";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
	return (
		<SessionProvider session={session}>
			<CartProvider>
				<Layout>
					<Component {...pageProps} />
				</Layout>
			</CartProvider>
		</SessionProvider>
	);
}

export default MyApp;
