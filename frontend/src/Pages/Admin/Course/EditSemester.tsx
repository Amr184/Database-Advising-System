import axios from "axios";
import toast from "react-hot-toast";
import CustomToaster from "../../../Components/CustomToaster";

export default function AdminEditSemester() {
	function onAddSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();

		const start_date = e.currentTarget["start_date"].value;
		const end_date = e.currentTarget["end_date"].value;
		const sem_code = e.currentTarget["sem_code"].value;

		if (start_date == "" || start_date == null) {
			toast.custom((t) => (
				<CustomToaster
					t={t}
					title={"An Error has occured, Data might be invalid."}
					description={"Start date must be valid."}
					danger
				/>
			));
			return;
		}

		if (end_date == "" || end_date == null) {
			toast.custom((t) => (
				<CustomToaster
					t={t}
					title={"An Error has occured, Data might be invalid."}
					description={"End date must be valid."}
					danger
				/>
			));
			return;
		}

		if (sem_code == "" || sem_code == null) {
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
			.post(`http://localhost:8000/admin/add-semester`, {
				start_date,
				end_date,
				sem_code,
			})
			.then(() => {
				toast.custom((t) => (
					<CustomToaster
						t={t}
						title={"Semester added successfully!"}
						description={`Semester code ${sem_code} from ${start_date} to ${end_date} added successfully.`}
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
	function onLinkSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();

		const instructor_id = e.currentTarget["instructor_id"].value;
		const student_id = e.currentTarget["student_id"].value;
		const course_id = e.currentTarget["course_id"].value;
		const semester_code = e.currentTarget["sem_code"].value;

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

		if (student_id == "" || student_id == null) {
			toast.custom((t) => (
				<CustomToaster
					t={t}
					title={"An Error has occured, Data might be invalid."}
					description={"Student ID must be valid."}
					danger
				/>
			));
			return;
		}

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
			.post(`http://localhost:8000/admin/link-student`, {
				instructor_id,
				student_id,
				course_id,
				semester_code,
			})
			.then(() => {
				toast.custom((t) => (
					<CustomToaster
						t={t}
						title={
							"Student, Instructor, Course and Semester linked successfully!"
						}
						description={`Student number ${student_id}, instructor number ${instructor_id}, course number ${course_id} and semester ${semester_code} linked successfully.`}
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
			<div className="flex w-full flex-col items-center justify-center gap-6 text-2xl">
				<h1 className="text-4xl text-white">Add Semester</h1>
				<hr className="border-1 border-white" />
				<form
					className="flex flex-col justify-between gap-4"
					onSubmit={onAddSubmit}
				>
					<div className="flex flex-col gap-1">
						<label className="text-white" htmlFor="start_date">
							Start Date
						</label>
						<input
							className="rounded-xl p-2"
							id="start_date"
							type="date"
						/>
					</div>

					<div className="flex flex-col gap-1">
						<label className="text-white" htmlFor="end_date">
							End Date
						</label>
						<input
							className="rounded-xl p-2"
							id="end_date"
							type="date"
						/>
					</div>
					<div className="flex flex-col gap-1">
						<label className="text-white" htmlFor="sem_code">
							Semester Code
						</label>
						<input
							className="rounded-xl p-2"
							id="sem_code"
							type="text"
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
			<div className="flex w-full flex-col items-center justify-center gap-6 text-2xl">
				<h1 className="text-4xl text-white">Link Semester</h1>
				<hr className="border-1 border-white" />
				<form
					className="flex flex-col justify-between gap-4"
					onSubmit={onLinkSubmit}
				>
					<div className="flex flex-col gap-1">
						<label className="text-white" htmlFor="instructor_id">
							Instructor ID
						</label>
						<input
							className="rounded-xl p-2"
							id="instructor_id"
							type="number"
						/>
					</div>
					<div className="flex flex-col gap-1">
						<label className="text-white" htmlFor="student_id">
							Student ID
						</label>
						<input
							className="rounded-xl p-2"
							id="student_id"
							type="number"
						/>
					</div>
					<div className="flex flex-col gap-1">
						<label className="text-white" htmlFor="course_id">
							Course ID
						</label>
						<input
							className="rounded-xl p-2"
							id="course_id"
							type="number"
						/>
					</div>
					<div className="flex flex-col gap-1">
						<label className="text-white" htmlFor="sem_code">
							Semester Code
						</label>
						<input
							className="rounded-xl p-2"
							id="sem_code"
							type="text"
						/>
					</div>
					<div className="flex items-center justify-center">
						<button
							className="w-[100px] rounded-xl bg-green-400 p-2 text-white"
							type="submit"
						>
							Link
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
