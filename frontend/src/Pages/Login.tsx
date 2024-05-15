import { useEffect, useState } from "react";
import RegisterForm from "../Components/RegisterForm";
import LoginForm from "../Components/LoginForm";
import { loginButtonClass, loginContainerClass } from "../assets/Styles";
import { useNavigate } from "react-router-dom";

export default function Login() {
	const [userType, setUserType] = useState<"student" | "advisor" | "admin">(
		"admin",
	);
	const [formType, setFormType] = useState<"login" | "signup">("login");

	const navigate = useNavigate();

	useEffect(() => {
		const id = localStorage.getItem("user");
		const type = localStorage.getItem("type");

		if (id && type) {
			navigate(`/${type}`);
		}
	}, [navigate]);

	return (
		<div className="flex h-full w-full flex-col items-center justify-center bg-gray-900 ">
			<div
				className={`${loginContainerClass}, ${
					formType === "login"
						? "h-[60vh] duration-280 ease-in-out"
						: "h-[80vh] duration-280 ease-in-out"
				}`}
			>
				<div className="flex flex-col items-center gap-5">
					<h1 className="text-xl font-bold leading-tight tracking-tight text-white md:text-2xl">
						{formType === "login" ? "Login" : "Signup"}
					</h1>
					<p
						className=" cursor-pointer font-medium text-primary-500 hover:underline"
						onClick={() =>
							setFormType(
								formType === "login" ? "signup" : "login",
							)
						}
					>
						{formType === "login"
							? "Don't have an account?"
							: "Already have an account?"}{" "}
						<span
							className="cursor-pointer text-blue-500"
							onClick={() =>
								setFormType(
									formType === "login" ? "signup" : "login",
								)
							}
						>
							{formType === "login" ? "Signup" : "Login"}
						</span>
					</p>
					<div className="flex items-center gap-12 pb-4">
						<button
							className={`${loginButtonClass}, ${
								userType === "student"
									? "scale-125 transition-transform duration-500 ease-in-out"
									: " scale-100 transition-transform duration-500 ease-in-out"
							}`}
							onClick={() => {
								if (userType === "student") {
									setUserType("admin");
								} else {
									setUserType("student");
								}
							}}
						>
							<label className="cursor-pointer text-white">
								Student
							</label>
						</button>
						<button
							className={`${loginButtonClass}, ${
								userType === "advisor"
									? "scale-125 transition-transform duration-500 ease-in-out"
									: "scale-100 transition-transform duration-500 ease-in-out"
							}`}
							onClick={() => {
								if (userType === "advisor") {
									setUserType("admin");
								} else {
									setUserType("advisor");
								}
							}}
						>
							<label className="cursor-pointer text-white">
								Advisor
							</label>
						</button>
					</div>
				</div>
				{formType === "login" ? (
					<LoginForm userType={userType} />
				) : (
					<RegisterForm userType={userType} />
				)}
			</div>
		</div>
	);
}
