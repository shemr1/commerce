import React from "react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";

function Profile() {
	const router = useRouter();
	const { data: session, status } = useSession();

	if (status === "authenticated") {
		return (
			<div className="grid grid-flow-row auto-rows-max ">
				<h1 className="text-5xl dark:text-indigo-600 border bg-orange-300 rounded-md font font-extrabold text-center ">
					Profile
				</h1>
				<br />
				<div className=" flex justify-center">
					<img
						className="inline object-cover w-16 h-16 mr-2 rounded-full"
						src={
							session.user.image === "" ? "/default.jpg" : session.user.image
						}
						alt="Profile image"
					/>
				</div>

				<div className=" flex justify-center text-lg font-bold ">
					{session.user.name}
				</div>
				<br />
				<div className="grid grid-flow-col grid-cols-2 gap-4">
					<div className="container text-lg  rounded-md border-4 border-orange-500 h-80 p-4">
						<h2 className="font-bold text-blue-500">Recent Orders</h2>
						<p>No orders yet :(</p>
					</div>
					<div className="container text-lg  rounded-md border-4 border-orange-500 h-80 p-4">
						<h2 className="font-bold text-blue-500">Favourites</h2>
						<p>Dont you like anything?</p>
					</div>
				</div>
				<br />
				<div className="flex justify-center">
					<button
						className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
						onClick={() => signOut()}
					>
						Signout
					</button>
				</div>
			</div>
		);
	} else return <div>Your are not signed in</div>;
}

export default Profile;
