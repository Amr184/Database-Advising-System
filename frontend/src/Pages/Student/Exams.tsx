import { useMemo } from "react";
import { createColumnHelper } from "@tanstack/react-table";
import Table from "../../Components/Table";
import { TMakeUpExam } from "../../types";
import axios from "axios";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import CustomToaster from "../../Components/CustomToaster";

export default function Exams() {
	const columnHelper = createColumnHelper<TMakeUpExam>();
	const [data, setData] = useState<TMakeUpExam[]>([]);

	const columns = useMemo(
		() => [
			columnHelper.accessor("course_id", {
				id: "course_id",
				header: "Course ID",
				cell: (info) => <div>{info.getValue()}</div>,
				footer: (info) => info.column.id,
			}),
			columnHelper.accessor("course_name", {
				id: "course_name",
				header: "Course Name",
				cell: (info) => <div>{info.getValue()}</div>,
			}),
			columnHelper.accessor("course_semester", {
				id: "course_semester",
				header: "Course Semester",
				cell: (info) => <div>{info.getValue()}</div>,
			}),
			columnHelper.accessor("date", {
				id: "date",
				header: "Exam Date",
				cell: (info) => <div>{info.getValue()?.split("T")[0]}</div>,
			}),
			columnHelper.accessor("exam_id", {
				id: "exam_id",
				header: "Exam ID",
				cell: (info) => <div>{info.getValue()}</div>,
			}),
			columnHelper.accessor("type", {
				id: "type",
				header: "Exam Type",
				cell: (info) => <div>{info.getValue()}</div>,
			}),
		],
		[columnHelper],
	);

	const columnTypes = {
		course_id: "number",
		course_name: "string",
		course_semester: "string",
		date: "string",
		exam_id: "number",
		type: "string",
	};

	useEffect(() => {
		axios
			.get(`http://localhost:8000/student/courses-makeup-exams`)
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
