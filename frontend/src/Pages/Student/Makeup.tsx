import axios from "axios";
import React, { useState } from "react";
import { loginButtonClass } from "../../assets/Styles";
import { toast } from "react-hot-toast";
import CustomToaster from "../../Components/CustomToaster";

export default function Makeup() {
	const [requestType, setRequestType] = useState<"first" | "second">("first");

	const id = localStorage.getItem("user") ?? 1;

	const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const course_id = e.currentTarget["course-id"].value;
		const semester_code = e.currentTarget["semester-code"].value;
		if (requestType === "first") {
			axios
				.post(
					`http://localhost:8000/student/register-first-makeup-exam`,
					{
						id: id,
						course_id: course_id,
						semester_code: semester_code,
					},
				)
				.then((res) => {
					toast.custom((t) => (
						<CustomToaster
							t={t}
							title={
								res.data
									? "First makeup registeration successful!"
									: "First makeup registeration unsuccessful!"
							}
							description={
								res.data
									? `Make up registered for course number ${course_id} in semester ${semester_code}.`
									: `Data may be invalid or you may not be elligable.`
							}
							danger={!res.data}
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
			axios
				.post(
					`http://localhost:8000/student/register-second-makeup-exam`,
					{
						id: id,
						course_id: course_id,
						semester_code: semester_code,
					},
				)
				.then((res) => {
					toast.custom((t) => (
						<CustomToaster
							t={t}
							title={
								res.data
									? "Second makeup registeration successful!"
									: "Second makeup registeration unsuccessful!"
							}
							description={
								res.data
									? `Make up registered for course number ${course_id} in semester ${semester_code}.`
									: `Data may be invalid or you may not be elligable.`
							}
							danger={!res.data}
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
							requestType === "first"
								? "scale-125 transition-transform duration-500 ease-in-out"
								: " scale-100 transition-transform duration-500 ease-in-out"
						}`}
						onClick={() => {
							setRequestType("first");
						}}
					>
						<label className="text-white">First Makeup</label>
					</button>
					<button
						className={`flex h-10 w-36 cursor-pointer items-center justify-center rounded-full bg-blue-500 p-3 font-bold text-white ${
							requestType === "second"
								? "scale-125 transition-transform duration-500 ease-in-out"
								: "scale-100 transition-transform duration-500 ease-in-out"
						}`}
						onClick={() => {
							setRequestType("second");
						}}
					>
						<label className="text-white">Second Makeup</label>
					</button>
				</div>
				<div className={`flex flex-col gap-2`}>
					<label htmlFor="course_id" className="text-white">
						Course ID
					</label>
					<input
						type="string"
						id="course-id"
						className="rounded-md p-2"
					/>
				</div>
				<div className={`flex flex-col gap-2`}>
					<label htmlFor="semester-code" className="text-white">
						Semester Code
					</label>
					<input
						type="string"
						id="semester-code"
						className="rounded-md p-2"
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
