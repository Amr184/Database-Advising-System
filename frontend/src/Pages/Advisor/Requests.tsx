import { useEffect, useMemo, useState } from "react";
import { createColumnHelper } from "@tanstack/react-table";
import Table from "../../Components/Table";
import { TRequest } from "../../types";
import { buttonClass } from "../../assets/Styles";
import axios from "axios";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { MoreVertical } from "lucide-react";
import toast from "react-hot-toast";
import CustomToaster from "../../Components/CustomToaster";

type TRequestType = "all" | "pending";

export default function AdvisorRequests() {
	const columnHelper = createColumnHelper<TRequest & "actions">();
	const [data, setData] = useState<TRequest[]>([]);
	const [TableType, setTableType] = useState<TRequestType>("all");

	const [refetch, setRefetch] = useState(false);

	const onStatusUpdate = (request_id: number, type: string) => {
		if (type === "credit hours") {
			axios
				.post(
					`http://localhost:8000/advisor/approve-reject-credit-hours-request`,
					{
						request_id,
					},
				)
				.then(() => {
					toast.custom((t) => (
						<CustomToaster
							t={t}
							title={"Request status updated successfully!"}
							description={`Status for credit hours request number ${request_id} updated successfully.`}
						/>
					));
				})
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
				.post(
					`http://localhost:8000/advisor/approve-reject-course-request`,
					{
						request_id,
					},
				)
				.then(() => {
					toast.custom((t) => (
						<CustomToaster
							t={t}
							title={"Request status updated successfully!"}
							description={`Status for course request number ${request_id} updated successfully.`}
						/>
					));
				})
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
		setRefetch(!refetch);
	};

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
			columnHelper.accessor("advisor_id", {
				id: "advisor_id",
				header: "Advisor ID",
				cell: (info) => <div>{info.getValue()}</div>,
				footer: (info) => info.column.id,
			}),
			columnHelper.accessor("course_id", {
				id: "course_id",
				header: "Course ID",
				cell: (info) => <div>{info.getValue()}</div>,
			}),
			columnHelper.accessor("anchor", {
				header: "",
				cell: ({
					row: {
						original: { request_id, type, status },
					},
				}) =>
					status === "pending" ? (
						<DropdownMenu.Root modal={false}>
							<DropdownMenu.Trigger>
								<MoreVertical size={20} />
							</DropdownMenu.Trigger>
							<DropdownMenu.Portal>
								<DropdownMenu.Content
									sideOffset={5}
									className="z-10 rounded-xl text-center shadow-md"
								>
									<DropdownMenu.Item
										className="flex cursor-pointer items-center rounded-xl bg-blue-400 p-3"
										onClick={() =>
											onStatusUpdate(request_id, type)
										}
									>
										Update Status
									</DropdownMenu.Item>
								</DropdownMenu.Content>
							</DropdownMenu.Portal>
						</DropdownMenu.Root>
					) : (
						<></>
					),
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
		advisor_id: "number",
		course_id: "number",
	};

	const typeMap = {
		all: "advisor/view-all-requests",
		pending: "advisor/view-pending-requests",
	};

	const labelMap = {
		all: "All Requests",
		pending: "Pending Requests",
	};

	const id = localStorage.getItem("user") ?? 1;

	useEffect(() => {
		axios
			.post(`http://localhost:8000/${typeMap[TableType]}`, {
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
	}, [TableType, refetch]);

	return (
		<div className="flex h-[100%] w-[100%] flex-col items-center bg-gray-900 text-white">
			<div className="flex w-[100%] flex-row items-center justify-center gap-5 p-3">
				{Object.keys(typeMap).map((key) => (
					<div
						className={`${buttonClass} ${
							TableType === key
								? "scale-125 transition-transform duration-500 ease-in-out"
								: " scale-100 transition-transform duration-500 ease-in-out"
						}`}
						onClick={() => {
							setTableType(key as TRequestType);
						}}
					>
						<label className="cursor-pointer">
							{labelMap[key as TRequestType]}
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
