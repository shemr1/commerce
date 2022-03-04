// components/CategoryList.js
import Link from "next/link";
import Image from "next/image";
import Category from "./Category";

export default function CategoryList({ categories }) {
	if (!categories) return null;

	return (
		<ul className="grid grid-cols-5 gap-8 p-4">
			{categories.map((category) => (
				<li key={category.slug}>
					<Link href={`/categories/${category.slug}`}>
						<a
							href="#"
							className="flex flex-col items-center bg-white rounded-lg border shadow-md md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
						>
							<img
								className="mb-3 w-24 h-24 rounded-full shadow-lg p-2"
								src={category.assets[0].url}
								alt=""
							/>
							<div className="flex flex-col justify-between p-4 leading-normal text-center">
								<h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white ">
									{category.name}
								</h5>
								<p className="mb-3 font-normal text-gray-700 dark:text-gray-400"></p>
							</div>
						</a>
					</Link>
				</li>
			))}
		</ul>
	);
}
