import { useEffect, useState } from "react";
import { TLoginForm } from "../types";
import { buttonClass, formInputClass, formTextClass } from "../assets/Styles";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import CustomToaster from "./CustomToaster";

export default function LoginForm({
	userType,
}: {
	userType: "student" | "advisor" | "admin";
}) {
	const navigate = useNavigate();

	const [loginData, setLoginData] = useState<TLoginForm>({
		id: 0,
		password: "",
	});

	useEffect(() => {
		setLoginData({ ...loginData });
	}, [userType]);

	const handleButtonClick = () => {
		if (
			loginData.id === 0 &&
			loginData.password === "admin" &&
			userType === "admin"
		) {
			localStorage.setItem("user", loginData.id.toString());
			localStorage.setItem("type", userType);
			window.location.reload();
			navigate(`/admin`);
		}
		axios
			.post(`http://localhost:8000/${userType}/login`, {
				id: loginData.id,
				password: loginData.password,
			})
			.then((res) => {
				if (res.data[0].success) {
					localStorage.setItem("user", loginData.id.toString());
					localStorage.setItem("type", userType);
					window.location.reload();
					navigate(`/${userType}`);
				} else {
					toast.custom((t) => (
						<CustomToaster
							t={t}
							title={
								"An Error has occured, Data might be invalid."
							}
							description={"Invalid ID or Password"}
							danger
						/>
					));
				}
			})
			.catch((err) => {
				toast.custom((t) => (
					<CustomToaster
						t={t}
						title={"An Error has occured, Data might be invalid."}
						description={err.message}
						danger
					/>
				));
			});
	};

	return (
		<>
			<div
				className="flex flex-col gap-3"
				onKeyDown={(e) => {
					if (e.key === "Enter") {
						handleButtonClick();
					}
				}}
			>
				<div className={formTextClass}>
					<label>ID</label>
					<input
						type="number"
						required
						onWheel={(e) => e.currentTarget.blur()}
						placeholder={userType === "student" ? "ID" : "ID"}
						className={formInputClass}
						onChange={(e) =>
							setLoginData({
								...loginData,
								id: parseInt(e.target.value),
							})
						}
						onKeyDown={(e) => {
							if (e.key === "Enter") {
								handleButtonClick();
							}
						}}
					/>
				</div>
				<div className={formTextClass}>
					<label>Password</label>
					<input
						type="password"
						placeholder="Password"
						className={formInputClass}
						onChange={(e) =>
							setLoginData({
								...loginData,
								password: e.target.value,
							})
						}
						onKeyDown={(e) => {
							if (e.key === "Enter") {
								handleButtonClick();
							}
						}}
					/>
				</div>
			</div>
			<button className={buttonClass} onClick={handleButtonClick}>
				Login
			</button>
		</>
	);
}
