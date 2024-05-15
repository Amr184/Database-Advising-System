import { useEffect, useMemo, useState } from "react";
import Table from "../../../Components/Table";
import { createColumnHelper } from "@tanstack/react-table";
import axios from "axios";
import { TAdminAdvisorStudent } from "../../../types";
import toast from "react-hot-toast";
import CustomToaster from "../../../Components/CustomToaster";

export default function AdminAdvisorStudents() {
	const columnHelper = createColumnHelper<TAdminAdvisorStudent>();
	const [data, setData] = useState<TAdminAdvisorStudent[]>([]);

	const columns = useMemo(
		() => [
			columnHelper.accessor("student_id", {
				header: "Student ID",
				cell: (info) => <div>{info.getValue()}</div>,
				footer: (info) => info.column.id,
			}),
			columnHelper.accessor("student_name", {
				header: "Student Name",
				cell: (info) => <div>{info.getValue()}</div>,
			}),
			columnHelper.accessor("major", {
				header: "Major",
				cell: (info) => <div>{info.getValue()}</div>,
			}),
			columnHelper.accessor("gpa", {
				header: "GPA",
				cell: (info) => <div>{info.getValue()}</div>,
			}),
			columnHelper.accessor("faculty", {
				header: "Faculty",
				cell: (info) => <div>{info.getValue()}</div>,
			}),
			columnHelper.accessor("email", {
				header: "Email",
				cell: (info) => <div>{info.getValue()}</div>,
			}),
			columnHelper.accessor("password", {
				header: "Password",
				cell: (info) => <div>{info.getValue()}</div>,
			}),
			columnHelper.accessor("financial_status", {
				header: "Financial Status",
				cell: (info) => (
					<div>{info.getValue() === true ? "Yes" : "No"}</div>
				),
			}),
			columnHelper.accessor("semester", {
				header: "Semester",
				cell: (info) => <div>{info.getValue()}</div>,
			}),
			columnHelper.accessor("acquired_hours", {
				header: "Acquired Hours",
				cell: (info) => <div>{info.getValue()}</div>,
			}),
			columnHelper.accessor("assigned_hours", {
				header: "Assigned Hours",
				cell: (info) => <div>{info.getValue()}</div>,
			}),
			columnHelper.accessor("advisor_id", {
				header: "Advisor ID",
				cell: (info) => <div>{info.getValue()}</div>,
			}),
			columnHelper.accessor("advisor_name", {
				header: "Advisor Name",
				cell: (info) => <div>{info.getValue()}</div>,
			}),
		],
		[columnHelper],
	);

	const columnTypes = {
		student_id: "number",
		student_name: "string",
		major: "string",
		gpa: "number",
		faculty: "string",
		email: "string",
		password: "string",
		financial_status: "boolean",
		semester: "number",
		acquired_hours: "number",
		assigned_hours: "number",
		advisor_id: "number",
		advisor_name: "string",
	};

	useEffect(() => {
		axios
			.get(`http://localhost:8000/admin/students`)
			.then((res) => {
				setData(res.data);
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
	}, []);

	return (
		<div className="flex h-full flex-col items-center bg-gray-900 text-white">
			<Table
				columns={columns}
				columnTypes={columnTypes as any}
				data={data}
			/>
		</div>
	);
}
