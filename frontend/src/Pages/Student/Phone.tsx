import axios from "axios";
import toast from "react-hot-toast";
import CustomToaster from "../../Components/CustomToaster";

export default function AdminLinkStudent() {
	function onLinkSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();

		const id = localStorage.getItem("user");
		const mobile = e.currentTarget["mobile"].value;
		console.log(id, mobile);

		axios
			.post(`http://localhost:8000/student/add-mobile`, {
				id,
				mobile,
			})
			.then(() => {
				toast.custom((t) => (
					<CustomToaster
						t={t}
						title={"Mobile number added successfully!"}
						description={`Phone number ${id} added.`}
					/>
				));
			})
			.catch((err) =>
				toast.custom((t) => (
					<CustomToaster
						t={t}
						title={"An Error has occured, Data might be invalid."}
						description={err.message}
						danger
					/>
				)),
			);
	}

	return (
		<div className="flex h-[100%] w-[100%] flex-col items-center gap-8 bg-gray-900 p-8">
			<div className="flex w-full flex-row items-center justify-center text-2xl">
				<h1 className="text-4xl text-white">Add Phone Number</h1>
			</div>
			<hr className="border-1 border-white" />
			<form
				className="flex flex-col justify-between gap-4"
				onSubmit={onLinkSubmit}
			>
				<div className="flex flex-col gap-1">
					<label className="text-white" htmlFor="mobile">
						Phone Number
					</label>
					<input className="rounded-xl p-2" id="mobile" type="tel" />
				</div>

				<div className="flex items-center justify-center">
					<button
						className="w-[100px] rounded-xl bg-green-400 p-2 text-white"
						type="submit"
					>
						Add
					</button>
				</div>
			</form>
		</div>
	);
}
