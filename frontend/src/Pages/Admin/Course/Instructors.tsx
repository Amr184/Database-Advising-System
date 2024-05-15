import { useEffect, useMemo, useState } from "react";
import Table from "../../../Components/Table";
import { createColumnHelper } from "@tanstack/react-table";
import axios from "axios";
import { TAdminInstructor } from "../../../types";
import toast from "react-hot-toast";
import CustomToaster from "../../../Components/CustomToaster";

export default function AdminInstructors() {
	const columnHelper = createColumnHelper<TAdminInstructor>();
	const [data, setData] = useState<TAdminInstructor[]>([]);

	const columns = useMemo(
		() => [
			columnHelper.accessor("instructor_id", {
				id: "instructor_id",
				header: "Instructor ID",
				cell: (info) => <div>{info.getValue()}</div>,
				footer: (info) => info.column.id,
			}),
			columnHelper.accessor("instructor_name", {
				id: "instructor_name",
				header: "Instructor Name",
				cell: (info) => <div>{info.getValue()}</div>,
			}),
			columnHelper.accessor("email", {
				id: "email",
				header: "Email",
				cell: (info) => <div>{info.getValue()}</div>,
			}),
			columnHelper.accessor("faculty", {
				id: "faculty",
				header: "Faculty",
				cell: (info) => <div>{info.getValue()}</div>,
			}),
			columnHelper.accessor("office", {
				id: "office",
				header: "Office",
				cell: (info) => <div>{info.getValue()}</div>,
			}),
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
		],
		[columnHelper],
	);

	const columnTypes = {
		instructor_id: "number",
		instructor_name: "string",
		email: "string",
		faculty: "string",
		office: "string",
		course_id: "number",
		course_name: "string",
	};

	useEffect(() => {
		axios
			.get(`http://localhost:8000/admin/view-instructors`)
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
