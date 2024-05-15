import { createColumnHelper } from "@tanstack/react-table";
import axios from "axios";
import Table from "../../../Components/Table";
import { useEffect, useMemo, useState } from "react";
import { TAdminPayment } from "../../../types";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { MoreVertical } from "lucide-react";
import toast from "react-hot-toast";
import CustomToaster from "../../../Components/CustomToaster";

export default function AdminPayments() {
	const columnHelper = createColumnHelper<TAdminPayment & "actions">();
	const [data, setData] = useState<TAdminPayment[]>([]);

	const onIssueInstallments = (payment_id: number) => {
		axios
			.post(`http://localhost:8000/admin/issue-installment`, {
				payment_id,
			})
			.then(() => {
				toast.custom((t) => (
					<CustomToaster
						t={t}
						title={"Payment installments issued successfully!"}
						description={`Installments for payment number ${payment_id}.`}
					/>
				));
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
			columnHelper.accessor("amount", {
				header: "Amount",
				cell: (info) => <div>{info.getValue()}</div>,
			}),
			columnHelper.accessor("deadline", {
				header: "Deadline",
				cell: (info) => <div>{info?.getValue().split("T")[0]}</div>,
			}),
			columnHelper.accessor("n_installments", {
				header: "Number of Installments",
				cell: (info) => <div>{info.getValue()}</div>,
			}),
			columnHelper.accessor("status", {
				header: "Status",
				cell: (info) => <div>{info.getValue()}</div>,
			}),
			columnHelper.accessor("fund_percentage", {
				header: "Fund Percentage",
				cell: (info) => <div>{info.getValue()}</div>,
			}),
			columnHelper.accessor("start_date", {
				header: "Start Date",
				cell: (info) => <div>{info?.getValue().split("T")[0]}</div>,
			}),
			columnHelper.accessor("semester_code", {
				header: "Semester Code",
				cell: (info) => <div>{info.getValue()}</div>,
			}),
			columnHelper.accessor("payment_id", {
				header: "Payment ID",
				cell: (info) => <div>{info.getValue()}</div>,
			}),
			columnHelper.accessor("anchor", {
				header: "",
				cell: ({
					row: {
						original: { payment_id },
					},
				}) => (
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
										onIssueInstallments(payment_id)
									}
								>
									Issue Installments
								</DropdownMenu.Item>
							</DropdownMenu.Content>
						</DropdownMenu.Portal>
					</DropdownMenu.Root>
				),
			}),
		],
		[columnHelper],
	);

	const columnTypes = {
		payment_id: "number",
		amount: "number",
		deadline: "string",
		student_name: "string",
		n_installments: "number",
		status: "string",
		fund_percentage: "number",
		start_date: "string",
		semester_code: "string",
		student_id: "number",
	};

	useEffect(() => {
		axios
			.get(`http://localhost:8000/admin/view-payments`)
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
