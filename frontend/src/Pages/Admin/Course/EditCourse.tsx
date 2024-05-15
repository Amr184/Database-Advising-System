import axios from "axios";
import toast from "react-hot-toast";
import CustomToaster from "../../../Components/CustomToaster";

export default function AdminEditCourse() {
	function onDeleteSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();

		const course_id = e.currentTarget["course-id"].value;

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

		axios
			.post(`http://localhost:8000/admin/delete-course`, {
				course_id,
			})
			.then(() => {
				toast.custom((t) => (
					<CustomToaster
						t={t}
						title={"Course delete successfully!"}
						description={`Course number ${course_id} deleted successfully.`}
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
	function onAddSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();

		const major = e.currentTarget["major"].value;
		const semester = e.currentTarget["semester"].value;
		const credit_hours = e.currentTarget["credit_hours"].value;
		const course_name = e.currentTarget["course_name"].value;
		const is_offered = e.currentTarget["is_offered"].checked ? 1 : 0;

		if (major == "" || major == null) {
			toast.custom((t) => (
				<CustomToaster
					t={t}
					title={"An Error has occured, Data might be invalid."}
					description={"Major must be valid."}
					danger
				/>
			));
			return;
		}

		if (semester == "" || semester == null) {
			toast.custom((t) => (
				<CustomToaster
					t={t}
					title={"An Error has occured, Data might be invalid."}
					description={"Semester must be valid."}
					danger
				/>
			));
			return;
		}

		if (credit_hours == "" || credit_hours == null) {
			toast.custom((t) => (
				<CustomToaster
					t={t}
					title={"An Error has occured, Data might be invalid."}
					description={"Credit hours must be valid."}
					danger
				/>
			));
			return;
		}

		if (course_name == "" || course_name == null) {
			toast.custom((t) => (
				<CustomToaster
					t={t}
					title={"An Error has occured, Data might be invalid."}
					description={"Course name must be valid."}
					danger
				/>
			));
			return;
		}

		axios
			.post(`http://localhost:8000/admin/add-course`, {
				major,
				semester,
				credit_hours,
				course_name,
				is_offered,
			})
			.then(() => {
				toast.custom((t) => (
					<CustomToaster
						t={t}
						title={"Course added successfully!"}
						description={`Course for major ${major}, semester ${semester}, credit hours ${credit_hours}, course name ${course_name}, is offered ${is_offered} successfully.`}
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
		<div className="grid h-[100%] w-[100%] grid-cols-2 items-center gap-8 bg-gray-900 p-8">
			<div className="flex w-full flex-col items-center justify-center text-2xl gap-6">
				<h1 className="text-4xl text-white">Add Course</h1>
				<hr className="border-1 border-white" />
				<form
					className="flex flex-col justify-between gap-4"
					onSubmit={onAddSubmit}
				>
					<div className="flex flex-col gap-1">
						<label className="text-white" htmlFor="major">
							Major
						</label>
						<input
							className="rounded-xl p-2"
							id="major"
							type="text"
						/>
					</div>

					<div className="flex flex-col gap-1">
						<label className="text-white" htmlFor="semester">
							Semester
						</label>
						<input
							className="rounded-xl p-2"
							id="semester"
							type="text"
						/>
					</div>
					<div className="flex flex-col gap-1">
						<label className="text-white" htmlFor="credit_hours">
							Credit Hours
						</label>
						<input
							className="rounded-xl p-2"
							id="credit_hours"
							type="text"
						/>
					</div>
					<div className="flex flex-col gap-1">
						<label className="text-white" htmlFor="course_name">
							Course Name
						</label>
						<input
							className="rounded-xl p-2"
							id="course_name"
							type="text"
						/>
					</div>
					<div className="flex items-center gap-4">
						<label className="text-white" htmlFor="is_offered">
							Is Offered
						</label>
						<input
							className="w-6 h-6 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-50"
							id="is_offered"
							type="checkbox"
						/>
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
			<div className="flex w-full flex-col items-center justify-center text-2xl gap-6">
				<h1 className="text-4xl text-white">Delete Course</h1>
				<hr className="border-1 border-white" />
				<form
					className="flex flex-col justify-between gap-4"
					onSubmit={onDeleteSubmit}
				>
					<div className="flex flex-col gap-1">
						<label className="text-white" htmlFor="course_id">
							Course ID
						</label>
						<input
							className="rounded-xl p-2"
							id="course-id"
							type="number"
						/>
					</div>
					<div className="flex items-center justify-center">
						<button
							className="w-[100px] rounded-xl bg-green-400 p-2 text-white"
							type="submit"
						>
							Delete
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
