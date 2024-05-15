import { useMemo } from "react";
import { createColumnHelper } from "@tanstack/react-table";
import Table from "../../Components/Table";
import { TStudentGradPlan } from "../../types";
import axios from "axios";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import CustomToaster from "../../Components/CustomToaster";

export default function StudentGradPlan() {
	const columnHelper = createColumnHelper<TStudentGradPlan>();
	const [gradPlan, setGradPlan] = useState<TStudentGradPlan>();
	const [gradPlanCourses, setGradPlanCourses] = useState<TStudentGradPlan[]>(
		[],
	);

	const columns = useMemo(
		() => [
			columnHelper.accessor("course_id", {
				id: "course_id",
				header: "Course ID",
				cell: (info) => <div>{info.getValue()}</div>,
			}),
			columnHelper.accessor("course_name", {
				id: "course_name",
				header: "Course Name",
				cell: (info) => <div>{info.getValue()}</div>,
			}),
			columnHelper.accessor("semester_code", {
				id: "semester_code",
				header: "Semester",
				cell: (info) => <div>{info.getValue()}</div>,
			}),
		],
		[columnHelper],
	);

	const id = localStorage.getItem("user") ?? 1;

	const columnTypes = {
		course_id: "number",
		course_name: "string",
		semester: "string",
	};

	useEffect(() => {
		axios
			.post(`http://localhost:8000/student/graduation-plan`, {
				id: id,
			})
			.then((res) => {
				setGradPlan(res.data[0]);
				setGradPlanCourses(res.data);
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
		<div className="flex h-[100%] w-[100%] flex-col items-center bg-gray-900 text-white">
			<div className="flex flex-col gap-8">
				<h1 className="text-4xl font-bold">
					Graduation Plan {gradPlan?.graduation_plan_id}
				</h1>
				<div className="flex flex-col gap-2">
					<div className="flex items-center gap-6">
						<label className="text-2xl">Student ID:</label>
						<label className="text-2xl">
							{gradPlan?.student_id ?? "-"}
						</label>
					</div>
					<div className="flex items-center gap-6">
						<label className="text-2xl">Advisor ID:</label>
						<label className="text-2xl">
							{gradPlan?.advisor_id ?? "-"}
						</label>
					</div>
					<div className="flex items-center gap-6">
						<label className="text-2xl">
							Expected Graduation Date:
						</label>
						<label className="text-2xl">
							{gradPlan?.expected_graduation_date.split("T")[0] ??
								"-"}
						</label>
					</div>
					<div className="flex items-center gap-6">
						<label className="text-2xl">
							Semester Credit Hours:
						</label>
						<label className="text-2xl">
							{gradPlan?.semester_credit_hours ?? "-"}
						</label>
					</div>
					<div className="flex items-center gap-6">
						<label className="text-2xl">Semester Code:</label>
						<label className="text-2xl">
							{gradPlan?.semester_code ?? "-"}
						</label>
					</div>
				</div>
			</div>
			<div className="w-[95%]">
				<Table
					columns={columns}
					columnTypes={columnTypes as any}
					data={gradPlanCourses}
				/>
			</div>
		</div>
	);
}
