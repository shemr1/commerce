// components/Category.js
export default function Category({ name, assets, description, meta, media }) {
	console.log(name, assets[0].url);
	return name, description, assets[0].url, meta;
}
