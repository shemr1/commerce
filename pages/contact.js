import React, { useState } from "react";
const sgMail = require("@sendgrid/mail");

function Contact() {
	sgMail.setApiKey(process.env.SENDGRID_API_KEY);
	const [form, setForm] = useState({
		name: "",
		email: "",
		message: "",
	});
	const handleChange = (e) => {
		const target = e.target;
		const value = target.value;
		const name = target.name;

		setForm({
			...form,
			[name]: value,
		});
	};
	const send = async (form) => {
		const res = await fetch("/api/sendgrid", {
			body: JSON.stringify({
				email: form.email,
				fullname: form.name,

				message: form.message,
			}),
			headers: {
				"Content-Type": "application/json",
			},
			method: "POST",
		});

		const { error } = await res.json();
		if (error) {
			console.log(error);
			return;
		}
		console.log(fullname, email, subject, message);
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		send(form);
	};
	return (
		<div className="bg-gradient-to-b from-purple-600 to-indigo-500 h-96 w-full">
			<div className="w-full flex items-center justify-center my-12">
				<form
					className="absolute top-40 bg-white shadow rounded py-12 lg:px-28 px-8"
					onSubmit={handleSubmit}
				>
					<p className="md:text-3xl text-xl font-bold leading-7 text-center text-gray-700">
						Let’s chat and get a quote!
					</p>
					<div className="md:flex items-center mt-12">
						<div className="md:w-72 flex flex-col">
							<label className="text-base font-semibold leading-none text-gray-800">
								Name
							</label>
							<input
								tabIndex={0}
								arial-label="Please input name"
								type="name"
								onChange={handleChange}
								className="text-base leading-none text-gray-900 p-3 focus:oultine-none focus:border-indigo-700 mt-4 bg-gray-100 border rounded border-gray-200 placeholder-gray-100"
								placeholder="Please input  name"
							/>
						</div>
						<div className="md:w-72 flex flex-col md:ml-6 md:mt-0 mt-4">
							<label className="text-base font-semibold leading-none text-gray-800">
								Email Address
							</label>
							<input
								tabIndex={0}
								arial-label="Please input email address"
								type="name"
								onChange={handleChange}
								className="text-base leading-none text-gray-900 p-3 focus:oultine-none focus:border-indigo-700 mt-4 bg-gray-100 border rounded border-gray-200 placeholder-gray-100"
								placeholder="Please input email address"
							/>
						</div>
					</div>

					<div>
						<div className="w-full flex flex-col mt-8">
							<label className="text-base font-semibold leading-none text-gray-800">
								Message
							</label>
							<textarea
								tabIndex={0}
								aria-label="leave a message"
								role="textbox"
								type="name"
								onChange={handleChange}
								className="h-36 text-base leading-none text-gray-900 p-3 focus:oultine-none focus:border-indigo-500 mt-4 bg-gray-100 border rounded border-gray-200 placeholder-gray-100 resize-none"
								defaultValue={""}
							/>
						</div>
					</div>

					<div className="flex items-center justify-center w-full">
						<button
							type="submit"
							className="mt-9 text-base font-semibold leading-none text-white py-4 px-10 bg-indigo-500 rounded hover:bg-indigo-600 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 focus:outline-none"
						>
							SUBMIT
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}

export default Contact;
