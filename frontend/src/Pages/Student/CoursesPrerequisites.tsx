import { createColumnHelper } from "@tanstack/react-table";
import axios from "axios";
import Table from "../../Components/Table";
import { useEffect, useMemo, useState } from "react";
import { TCoursePrerequisite } from "../../types";
import toast from "react-hot-toast";
import CustomToaster from "../../Components/CustomToaster";

export default function CoursesPrerequisites() {
	const columnHelper = createColumnHelper<TCoursePrerequisite>();
	const [data, setData] = useState<TCoursePrerequisite[]>([]);

	const columns = useMemo(
		() => [
			columnHelper.accessor("course_id", {
				id: "course_id",
				header: "ID",
				cell: (info) => <div>{info.getValue()}</div>,
				footer: (info) => info.column.id,
			}),
			columnHelper.accessor("name", {
				id: "name",
				header: "Name",
				cell: (info) => <div>{info.getValue()}</div>,
			}),
			columnHelper.accessor("major", {
				id: "major",
				header: "Major",
				cell: (info) => <div>{info.getValue()}</div>,
			}),
			columnHelper.accessor("is_offered", {
				id: "is_offered",
				header: "Offered",
				cell: (info) => (
					<div>{info.getValue() === true ? "Yes" : "No"}</div>
				),
			}),
			columnHelper.accessor("credit_hours", {
				id: "credit_hours",
				header: "Credit Hours",
				cell: (info) => <div>{info.getValue()}</div>,
			}),
			columnHelper.accessor("semester", {
				id: "semester",
				header: "Semester",
				cell: (info) => <div>{info.getValue()}</div>,
			}),
			columnHelper.accessor("prerequisite_course_id", {
				id: "prerequisite_course_id",
				header: "Prerequisite ID",
				cell: (info) => (
					<div>{info.getValue() ?? "No prerequisite"}</div>
				),
			}),
			columnHelper.accessor("prerequisite_course_name", {
				id: "prerequisite_course_name",
				header: "Prerequisite Name",
				cell: (info) => (
					<div>{info.getValue() ?? "No prerequisite"}</div>
				),
			}),
		],
		[columnHelper],
	);

	const columnTypes = {
		course_id: "number",
		name: "string",
		major: "string",
		is_offered: "boolean",
		credit_hours: "number",
		semester: "string",
		prerequisite_course_id: "number",
		prerequisite_course_name: "string",
	};

	useEffect(() => {
		axios
			.get(`http://localhost:8000/student/view-course-prerequisites`)
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
