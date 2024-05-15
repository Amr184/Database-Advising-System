import { useEffect, useMemo, useState } from "react";
import { createColumnHelper } from "@tanstack/react-table";
import Table from "../../Components/Table";
import { TAdvisorStudent } from "../../types";
import axios from "axios";
import toast from "react-hot-toast";
import CustomToaster from "../../Components/CustomToaster";

export default function AdvisorStudents() {
	const columnHelper = createColumnHelper<TAdvisorStudent>();
	const [data, setData] = useState<TAdvisorStudent[]>([]);
	const columnTypes = {
		student_id: "number",
		student_name: "string",
		student_major: " string",
		course_name: "string",
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
			columnHelper.accessor("student_major", {
				header: "Student Major",
				cell: (info) => <div>{info.getValue()}</div>,
			}),
		],
		[columnHelper],
	);

	const id = localStorage.getItem("user") ?? 2;

	useEffect(() => {
		axios
			.post(`http://localhost:8000/advisor/students`, {
				advisor_id: id,
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
	}, []);

	return (
		<div className="flex flex-col h-full items-center bg-gray-900 text-white">
			<Table
				columns={columns}
				columnTypes={columnTypes as any}
				data={data}
			/>
		</div>
	);
}
