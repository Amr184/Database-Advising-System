import { useEffect, useMemo, useState } from "react";
import { createColumnHelper } from "@tanstack/react-table";
import Table from "../../Components/Table";
import { TSlot } from "../../types";
import axios from "axios";
import toast from "react-hot-toast";
import CustomToaster from "../../Components/CustomToaster";

export default function Slots() {
	const columnHelper = createColumnHelper<TSlot>();
	const [data, setData] = useState<TSlot[]>([]);
	const [course_id, setCourseID] = useState<number>();
	const [instructor_id, setInstructorID] = useState<number>();

	const columns = useMemo(
		() => [
			columnHelper.accessor("slot_id", {
				header: "Slot ID",
				cell: (info) => <div>{info.getValue()}</div>,
				footer: (info) => info.column.id,
			}),
			columnHelper.accessor("slot_day", {
				header: "Day",
				cell: (info) => <div>{info.getValue()}</div>,
			}),
			columnHelper.accessor("slot_time", {
				header: "Time",
				cell: (info) => <div>{info.getValue()}</div>,
			}),
			columnHelper.accessor("slot_location", {
				header: "Location",
				cell: (info) => <div>{info.getValue()}</div>,
			}),
			columnHelper.accessor("course_id", {
				header: "Course ID",
				cell: (info) => <div>{info.getValue()}</div>,
			}),
			columnHelper.accessor("course_name", {
				header: "Course Name",
				cell: (info) => <div>{info.getValue()}</div>,
			}),
			columnHelper.accessor("instructor_name", {
				header: "Instructor Name",
				cell: (info) => <div>{info.getValue()}</div>,
			}),
		],
		[columnHelper, course_id, instructor_id],
	);

	const columnTypes = {
		slot_id: "number",
		course_id: "number",
		course_name: "string",
		slot_day: "string",
		slot_time: "string",
		slot_location: "string",
		instructor_name: "string",
	};

	useEffect(() => {
		if (course_id && instructor_id) {
			axios
				.post(`http://localhost:8000/student/courses-instructor`, {
					course_id: course_id,
					instructor_id: instructor_id,
				})
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
		} else {
			axios
				.get(`http://localhost:8000/student/courses-slots-instructors`)
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
		}
	}, [course_id, instructor_id]);

	return (
		<div className="flex h-[100%] w-[100%] flex-col items-center bg-gray-900">
			<div className="flex flex-row w-1/2 justify-between p-2">
				<div className="flex flex-col">
					<label htmlFor="course_id" className="text-white">
						Course ID
					</label>
					<input
						type="number"
						name="course_id"
						id="course_id"
						className="p-2 rounded-lg"
						value={course_id}
						onChange={(e) => setCourseID(parseInt(e.target.value))}
					/>
				</div>
				<div className="flex flex-col">
					<label htmlFor="instructor_id" className="text-white">
						Instructor ID
					</label>
					<input
						type="number"
						name="instructor_id"
						id="instructor_id"
						className="p-2 rounded-lg"
						value={instructor_id}
						onChange={(e) =>
							setInstructorID(parseInt(e.target.value))
						}
					/>
				</div>
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
