import React from "react";
import { loginButtonClass } from "../../assets/Styles";
import axios from "axios";
import toast from "react-hot-toast";
import CustomToaster from "../../Components/CustomToaster";

export default function Instructor() {
	const id = localStorage.getItem("user") ?? 1;

	const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const course_id = e.currentTarget["course-id"].value;
		const instructor_id = e.currentTarget["instructor-id"].value;
		const semester_code = e.currentTarget["semester-code"].value;

		if (course_id == "" || course_id == null) {
			toast.custom((t) => (
				<CustomToaster
					t={t}
					title={"An Error has occured, Data might be invalid."}
					description={"Course ID must be valid."}
					danger
				/>
			));
			return;
		}

		if (instructor_id == "" || instructor_id == null) {
			toast.custom((t) => (
				<CustomToaster
					t={t}
					title={"An Error has occured, Data might be invalid."}
					description={"Instructor ID must be valid."}
					danger
				/>
			));
			return;
		}

		if (semester_code == "" || semester_code == null) {
			toast.custom((t) => (
				<CustomToaster
					t={t}
					title={"An Error has occured, Data might be invalid."}
					description={"Semester code must be valid."}
					danger
				/>
			));
			return;
		}

		axios
			.post(`http://localhost:8000/student/choose-instuctor`, {
				id: id,
				instructor_id: instructor_id,
				course_id: course_id,
				semester_code: semester_code,
			})
			.then(() => {
				toast.custom((t) => (
					<CustomToaster
						t={t}
						title={"Instructor selected successfully!"}
						description={`Instructor number ${instructor_id} added to course ${course_id} in semester ${semester_code}.`}
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
	};

	return (
		<div className="flex h-[100%] w-[100%] flex-col items-center bg-gray-900">
			<form className="flex flex-col gap-6 p-10" onSubmit={onFormSubmit}>
				<div className={`flex flex-col gap-2 `}>
					<label htmlFor="course-id" className="text-white">
						Course ID
					</label>
					<input
						type="string"
						id="course-id"
						className="rounded-md p-2"
					/>
				</div>
				<div className={`flex flex-col gap-2 `}>
					<label htmlFor="instructor-id" className="text-white">
						Instructor ID
					</label>
					<input
						type="string"
						id="instructor-id"
						className="rounded-md p-2"
					/>
				</div>
				<div className="flex flex-col gap-2">
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
