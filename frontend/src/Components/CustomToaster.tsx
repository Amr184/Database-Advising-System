import { AlertTriangle, CheckCircle } from "lucide-react";

export default function CustomToaster({
	t,
	danger,
	title,
	description,
}: {
	t: {
		id: string;
		visible: boolean;
	};
	danger?: boolean;
	title: string;
	description: string;
}) {
	return (
		<div
			className={`${
				t.visible ? "animate-enter" : "animate-leave"
			} pointer-events-auto flex w-full max-w-md items-center gap-4 rounded-lg p-3 shadow-lg ring-1 ring-black ring-opacity-5 ${
				danger ? "bg-red-300" : "bg-green-300"
			}`}
		>
			<div className="flex flex-col items-center justify-center">
				{danger ? (
					<AlertTriangle size={36} />
				) : (
					<CheckCircle size={36} />
				)}
			</div>
			<div className="flex flex-col gap-1">
				<div
					className={`text-lg font-medium ${
						danger ? "text-red-900" : "text-green-900"
					}`}
				>
					{title}
				</div>
				<div className="text-sm ">{description}</div>
			</div>
		</div>
	);
}
