import { useEffect, useMemo, useState } from "react";
import { createColumnHelper } from "@tanstack/react-table";
import Table from "../../../Components/Table";
import { TAdminRequest } from "../../../types";
import axios from "axios";
import toast from "react-hot-toast";
import CustomToaster from "../../../Components/CustomToaster";

export default function AdminRequests() {
	const columnHelper = createColumnHelper<TAdminRequest>();
	const [data, setData] = useState<TAdminRequest[]>([]);

	const columns = useMemo(
		() => [
			columnHelper.accessor("request_id", {
				id: "request_id",
				header: "Request ID",
				cell: (info) => <div>{info?.getValue() ?? "-"}</div>,
				footer: (info) => info.column.id,
			}),
			columnHelper.accessor("type", {
				id: "type",
				header: "Type",
				cell: (info) => <div>{info.getValue()}</div>,
			}),
			columnHelper.accessor("comment", {
				id: "comment",
				header: "Comment",
				cell: (info) => <div>{info.getValue()}</div>,
			}),
			columnHelper.accessor("status", {
				id: "status",
				header: "Status",
				cell: (info) => <div>{info.getValue()}</div>,
			}),
			columnHelper.accessor("credit_hours", {
				id: "credit_hours",
				header: "Credit Hours",
				cell: (info) => <div>{info?.getValue() ?? "-"}</div>,
			}),
			columnHelper.accessor("student_id", {
				id: "student_id",
				header: "Student ID",
				cell: (info) => <div>{info.getValue()}</div>,
			}),
			columnHelper.accessor("student_name", {
				id: "student_name",
				header: "Student Name",
				cell: (info) => <div>{info.getValue()}</div>,
			}),
			columnHelper.accessor("advisor_id", {
				id: "advisor_id",
				header: "Advisor ID",
				cell: (info) => <div>{info.getValue()}</div>,
				footer: (info) => info.column.id,
			}),
			columnHelper.accessor("advisor_name", {
				id: "advisor_name",
				header: "Advisor Name",
				cell: (info) => <div>{info.getValue()}</div>,
			}),
			columnHelper.accessor("course_id", {
				id: "course_id",
				header: "Course ID",
				cell: (info) => <div>{info.getValue()}</div>,
			}),
		],
		[columnHelper],
	);

	const columnTypes = {
		request_id: "number",
		type: "string",
		comment: "string",
		status: "string",
		credit_hours: "number",
		student_id: "number",
		student_name: "string",
		advisor_id: "number",
		advisor_name: "string",
		course_id: "number",
	};

	useEffect(() => {
		axios
			.get(`http://localhost:8000/admin/pending-requests`)
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
