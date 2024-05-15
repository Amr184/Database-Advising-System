import axios from "axios";
import toast from "react-hot-toast";
import CustomToaster from "../../../Components/CustomToaster";

export default function AdminLinkSlot() {
	function onLinkSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();

		const instructor_id = e.currentTarget["instructor-id"].value;
		const course_id = e.currentTarget["course-id"].value;
		const slot = e.currentTarget["slot-id"].value;

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

		if (slot == "" || slot == null) {
			toast.custom((t) => (
				<CustomToaster
					t={t}
					title={"An Error has occured, Data might be invalid."}
					description={"Slot must be valid."}
					danger
				/>
			));
			return;
		}

		axios
			.post(`http://localhost:8000/admin/link-instructor`, {
				instructor_id,
				course_id,
				slot,
			})
			.then(() => {
				toast.custom((t) => (
					<CustomToaster
						t={t}
						title={"Instructor linked successfully!"}
						description={`Instructor number ${instructor_id} linked to course number ${course_id} in slot number ${slot}.`}
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

	function onDeleteSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();

		const current_semester = e.currentTarget["current_semester"].value;

		axios
			.post(`http://localhost:8000/admin/delete-slot`, {
				current_semester,
			})
			.then(() => {
				toast.custom((t) => (
					<CustomToaster
						t={t}
						title={"Semester deleted successfully!"}
						description={`Semester number ${current_semester} was deleted.`}
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
				<h1 className="text-4xl text-white">Link slot</h1>
				<hr className="border-1 border-white" />
				<form
					className="flex flex-col justify-between gap-4"
					onSubmit={onLinkSubmit}
				>
					<div className="flex flex-col gap-1">
						<label className="text-white" htmlFor="instructor-id">
							Instructor ID
						</label>
						<input
							className="rounded-xl p-2"
							id="instructor-id"
							type="text"
						/>
					</div>

					<div className="flex flex-col gap-1">
						<label className="text-white" htmlFor="course-id">
							Course ID
						</label>
						<input
							className="rounded-xl p-2"
							id="course-id"
							type="text"
						/>
					</div>
					<div className="flex flex-col gap-1">
						<label className="text-white" htmlFor="slot-id">
							Slot ID
						</label>
						<input
							className="rounded-xl p-2"
							id="slot-id"
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
			<div className="flex w-full flex-col items-center justify-center text-2xl gap-6">
				<h1 className="text-4xl text-white">Delete Slot</h1>
				<hr className="border-1 border-white" />
				<form
					className="flex flex-col justify-between gap-4"
					onSubmit={onDeleteSubmit}
				>
					<div className="flex flex-col gap-1">
						<label
							className="text-white"
							htmlFor="current_semester"
						>
							Current Semester
						</label>
						<input
							className="rounded-xl p-2"
							id="current_semester"
							type="text"
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
