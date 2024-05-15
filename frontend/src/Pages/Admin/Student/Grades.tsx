import { createColumnHelper } from "@tanstack/react-table";
import axios from "axios";
import { useState, useMemo, useEffect } from "react";
import Table from "../../../Components/Table";
import { TAdminStudentCoursesTranscript } from "../../../types";
import toast from "react-hot-toast";
import CustomToaster from "../../../Components/CustomToaster";

export default function AdminGrades() {
	const columnHelper = createColumnHelper<TAdminStudentCoursesTranscript>();
	const [data, setData] = useState<TAdminStudentCoursesTranscript[]>([]);

	const columns = useMemo(
		() => [
			columnHelper.accessor("student_id", {
				id: "student_id",
				header: "Student ID",
				cell: (info) => <div>{info.getValue()}</div>,
				footer: (info) => info.column.id,
			}),
			columnHelper.accessor("student_name", {
				id: "student_name",
				header: "Student Name",
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
			columnHelper.accessor("exam_type", {
				id: "exam_type",
				header: "Exam Type",
				cell: (info) => <div>{info.getValue()}</div>,
			}),
			columnHelper.accessor("course_grade", {
				id: "course_grade",
				header: "Grade",
				cell: (info) => <div>{info.getValue()}</div>,
			}),
			columnHelper.accessor("semester_code", {
				id: "semester_code",
				header: "Semester Code",
				cell: (info) => <div>{info.getValue()}</div>,
			}),
			columnHelper.accessor("instructor_name", {
				id: "instructor_name",
				header: "Instructor Name",
				cell: (info) => <div>{info.getValue()}</div>,
			}),
		],
		[columnHelper],
	);

	const columnTypes = {
		student_id: "number",
		student_name: "string",
		course_id: "number",
		course_name: "string",
		exam_type: "string",
		course_grade: "string",
		semester_code: "string",
		instructor_name: "string",
	};

	useEffect(() => {
		axios
			.get(`http://localhost:8000/admin/view-transcript-details`)
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
