import { useEffect, useMemo, useState } from "react";
import { createColumnHelper } from "@tanstack/react-table";
import Table from "../../Components/Table";
import { TAdvisorStudent } from "../../types";
import axios from "axios";
import ReactSelect from "react-select";
import toast from "react-hot-toast";
import CustomToaster from "../../Components/CustomToaster";

export default function AdvisorStudentsCourses() {
	const columnHelper = createColumnHelper<TAdvisorStudent>();
	const [data, setData] = useState<TAdvisorStudent[]>([]);

	const [selectedMajor, setSelectedMajor] = useState({
		label: "Computer Science",
		value: "CS",
	});

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
			columnHelper.accessor("student_major", {
				header: "Student Major",
				cell: (info) => <div>{info.getValue()}</div>,
			}),
			columnHelper.accessor("course_name", {
				header: "Course Name",
				cell: (info) => <div>{info.getValue()}</div>,
			}),
		],
		[columnHelper],
	);

	const columnTypes = {
		student_id: "number",
		student_name: "string",
		student_major: " string",
		course_name: "string",
	};

	const id = localStorage.getItem("user") ?? 2;

	useEffect(() => {
		axios
			.post(`http://localhost:8000/advisor/students-courses`, {
				advisor_id: id,
				major: selectedMajor.value,
			})
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
	}, [selectedMajor]);

	const majorOptions = [
		{ label: "Computer Science", value: "CS" },
		{ label: "Computer Engineering", value: "Computer Engineering" },
		{ label: "Electrical Engineering", value: "Electrical Engineering" },
		{ label: "Mechanical Engineering", value: "Mechanical Engineering" },
		{ label: "Chemical Engineering", value: "Chemical Engineering" },
		{ label: "Civil Engineering", value: "Civil Engineering" },
		{ label: "Industrial Engineering", value: "Industrial Engineering" },
		{ label: "Aerospace Engineering", value: "Aerospace Engineering" },
		{ label: "Biomedical Engineering", value: "Biomedical Engineering" },
		{ label: "Engineering Physics", value: "Engineering Physics" },
		{ label: "Engineering Undecided", value: "Engineering Undecided" },
	];

	return (
		<div className="flex flex-col h-full items-center bg-gray-900">
			<div className="w-full flex items-center justify-center">
				<ReactSelect
					className="w-1/2"
					options={majorOptions}
					value={selectedMajor}
					onChange={(option) => setSelectedMajor(option as any)}
					placeholder="Select Major"
					isSearchable
				/>
			</div>
			<Table
				columns={columns}
				columnTypes={columnTypes as any}
				data={data}
			/>
		</div>
	);
}
