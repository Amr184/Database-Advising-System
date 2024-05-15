import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { EditIcon, PlusIcon, TrashIcon } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import CustomToaster from "../../Components/CustomToaster";

export default function AdvisorGradPlan() {
	const [addPlanModalOpen, setAddPlanModalOpen] = useState(false);
	const [addCourseModalOpen, setAddCourseModalOpen] = useState(false);
	const [updatePlanModalOpen, setUpdatePlanModalOpen] = useState(false);
	const [deleteCourseModalOpen, setDeleteCourseModalOpen] = useState(false);

	function onAddPlanSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		setAddPlanModalOpen(false);
		const student_id = e.currentTarget["student-id"].value;
		const semester_code = e.currentTarget["semester-code"].value;
		const sem_credit_hours = e.currentTarget["sem-credit-hours"].value;
		const expected_grad_date = e.currentTarget["expected-grad-date"].value;
		const advisor_id = localStorage.getItem("user");

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

		if (sem_credit_hours == "" || sem_credit_hours == null) {
			toast.custom((t) => (
				<CustomToaster
					t={t}
					title={"An Error has occured, Data might be invalid."}
					description={"Semester credit hours must be valid number."}
					danger
				/>
			));
			return;
		}

		if (expected_grad_date == "" || expected_grad_date == null) {
			toast.custom((t) => (
				<CustomToaster
					t={t}
					title={"An Error has occured, Data might be invalid."}
					description={
						"Expected grad date must be valid date string."
					}
					danger
				/>
			));
			return;
		}

		axios
			.post(`http://localhost:8000/advisor/add-graduation-plan`, {
				student_id,
				semester_code,
				sem_credit_hours,
				expected_grad_date,
				advisor_id,
			})
			.then(() => {
				setAddPlanModalOpen(false);
				toast.custom((t) => (
					<CustomToaster
						t={t}
						title={"Graduation plan added successfully!"}
						description={`Graduation plan for student ${student_id} added successfully.`}
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

	function onAddCourseSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		setAddCourseModalOpen(false);
		const student_id = e.currentTarget["student-id"].value;
		const semester_code = e.currentTarget["semester-code"].value;
		const course_name = e.currentTarget["course-name"].value;

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
			.post(`http://localhost:8000/advisor/add-graduation-plan-course`, {
				student_id,
				semester_code,
				course_name,
			})
			.then(() => {
				setAddCourseModalOpen(false);
				toast.custom((t) => (
					<CustomToaster
						t={t}
						title={"Course added to plan successfully!"}
						description={`Course number ${course_name} added to ${student_id}'s plan successfully.`}
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

	function onUpdatePlanSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		setDeleteCourseModalOpen(false);
		const student_id = e.currentTarget["student-id"].value;
		const expected_grad_date = e.currentTarget["expected-grad-date"].value;

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

		if (expected_grad_date == "" || expected_grad_date == null) {
			toast.custom((t) => (
				<CustomToaster
					t={t}
					title={"An Error has occured, Data might be invalid."}
					description={"Expected grad date must be valid."}
					danger
				/>
			));
			return;
		}

		axios
			.post(`http://localhost:8000/advisor/update-graduation-plan-date`, {
				student_id,
				expected_grad_date,
			})
			.then(() => {
				setUpdatePlanModalOpen(false);
				toast.custom((t) => (
					<CustomToaster
						t={t}
						title={"Plan updated successfully!"}
						description={`Expected grad date for ${student_id}'s plan updated to ${expected_grad_date} successfully.`}
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
		setDeleteCourseModalOpen(false);
		const student_id = e.currentTarget["student-id"].value;
		const semester_code = e.currentTarget["semester-code"].value;
		const course_id = e.currentTarget["course-id"].value;

		axios
			.post(
				`http://localhost:8000/advisor/delete-graduation-plan-course`,
				{
					student_id,
					semester_code,
					course_id,
				},
			)
			.then(() => {
				setDeleteCourseModalOpen(false);
				toast.custom((t) => (
					<CustomToaster
						t={t}
						title={"Course deleted successfully!"}
						description={`Course number ${course_id} for ${student_id}'s plan deleted successfully.`}
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
		<div className="flex h-[100%] w-[100%] flex-col items-center gap-8 bg-gray-900 p-8 text-white">
			<Dialog.Root
				open={addPlanModalOpen}
				onOpenChange={setAddPlanModalOpen}
			>
				<Dialog.Trigger asChild>
					<button className="flex w-[250px] items-center justify-center gap-2 rounded-xl bg-green-400 p-2 text-2xl">
						Add plan
						<PlusIcon size={20} />
					</button>
				</Dialog.Trigger>
				<Dialog.Portal
					container={document.querySelector("#dialog") as HTMLElement}
				>
					<Dialog.Overlay className="fixed bottom-0 left-0 right-0 top-0 z-[200] bg-black/40" />
					<Dialog.Content className="z-[200] flex h-[80vh] w-[90vh] flex-col gap-4 rounded-3xl bg-blue-700 p-4 text-black shadow-xl">
						<div className="flex w-full flex-row items-center justify-center text-2xl text-white">
							Add Grad Plan
						</div>
						<hr className="border-1 border-white" />
						<form
							className="flex flex-col justify-between gap-4"
							onSubmit={onAddPlanSubmit}
						>
							<div className="flex flex-col gap-1">
								<label
									className="text-white"
									htmlFor="student-id"
								>
									Student ID
								</label>
								<input
									className="rounded-xl p-2"
									id="student-id"
									type="text"
								/>
							</div>
							<div className="flex flex-col gap-1">
								<label
									className="text-white"
									htmlFor="semester-code"
								>
									Semester Code
								</label>
								<input
									className="rounded-xl p-2"
									id="semester-code"
									type="text"
								/>
							</div>
							<div className="flex flex-col gap-1">
								<label
									className="text-white"
									htmlFor="sem-credit-hours"
								>
									Semester Credit Hours
								</label>
								<input
									className="rounded-xl p-2"
									id="sem-credit-hours"
									type="number"
								/>
							</div>
							<div className="flex flex-col gap-1">
								<label
									className="text-white"
									htmlFor="expected-grad-date"
								>
									Expected Graduation Date
								</label>
								<input
									className="rounded-xl p-2"
									id="expected-grad-date"
									type="date"
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
					</Dialog.Content>
				</Dialog.Portal>
			</Dialog.Root>
			<Dialog.Root
				open={addCourseModalOpen}
				onOpenChange={setAddCourseModalOpen}
			>
				<Dialog.Trigger asChild>
					<button className="flex w-[250px] items-center justify-center gap-2 rounded-xl bg-green-500 p-2 text-2xl">
						Add course
						<PlusIcon size={20} />
					</button>
				</Dialog.Trigger>
				<Dialog.Portal
					container={document.querySelector("#dialog") as HTMLElement}
				>
					<Dialog.Overlay className="fixed bottom-0 left-0 right-0 top-0 z-[200] bg-black/40" />
					<Dialog.Content className="z-[200] flex h-[80vh] w-[90vh] flex-col gap-4 rounded-3xl bg-blue-700 p-4 text-black shadow-xl">
						<div className="flex w-full flex-row items-center justify-center text-2xl text-white">
							Add Course
						</div>
						<hr className="border-1 border-white" />
						<form
							className="flex flex-col justify-between gap-4"
							onSubmit={onAddCourseSubmit}
						>
							<div className="flex flex-col gap-1">
								<label
									className="text-white"
									htmlFor="student-id"
								>
									Student ID
								</label>
								<input
									className="rounded-xl p-2"
									id="student-id"
									type="text"
								/>
							</div>
							<div className="flex flex-col gap-1">
								<label
									className="text-white"
									htmlFor="semester-code"
								>
									Semester Code
								</label>
								<input
									className="rounded-xl p-2"
									id="semester-code"
									type="text"
								/>
							</div>
							<div className="flex flex-col gap-1">
								<label
									className="text-white"
									htmlFor="course-name"
								>
									Course Name
								</label>
								<input
									className="rounded-xl p-2"
									id="course-name"
									type="text"
								/>
							</div>
							<div className="flex items-center justify-center">
								<button
									className="w-[100px] rounded-xl bg-green-500 p-2 text-white"
									type="submit"
								>
									Add
								</button>
							</div>
						</form>
					</Dialog.Content>
				</Dialog.Portal>
			</Dialog.Root>
			<Dialog.Root
				open={updatePlanModalOpen}
				onOpenChange={setUpdatePlanModalOpen}
			>
				<Dialog.Trigger asChild>
					<button className="flex w-[250px] items-center justify-center gap-2 rounded-xl bg-green-600 p-2 text-2xl">
						Update plan date
						<EditIcon size={20} />
					</button>
				</Dialog.Trigger>
				<Dialog.Portal
					container={document.querySelector("#dialog") as HTMLElement}
				>
					<Dialog.Overlay className="fixed bottom-0 left-0 right-0 top-0 z-[200] bg-black/40" />
					<Dialog.Content className="z-[200] flex h-[80vh] w-[90vh] flex-col gap-4 rounded-3xl bg-blue-700 p-4 text-black shadow-xl">
						<div className="flex w-full flex-row items-center justify-center text-2xl text-white">
							Update Grad Plan Date
						</div>
						<hr className="border-1 border-white" />
						<form
							className="flex flex-col justify-between gap-4"
							onSubmit={onUpdatePlanSubmit}
						>
							<div className="flex flex-col gap-1">
								<label
									className="text-white"
									htmlFor="student-id"
								>
									Student ID
								</label>
								<input
									className="rounded-xl p-2"
									id="student-id"
									type="text"
								/>
							</div>
							<div className="flex flex-col gap-1">
								<label
									className="text-white"
									htmlFor="expected-grad-date"
								>
									Expected Graduation Date
								</label>
								<input
									className="rounded-xl p-2"
									id="expected-grad-date"
									type="date"
								/>
							</div>
							<div className="flex items-center justify-center">
								<button
									className="w-[100px] rounded-xl bg-green-600 p-2 text-white"
									type="submit"
								>
									Update
								</button>
							</div>
						</form>
					</Dialog.Content>
				</Dialog.Portal>
			</Dialog.Root>
			<Dialog.Root
				open={deleteCourseModalOpen}
				onOpenChange={setDeleteCourseModalOpen}
			>
				<Dialog.Trigger asChild>
					<button className="flex w-[250px] items-center justify-center gap-2 rounded-xl bg-red-400 p-2 text-2xl">
						Delete course
						<TrashIcon size={20} />
					</button>
				</Dialog.Trigger>
				<Dialog.Portal
					container={document.querySelector("#dialog") as HTMLElement}
				>
					<Dialog.Overlay className="fixed bottom-0 left-0 right-0 top-0 z-[200] bg-black/40" />
					<Dialog.Content className="z-[200] flex h-[80vh] w-[90vh] flex-col gap-4 rounded-3xl bg-blue-700 p-4 text-black shadow-xl">
						<div className="flex w-full flex-row items-center justify-center text-2xl text-white">
							Delete Grad Plan
						</div>
						<hr className="border-1 border-white" />
						<form
							className="flex flex-col justify-between gap-4"
							onSubmit={onDeleteSubmit}
						>
							<div className="flex flex-col gap-1">
								<label
									className="text-white"
									htmlFor="student-id"
								>
									Student ID
								</label>
								<input
									className="rounded-xl p-2"
									id="student-id"
									type="text"
								/>
							</div>
							<div className="flex flex-col gap-1">
								<label
									className="text-white"
									htmlFor="semester-code"
								>
									Semester Code
								</label>
								<input
									className="rounded-xl p-2"
									id="semester-code"
									type="text"
								/>
							</div>
							<div className="flex flex-col gap-1">
								<label
									className="text-white"
									htmlFor="course-id"
								>
									Course ID
								</label>
								<input
									className="rounded-xl p-2"
									id="course-id"
									type="text"
								/>
							</div>
							<div className="flex items-center justify-center">
								<button
									className="w-[100px] rounded-xl bg-red-600 p-2 text-white"
									type="submit"
								>
									Delete
								</button>
							</div>
						</form>
					</Dialog.Content>
				</Dialog.Portal>
			</Dialog.Root>
		</div>
	);
}
