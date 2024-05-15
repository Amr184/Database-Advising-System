import { useEffect, useState } from "react";
import { TRegisterForm } from "../types";
import { ArrowLeftCircle, ArrowRightCircle } from "lucide-react";
import { buttonClass } from "../assets/Styles";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import RegisterFormPage1 from "./RegisterFormPage1";
import RegisterFormPage2 from "./RegisterFormPage2";
import toast from "react-hot-toast";
import CustomToaster from "./CustomToaster";

export default function RegisterForm({
	userType,
}: {
	userType: "student" | "advisor" | "admin";
}) {
	const [signupData, setSignupData] = useState<TRegisterForm>({
		email: "",
		password: "",
		confirmPassword: "",
		name: "",
		type: "student",
	});
	const [stage, setStage] = useState<1 | 2>(1);
	const navigate = useNavigate();

	useEffect(() => {
		setSignupData({ ...signupData, type: userType });
	}, [userType]);

	const handleButtonClick = () => {
		if (
			signupData.password !== signupData.confirmPassword ||
			signupData.password === "" ||
			signupData.password === " " ||
			signupData.password === undefined
		) {
			toast.custom((t) => (
				<CustomToaster
					t={t}
					title={"Passwords don't match"}
					description={"Please make sure that the passwords match"}
					danger
				/>
			));
			return;
		}
		if (
			(!signupData.email.endsWith("@student.guc.edu.eg") &&
				!signupData.email.endsWith("@guc.edu.eg")) ||
			signupData.email === "" ||
			signupData.email === " " ||
			signupData.email === undefined
		) {
			toast.custom((t) => (
				<CustomToaster
					t={t}
					title={"Invalid Email"}
					description={"Please make sure that the email is valid"}
					danger
				/>
			));
			return;
		}
		if (
			signupData.name.split(" ").length < 2 ||
			signupData.name === "" ||
			signupData.name === " " ||
			signupData.name === undefined
		) {
			toast.custom((t) => (
				<CustomToaster
					t={t}
					title={"Invalid Name"}
					description={"Please make sure that the name is valid"}
					danger
				/>
			));
			return;
		}
		if (signupData.type === "student") {
			if (
				signupData.faculty === "" ||
				signupData.faculty === " " ||
				signupData.faculty === undefined
			) {
				toast.custom((t) => (
					<CustomToaster
						t={t}
						title={"Invalid Faculty"}
						description={
							"Please make sure that the faculty is valid"
						}
						danger
					/>
				));
				return;
			}
			if (
				signupData.major === "" ||
				signupData.major === " " ||
				signupData.major === undefined
			) {
				toast.custom((t) => (
					<CustomToaster
						t={t}
						title={"Invalid Major"}
						description={"Please make sure that the major is valid"}
						danger
					/>
				));
				return;
			}
			if (
				signupData.semester === 0 ||
				signupData.semester === undefined
			) {
				toast.custom((t) => (
					<CustomToaster
						t={t}
						title={"Invalid Semester"}
						description={
							"Please make sure that the semester is valid"
						}
						danger
					/>
				));
				return;
			}
		}
		if (signupData.type === "advisor") {
			if (
				signupData.office === "" ||
				signupData.office === " " ||
				signupData.office === undefined
			) {
				toast.custom((t) => (
					<CustomToaster
						t={t}
						title={"Invalid Office"}
						description={
							"Please make sure that the office is valid"
						}
						danger
					/>
				));
				return;
			}
		}

		switch (signupData.type) {
			case "student":
				axios
					.post(`http://localhost:8000/${signupData.type}/register`, {
						first_name: signupData.name.split(" ")[0],
						last_name:
							signupData.name.split(" ")[
								signupData.name.split(" ").length - 1
							],
						password: signupData.password,
						faculty: signupData.faculty,
						email: signupData.email,
						major: signupData.major,
						semester: signupData.semester,
					})
					.then((res) => {
						localStorage.setItem("user", res.data[0].student_id);
						localStorage.setItem("type", signupData.type);
						toast.custom((t) => (
							<CustomToaster
								t={t}
								title={"Regiestered successfully!"}
								description={`Registered successfully. ${res.data[0].student_id}`}
							/>
						));
						if (res.data) {
							navigate("/student");
							window.location.reload();
						}
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
				break;
			case "advisor":
				axios
					.post(`http://localhost:8000/${signupData.type}/register`, {
						name: signupData.name,
						password: signupData.password,
						email: signupData.email,
						office: signupData.office,
					})
					.then((res) => {
						localStorage.setItem("user", res.data[0].advisor_id);
						localStorage.setItem("type", signupData.type);
						toast.custom((t) => (
							<CustomToaster
								t={t}
								title={"Registered successfully!"}
								description={`Registered successfully. ${res.data[0].advisor_id}`}
							/>
						));
						if (res.data) {
							navigate("/advisor");
							window.location.reload();
						}
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
				break;
		}
	};

	return (
		<>
			<form className="flex flex-col gap-3 ">
				{stage === 1 ? (
					<RegisterFormPage1
						signupData={signupData}
						setSignupData={setSignupData}
					/>
				) : (
					<RegisterFormPage2
						signupData={signupData}
						setSignupData={setSignupData}
					/>
				)}
			</form>

			<div className="flex justify-between gap-3">
				<button
					className={buttonClass}
					onClick={() => setStage(stage === 1 ? 2 : 1)}
				>
					{stage === 2 ? (
						<ArrowLeftCircle size={24} />
					) : (
						<ArrowRightCircle size={24} />
					)}
				</button>
				{stage === 2 && (
					<button className={buttonClass} onClick={handleButtonClick}>
						Signup
					</button>
				)}
			</div>
		</>
	);
}
