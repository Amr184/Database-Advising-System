import { useState } from "react";
import { loginButtonClass } from "../../assets/Styles";
import axios from "axios";
import toast from "react-hot-toast";
import CustomToaster from "../../Components/CustomToaster";

export default function StudentRequests() {
	const [requestType, setRequestType] = useState<"course" | "credit">(
		"course",
	);

	const id = localStorage.getItem("user") ?? 1;

	const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const comment = e.currentTarget["comment"].value;
		if (requestType === "course") {
			const course_id = e.currentTarget["course-id"].value;
			axios
				.post(`http://localhost:8000/student/request-course`, {
					id: id,
					course_id: course_id,
					type: "course",
					comment: comment,
				})
				.then(() => {
					toast.custom((t) => (
						<CustomToaster
							t={t}
							title={"Course request sent successfully!"}
							description={`Request for course number ${course_id} sent successfully.`}
						/>
					));
				})
				.catch((err) =>
					toast.custom((t) => (
						<CustomToaster
							t={t}
							title={
								"An Error has occured, Data might be invalid."
							}
							description={err.message}
							danger
						/>
					)),
				);
		} else {
			const hours = e.currentTarget["hours"].value;
			axios
				.post(`http://localhost:8000/student/request-hours`, {
					id: id,
					hours: hours,
					type: "credit hours",
					comment: comment,
				})
				.then(() => {
					toast.custom((t) => (
						<CustomToaster
							t={t}
							title={"Credit hours request sent successfully!"}
							description={`Request for ${hours} credit hours sent successfully.`}
						/>
					));
				})
				.catch((err) =>
					toast.custom((t) => (
						<CustomToaster
							t={t}
							title={
								"An Error has occured, Data might be invalid."
							}
							description={err.message}
							danger
						/>
					)),
				);
		}
	};

	return (
		<div className="flex h-[100%] w-[100%] flex-col items-center bg-gray-900">
			<form className="flex flex-col gap-6 p-10" onSubmit={onFormSubmit}>
				<div className="flex items-center gap-12 pb-4">
					<button
						className={`flex h-10 w-36 cursor-pointer items-center justify-center rounded-full bg-blue-500 p-3 font-bold text-white ${
							requestType === "course"
								? "scale-125 transition-transform duration-500 ease-in-out"
								: " scale-100 transition-transform duration-500 ease-in-out"
						}`}
						onClick={() => {
							setRequestType("course");
						}}
					>
						<label className="text-white">Course</label>
					</button>
					<button
						className={`flex h-10 w-36 cursor-pointer items-center justify-center rounded-full bg-blue-500 p-3 font-bold text-white ${
							requestType === "credit"
								? "scale-125 transition-transform duration-500 ease-in-out"
								: "scale-100 transition-transform duration-500 ease-in-out"
						}`}
						onClick={() => {
							setRequestType("credit");
						}}
					>
						<label className="text-white">Credit Hours</label>
					</button>
				</div>
				<div
					className={`flex flex-col gap-2 ${
						requestType === "credit" ? "hidden" : ""
					}`}
				>
					<label htmlFor="course_id" className="text-white">
						Course ID
					</label>
					<input
						type="string"
						id="course-id"
						className="rounded-md p-2"
					/>
				</div>
				<div
					className={`flex flex-col gap-2 ${
						requestType === "course" ? "hidden" : ""
					}`}
				>
					<label htmlFor="hours" className="text-white">
						Hours
					</label>
					<input
						type="string"
						id="hours"
						className="rounded-md p-2"
					/>
				</div>
				<div className="flex flex-col gap-2">
					<label htmlFor="comment" className="text-white">
						Comment
					</label>
					<textarea
						id="comment"
						className="rounded-md p-2"
						placeholder="Reason for request"
						rows={5}
						cols={40}
					/>
				</div>
				<div className="flex items-center justify-center gap-2">
					<button type="submit" className={loginButtonClass}>
						Submit
					</button>
				</div>
			</form>
		</div>
	);
}
