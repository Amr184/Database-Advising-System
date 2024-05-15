import { useMemo } from "react";
import { createColumnHelper } from "@tanstack/react-table";
import Table from "../../../Components/Table";
import { TAdminGradPlan } from "../../../types";
import axios from "axios";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import CustomToaster from "../../../Components/CustomToaster";

export default function AdminGradPlan() {
	const columnHelper = createColumnHelper<TAdminGradPlan>();
	const [data, setData] = useState<TAdminGradPlan[]>([]);

	const columns = useMemo(
		() => [
			columnHelper.accessor("plan_id", {
				id: "plan_id",
				header: "ID",
				cell: (info) => <div>{info.getValue()}</div>,
			}),
			columnHelper.accessor("semester_code", {
				id: "semester_code",
				header: "Semester Code",
				cell: (info) => <div>{info.getValue()}</div>,
			}),
			columnHelper.accessor("semester_credit_hours", {
				id: "semester_credit_hours",
				header: "Semester Credit Hours",
				cell: (info) => <div>{info.getValue()}</div>,
			}),
			columnHelper.accessor("expected_grad_date", {
				id: "expected_grad_date",
				header: "Expected Graduation Date",
				cell: (info) => <div>{info.getValue().split("T")[0]}</div>,
			}),
			columnHelper.accessor("student_id", {
				id: "student_id",
				header: "Student ID",
				cell: (info) => <div>{info.getValue()}</div>,
				footer: (info) => info.column.id,
			}),
			columnHelper.accessor("advisor_id", {
				id: "advisor_id",
				header: "Advisor ID",
				cell: (info) => <div>{info.getValue()}</div>,
			}),
			columnHelper.accessor("advisor_name", {
				id: "advisor_name",
				header: "Advisor Name",
				cell: (info) => <div>{info.getValue()}</div>,
			}),
		],
		[columnHelper],
	);

	const id = localStorage.getItem("user") ?? "1";

	const columnTypes = {
		student_id: "number",
		student_name: "string",
		graduation_plan_id: "number",
		course_id: "number",
		course_name: "string",
		semester_code: "number",
		expected_graduation_date: "string",
		semester_credit_hours: "number",
		advisor_id: "number",
	};

	useEffect(() => {
		axios
			.get(`http://localhost:8000/admin/view-graduation-plans`)
			.then((res) => setData(res.data))
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
	}, []);

	return (
		<div className="flex h-[100%] w-[100%] flex-col items-center bg-gray-900 text-white">
			<div className="w-[95%]">
				<Table
					columns={columns}
					columnTypes={columnTypes as any}
					data={data}
				/>
			</div>
		</div>
	);
}
