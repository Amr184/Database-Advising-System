import { useMemo } from "react";
import { createColumnHelper } from "@tanstack/react-table";
import Table from "../../Components/Table";
import { TCourse } from "../../types";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { loginButtonClass } from "../../assets/Styles";
import toast from "react-hot-toast";
import CustomToaster from "../../Components/CustomToaster";

type TCourseType = "optional" | "available" | "required" | "missing";

export default function Courses() {
	const columnHelper = createColumnHelper<TCourse & "actions">();
	const [data, setData] = useState<TCourse[]>([]);
	const [TableType, setTableType] = useState<TCourseType>("optional");

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
		],
		[columnHelper],
	);

	const id = localStorage.getItem("user") ?? 1;

	const columnTypes = {
		course_id: "number",
		name: "string",
		major: "string",
		is_offered: "boolean",
		credit_hours: "number",
		semester: "string",
	};

	const endpointMap = {
		optional: "/optional-courses",
		available: "/available-courses",
		required: "/required-courses",
		missing: "/missing-courses",
	};

	const labelMap = {
		optional: "Optional",
		available: "Available",
		required: "Required",
		missing: "Missing",
	};

	useEffect(() => {
		switch (TableType) {
			case "available":
				axios
					.post(
						`http://localhost:8000/student${endpointMap[TableType]}`,
						{
							semester_code: "W23",
						},
					)
					.then((res) => setData(res.data))
					.catch((err) =>
						toast.custom((t) => (
							<CustomToaster
								t={t}
								title={
									"An Error has occured, Data might be invalid."
								}
								description={err.message}
								danger
							/>
						)),
					);
				break;
			case "missing":
				axios
					.post(
						`http://localhost:8000/student${endpointMap[TableType]}`,
						{
							id: id,
						},
					)
					.then((res) => setData(res.data))
					.catch((err) =>
						toast.custom((t) => (
							<CustomToaster
								t={t}
								title={
									"An Error has occured, Data might be invalid."
								}
								description={err.message}
								danger
							/>
						)),
					);
				break;
			case "required":
				axios
					.post(
						`http://localhost:8000/student${endpointMap[TableType]}`,
						{
							id: id,
							semester_code: "W23",
						},
					)
					.then((res) => setData(res.data))
					.catch((err) =>
						toast.custom((t) => (
							<CustomToaster
								t={t}
								title={
									"An Error has occured, Data might be invalid."
								}
								description={err.message}
								danger
							/>
						)),
					);
				break;
			case "optional":
				axios
					.post(
						`http://localhost:8000/student${endpointMap[TableType]}`,
						{
							id: id,
							semester_code: "W23",
						},
					)
					.then((res) => setData(res.data))
					.catch((err) =>
						toast.custom((t) => (
							<CustomToaster
								t={t}
								title={
									"An Error has occured, Data might be invalid."
								}
								description={err.message}
								danger
							/>
						)),
					);
				break;
		}
	}, [TableType, id]);

	return (
		<div className="flex h-[100%] w-[100%] flex-col items-center bg-gray-900 text-white">
			<div className="flex w-[100%] flex-row items-center justify-center gap-5 p-3">
				{Object.keys(endpointMap).map((key) => (
					<div
						className={`${loginButtonClass} ${
							TableType === key
								? "scale-125 transition-transform duration-500 ease-in-out"
								: " scale-100 transition-transform duration-500 ease-in-out"
						}`}
						onClick={() => {
							setTableType(key as TCourseType);
						}}
					>
						<label className="cursor-pointer">
							{labelMap[key as TCourseType]}
						</label>
					</div>
				))}
			</div>
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
