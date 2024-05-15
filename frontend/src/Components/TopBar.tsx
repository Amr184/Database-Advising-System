import { HomeIcon, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function TopBar() {
	const navigate = useNavigate();

	const [id, setId] = useState<string | null>(null);
	const [type, setType] = useState<string | null>(null);

	const onLogout = () => {
		localStorage.clear();
		setId(null);
		setType(null);
		navigate("/");
	};

	useEffect(() => {
		setId(localStorage.getItem("user"));
		setType(localStorage.getItem("type"));
	}, []);

	return (
		<div
			className="sticky left-0 top-0 z-20 flex h-16 w-full items-center justify-between gap-5 p-3 transition-shadow"
			style={{
				background:
					"linear-gradient(270deg,rgba(17, 39, 103, 1) 0%,rgba(52, 99, 234, 1) 100%)",
			}}
		>
			<div className="flex items-center gap-4">
				{id && (
					<button
						onClick={() => {
							navigate(`/${type}`);
						}}
					>
						<HomeIcon
							size={30}
							className="cursor-pointer text-white"
						/>
					</button>
				)}
				<h1 className="text-3xl font-bold text-white">
					{id && <span>{`${type} ${id}`}</span>} Portal
				</h1>
			</div>
			{id && (
				<button className="" onClick={() => onLogout()}>
					<LogOut className="cursor-pointer text-white" size={30} />
				</button>
			)}
		</div>
	);
}
