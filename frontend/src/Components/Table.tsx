import {
	ColumnDef,
	flexRender,
	getCoreRowModel,
	useReactTable,
} from "@tanstack/react-table";
import { ArrowRight, ArrowLeft, PlusCircle, MinusCircle } from "lucide-react";
import { useEffect, useState } from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import DropDownMenuFilter from "./DropDownMenuFilter";
import { buttonClass } from "../assets/Styles";

export default function Table({
	columns,
	columnTypes,
	data,
}: {
	columns: ColumnDef<any, any>[];
	columnTypes: {
		[key: string]: "string" | "number" | "boolean";
	};
	data?: any[];
}) {
	const [page, setPage] = useState(0);

	const [pagedData, setPagedData] = useState<any[]>([]);
	const [filters, setFilters] = useState<
		{
			[key: string]: {
				value: string;
				type: "string" | "number" | "boolean";
				operand:
					| "equals"
					| "contains"
					| "starts with"
					| "ends with"
					| "less than"
					| "greater than"
					| "not equals";
			};
		}[]
	>([]);

	const [allData, setAllData] = useState<any[]>([]);

	useEffect(() => {
		setAllData(
			data?.filter((row) => {
				for (const filter of filters) {
					const column = Object.keys(filter)[0];
					const operand = filter[column].operand;
					const value = filter[column].value;
					const type = filter[column].type;
					const rowValue = row[column];

					if (type === "string") {
						if (operand === "equals") {
							if (rowValue !== value) {
								return false;
							}
						} else if (operand === "contains") {
							if (!rowValue.includes(value)) {
								return false;
							}
						} else if (operand === "starts with") {
							if (!rowValue.startsWith(value)) {
								return false;
							}
						} else if (operand === "ends with") {
							if (!rowValue.endsWith(value)) {
								return false;
							}
						} else if (operand === "not equals") {
							if (rowValue === value) {
								return false;
							}
						}
					} else if (type === "number") {
						if (operand === "equals") {
							if (rowValue !== Number(value)) {
								return false;
							}
						} else if (operand === "less than") {
							if (rowValue >= Number(value)) {
								return false;
							}
						} else if (operand === "greater than") {
							if (rowValue <= Number(value)) {
								return false;
							}
						} else if (operand === "not equals") {
							if (rowValue === Number(value)) {
								return false;
							}
						}
					} else if (type === "boolean") {
						if (operand === "equals") {
							if (rowValue !== (value === "true")) {
								return false;
							}
						} else if (operand === "not equals") {
							if (rowValue === (value === "true")) {
								return false;
							}
						}
					}
				}
				return true;
			}) || [],
		);
	}, [data, filters]);

	useEffect(() => {
		setPagedData(
			allData?.slice(
				page * 10,
				(page + 1) * 10 > allData?.length
					? allData?.length
					: (page + 1) * 10,
			) || [],
		);
	}, [allData, page]);

	const table = useReactTable({
		columns,
		data: pagedData || [],
		getCoreRowModel: getCoreRowModel(),
	});

	return (
		<div className="mt-1 flex w-full flex-col gap-2 text-white">
			<div className="flex w-full">
				{filters.map((filter, i) => (
					<div
						key={i}
						className="mr-2 flex items-center rounded-md bg-blue-400 px-2 py-1"
					>
						{Object.keys(filter)[0]}{" "}
						{filter[Object.keys(filter)[0]].operand}{" "}
						{filter[Object.keys(filter)[0]].value}
						<button
							type="button"
							className="ml-2"
							onClick={() => {
								setFilters(filters.filter((_, j) => i !== j));
							}}
						>
							<MinusCircle size={20} />
						</button>
					</div>
				))}
				<DropdownMenu.Root modal={false}>
					<DropdownMenu.Trigger className="flex w-fit items-center gap-2 rounded-2xl bg-blue-400 p-2 text-sm sm:text-base">
						<PlusCircle size={20} />
						Add Filter
					</DropdownMenu.Trigger>
					<DropdownMenu.Portal>
						<DropdownMenu.Content
							sideOffset={5}
							className="z-10 min-w-[100px] rounded-xl border bg-white p-2 text-center shadow-md"
						>
							{columns.map((column, i) => (
								<DropdownMenu.DropdownMenuSub key={i}>
									<DropdownMenu.SubTrigger
										className="cursor-pointer rounded-md px-2 py-1 outline-none hover:bg-gray-100"
										key={i}
									>
										{column.header?.toString()}
									</DropdownMenu.SubTrigger>
									<DropdownMenu.Portal>
										<DropdownMenu.SubContent
											sideOffset={5}
											className="z-10 flex gap-2 rounded-xl border bg-white p-2 text-center shadow-md"
										>
											<DropDownMenuFilter
												column={column}
												columnTypes={columnTypes}
												filters={filters}
												setFilters={setFilters}
											/>
										</DropdownMenu.SubContent>
									</DropdownMenu.Portal>
								</DropdownMenu.DropdownMenuSub>
							))}
						</DropdownMenu.Content>
					</DropdownMenu.Portal>
				</DropdownMenu.Root>
			</div>
			<table className="w-full">
				<thead>
					{table.getHeaderGroups().map((headerGroup) => (
						<tr
							key={headerGroup.id}
							className="cursor-default bg-gray-600 text-white"
						>
							{headerGroup.headers.map((header) => (
								<th
									key={header.id}
									colSpan={header.colSpan}
									className="cursor-default px-3 py-2.5 text-start text-sm font-medium first:border-0"
								>
									{flexRender(
										header.column.columnDef.header,
										header.getContext(),
									)}
								</th>
							))}
						</tr>
					))}
				</thead>
				<tbody>
					{table.getRowModel().rows.length ? (
						table.getRowModel().rows.map((row) => {
							return (
								<tr key={row.id} className="border-t">
									{row.getVisibleCells().map((cell) => (
										<td
											onClick={() => {}}
											key={cell.id}
											className="cursor-default px-3 py-2.5"
										>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext(),
											)}
										</td>
									))}
								</tr>
							);
						})
					) : (
						<tr>
							<td
								colSpan={7}
								className="cursor-default border-t px-3 py-2.5 text-center"
							>
								No data
							</td>
						</tr>
					)}
				</tbody>
				{allData && allData.length > 10 && page > 0 && (
					<button
						className={buttonClass}
						type="button"
						onClick={() => setPage(page - 1)}
					>
						<ArrowLeft size={24} />
					</button>
				)}
				{allData && allData.length > 10 * (page + 1) && (
					<button
						className={`${buttonClass} ml-2`}
						type="button"
						onClick={() => setPage(page + 1)}
					>
						<ArrowRight size={24} />
					</button>
				)}
			</table>
		</div>
	);
}
