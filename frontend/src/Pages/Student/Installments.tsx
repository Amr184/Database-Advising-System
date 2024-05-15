import axios from "axios";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import CustomToaster from "../../Components/CustomToaster";

export default function Installments() {
	const [data, setData] = useState<string>();

	const id = localStorage.getItem("user") ?? 1;

	useEffect(() => {
		axios
			.post(`http://localhost:8000/student/upcoming-installment`, {
				id: id,
			})
			.then((res) => {
				setData(res.data[0].deadline);
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
	}, [id]);

	return (
		<div className="flex flex-col h-[100%] w-[100%] justify-center gap-16 p-20 items-center bg-gray-900 text-white">
			<h1 className="text-4xl font-bold">Upcoming Installment</h1>
			<div className="flex gap-6">
				<label className="text-2xl">Date:</label>
				<label className="text-2xl">{data?.split("T")[0] ?? "-"}</label>
			</div>
		</div>
	);
}
