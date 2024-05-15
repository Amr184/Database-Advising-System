import { useEffect, useMemo, useState } from "react";
import Table from "../../../Components/Table";
import { createColumnHelper } from "@tanstack/react-table";
import axios from "axios";
import { TAdminStudent } from "../../../types";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { MoreVertical } from "lucide-react";
import toast from "react-hot-toast";
import CustomToaster from "../../../Components/CustomToaster";

export default function AdminAllStudents() {
	const columnHelper = createColumnHelper<TAdminStudent & "Actions">();
	const [data, setData] = useState<TAdminStudent[]>([]);

	const [refetch, setRefetch] = useState(false);

	const onUpdateStudentStatus = (student_id: number) => {
		axios
			.post(`http://localhost:8000/admin/update-status`, {
				student_id,
			})
			.then((res) => {
				toast.custom((t) => (
					<CustomToaster
						t={t}
						title={
							res.status === 200
								? "Status updated successfully!"
								: "An Error has occured"
						}
						description={
							res.status === 200
								? `Status updated for student number ${student_id}.`
								: `Data may be invalid.`
						}
						danger={res.status !== 200}
					/>
				));
				setRefetch(!refetch);
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
			columnHelper.accessor("anchor", {
				header: "",
				cell: ({
					row: {
						original: { student_id },
					},
				}) => (
					<DropdownMenu.Root modal={false}>
						<DropdownMenu.Trigger>
							<MoreVertical size={20} />
						</DropdownMenu.Trigger>
						<DropdownMenu.Portal>
							<DropdownMenu.Content
								sideOffset={5}
								className="z-10 rounded-xl text-center shadow-md"
							>
								<DropdownMenu.Item
									className="flex cursor-pointer items-center rounded-xl bg-blue-400 p-3"
									onClick={() =>
										onUpdateStudentStatus(student_id)
									}
								>
									Update Status
								</DropdownMenu.Item>
							</DropdownMenu.Content>
						</DropdownMenu.Portal>
					</DropdownMenu.Root>
				),
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
	};

	useEffect(() => {
		axios
			.get(`http://localhost:8000/admin/view-active-students`)
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
	}, [refetch]);

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
