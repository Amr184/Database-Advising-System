// RegisterFormPage2.tsx
import React from "react";
import { formTextClass, formInputClass } from "../assets/Styles";

export default function RegisterFormPage2({
	signupData,
	setSignupData,
}: {
	signupData: any;
	setSignupData: any;
}) {
	return (
		<>
			{signupData.type === "student" ? (
				<>
					<div className={formTextClass}>
						<label>Major</label>
						<input
							required
							type="text"
							placeholder="Major"
							className={formInputClass}
							value={signupData.major}
							onChange={(e) =>
								setSignupData({
									...signupData,
									type: "student",
									major: e.target.value,
								})
							}
						/>
					</div>
					<div className={formTextClass}>
						<label>Faculty</label>
						<input
							type="text"
							required
							placeholder="Faculty"
							className={formInputClass}
							value={signupData.faculty}
							onChange={(e) =>
								setSignupData({
									...signupData,
									type: "student",
									faculty: e.target.value,
								})
							}
						/>
					</div>
					<div className={formTextClass}>
						<label>Semester</label>
						<input
							type="number"
							required
							placeholder="Academic Year"
							className={formInputClass}
							value={signupData.semester}
							onChange={(e) =>
								setSignupData({
									...signupData,
									type: "student",
									semester:
										parseInt(e.target.value) > 0
											? parseInt(e.target.value)
											: 0,
								})
							}
						/>
					</div>
				</>
			) : (
				<>
					<div className={formTextClass}>
						<label>Office</label>
						<input
							type="text"
							placeholder="Office"
							className={formInputClass}
							value={signupData.office}
							onChange={(e) =>
								setSignupData({
									...signupData,
									type: "advisor",
									office: e.target.value,
								})
							}
						/>
					</div>
				</>
			)}
		</>
	);
}
