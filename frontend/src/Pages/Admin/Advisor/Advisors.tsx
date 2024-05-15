import { createColumnHelper } from "@tanstack/react-table";
import axios from "axios";
import { useState, useMemo, useEffect } from "react";
import Table from "../../../Components/Table";
import { TAdminAdvisor } from "../../../types";
import toast from "react-hot-toast";
import CustomToaster from "../../../Components/CustomToaster";

export default function AdminAdvisors() {
	const columnHelper = createColumnHelper<TAdminAdvisor>();
	const [data, setData] = useState<TAdminAdvisor[]>([]);

	const columns = useMemo(
		() => [
			columnHelper.accessor("advisor_id", {
				header: "Advisor ID",
				cell: (info) => <div>{info.getValue()}</div>,
			}),
			columnHelper.accessor("name", {
				header: "Name",
				cell: (info) => <div>{info.getValue()}</div>,
			}),
			columnHelper.accessor("office", {
				header: "Office",
				cell: (info) => <div>{info.getValue()}</div>,
			}),
			columnHelper.accessor("email", {
				header: "Email",
				cell: (info) => <div>{info.getValue()}</div>,
			}),
			columnHelper.accessor("password", {
				header: "Password",
				cell: (info) => <div>{info.getValue()}</div>,
			}),
		],
		[columnHelper],
	);

	const columnTypes = {
		advisor_id: "number",
		name: "string",
		office: "string",
		email: "string",
		password: "string",
	};

	useEffect(() => {
		axios
			.get(`http://localhost:8000/admin/advisors`)
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
