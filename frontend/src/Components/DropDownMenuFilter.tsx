import { ColumnDef } from "@tanstack/react-table";
import { PlusCircle } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";
import ReactSelect from "react-select";

export default function DropDownMenuFilter({
	column,
	columnTypes,
	filters,
	setFilters,
}: {
	column: ColumnDef<any, any>;
	columnTypes: {
		[key: string]: "string" | "number" | "boolean";
	};
	filters: {
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
	}[];
	setFilters: Dispatch<
		SetStateAction<
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
		>
	>;
}) {
	const [filter, setFilter] = useState<{
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
	}>({
		value: "",
		type: "string",
		operand: "equals",
	});

	const options = {
		string: [
			{ label: "equals", value: "equals" },
			{ label: "contains", value: "contains" },
			{ label: "starts with", value: "starts with" },
			{ label: "ends with", value: "ends with" },
		],
		number: [
			{ label: "equals", value: "equals" },
			{ label: "less than", value: "less than" },
			{ label: "greater than", value: "greater than" },
		],
		boolean: [
			{ label: "equals", value: "equals" },
			{ label: "not equals", value: "not equals" },
		],
	};

	return (
		<>
			<ReactSelect
				className="w-44"
				options={
					columnTypes[column.id as string] === "string"
						? options.string
						: columnTypes[column.id as string] === "number"
							? options.number
							: options.boolean
				}
				onChange={(option) => {
					if (option?.value)
						setFilter({
							...filter,
							operand: option.value as
								| "equals"
								| "contains"
								| "starts with"
								| "ends with"
								| "less than"
								| "greater than"
								| "not equals",
						});
				}}
			/>
			{columnTypes[column.id as string] !== "boolean" && (
				<input
					type="text"
					className="w-1/2 outline outline-black outline-1 rounded-xl"
					onChange={(e) => {
						setFilter({
							...filter,
							value: e.target.value,
							type: columnTypes[column.id as string],
						});
					}}
				/>
			)}
			{columnTypes[column.id as string] === "boolean" && (
				<ReactSelect
					className="w-1/2"
					options={[
						{ label: "true", value: true },
						{ label: "false", value: false },
					]}
					onChange={(option) => {
						if (option)
							setFilter({
								...filter,
								value: option.value.valueOf().toString(),
								type: columnTypes[column.id as string],
							});
					}}
				/>
			)}
			<button
				className="flex items-center justify-center bg-blue-500 rounded-full w-10 h-10 text-white font-bold cursor-pointer"
				onClick={() => {
					setFilters([...filters, { [column.id as string]: filter }]);
				}}
			>
				<PlusCircle size={24} />
			</button>
		</>
	);
}
