import { createColumnHelper } from "@tanstack/react-table";
import axios from "axios";
import Table from "../../../Components/Table";
import { useEffect, useMemo, useState } from "react";
import { TAdminSemester } from "../../../types";
import toast from "react-hot-toast";
import CustomToaster from "../../../Components/CustomToaster";

export default function AdminSemesters() {
	const columnHelper = createColumnHelper<TAdminSemester>();
	const [data, setData] = useState<TAdminSemester[]>([]);

	const columns = useMemo(
		() => [
			columnHelper.accessor("course_id", {
				header: "Course ID",
				cell: (info) => <div>{info.getValue()}</div>,
				footer: (info) => info.column.id,
			}),
			columnHelper.accessor("course_name", {
				header: "Course Name",
				cell: (info) => <div>{info.getValue()}</div>,
			}),
			columnHelper.accessor("semester_code", {
				header: "Semester Code",
				cell: (info) => <div>{info.getValue()}</div>,
			}),
		],
		[columnHelper],
	);

	const columnTypes = {
		course_id: "number",
		course_name: "string",
		semester_code: "string",
	};

	useEffect(() => {
		axios
			.get(`http://localhost:8000/admin/view-semesters`)
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
