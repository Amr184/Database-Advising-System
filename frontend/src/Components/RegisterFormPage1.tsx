// RegisterFormPage1.tsx
import React from "react";
import { formTextClass, formInputClass } from "../assets/Styles";
import { TRegisterForm } from "../types";

export default function RegisterFormPage1({
	signupData,
	setSignupData,
}: {
	signupData: any;
	setSignupData: any;
}) {
	return (
		<>
			<div className={formTextClass}>
				<label>Name</label>
				<input
					type="text"
					required
					placeholder="First name and Last name"
					className={formInputClass}
					value={signupData.name}
					onChange={(e) =>
						setSignupData({
							...signupData,
							name: e.target.value,
						})
					}
				/>
			</div>
			<div className={formTextClass}>
				<label>Email</label>
				<input
					type="email"
					required
					placeholder={
						signupData.type === "student"
							? "firstname.lastname@student.guc.edu.eg"
							: "firstname.lastname@guc.edu.eg"
					}
					className={formInputClass}
					value={signupData.email}
					onChange={(e) =>
						setSignupData({
							...signupData,
							email: e.target.value,
						})
					}
				/>
			</div>
			<div className={formTextClass}>
				<label>Password</label>
				<input
					type="password"
					required
					placeholder="Password"
					className={formInputClass}
					value={signupData.password}
					onChange={(e) =>
						setSignupData({
							...signupData,
							password: e.target.value,
						})
					}
				/>
			</div>
			<div className={formTextClass}>
				<label>Confirm Password</label>
				<input
					type="password"
					required
					placeholder="Confirm Password"
					className={formInputClass}
					value={signupData.confirmPassword}
					onChange={(e) =>
						setSignupData({
							...signupData,
							confirmPassword: e.target.value,
						})
					}
				/>
			</div>
		</>
	);
}
