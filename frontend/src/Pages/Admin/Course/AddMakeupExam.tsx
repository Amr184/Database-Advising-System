import axios from "axios";
import toast from "react-hot-toast";
import CustomToaster from "../../../Components/CustomToaster";

export default function AdminAddMakeupExam() {
	function onAddSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();

		const type = e.currentTarget["type"].value;
		const date = e.currentTarget["date"].value;
		const course_id = e.currentTarget["course-id"].value;

		if (type != "first" && type != "second") {
			toast.custom((t) => (
				<CustomToaster
					t={t}
					title={"An Error has occured, Data might be invalid."}
					description={"Type must be first or second."}
					danger
				/>
			));
			return;
		}

		if (date == "" || date == null) {
			toast.custom((t) => (
				<CustomToaster
					t={t}
					title={"An Error has occured, Data might be invalid."}
					description={"Date must be valid."}
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

		axios
			.post(`http://localhost:8000/admin/add-makeup-exam`, {
				type,
				date,
				course_id,
			})
			.then(() => {
				toast.custom((t) => (
					<CustomToaster
						t={t}
						title={"Makeup added successfully!"}
						description={`${type} Makeup exam for ${course_id} at ${date} added successfully.`}
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
		<div className="flex h-full w-full flex-col justify-center text-2xl items-center gap-8 bg-gray-900 p-8">
			<h1 className="text-4xl text-white">Add Makeup Exam</h1>
			<hr className="border-1 border-white" />
			<form
				className="flex flex-col justify-between gap-4"
				onSubmit={onAddSubmit}
			>
				<div className="flex flex-col gap-1">
					<label className="text-white" htmlFor="type">
						Type (First/Second)
					</label>
					<input className="rounded-xl p-2" id="type" type="string" />
				</div>

				<div className="flex flex-col gap-1">
					<label className="text-white" htmlFor="date">
						Date
					</label>
					<input className="rounded-xl p-2" id="date" type="date" />
				</div>
				<div className="flex flex-col gap-1">
					<label className="text-white" htmlFor="course-id">
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
						Add
					</button>
				</div>
			</form>
		</div>
	);
}
