module.exports = [
	{
		path: "/register",
		method: "POST",
		query: ({ name, password, email, office }) =>
			`EXEC Procedures_AdvisorRegistration '${name}', '${password}', '${email}', '${office}'`,
	},
	{
		path: "/login",
		method: "Post",
		query: ({ id, password }) =>
			`Select dbo.FN_AdvisorLogin(${id},'${password}') as success`,
	},
	{
		path: "/all-students",
		method: "POST",
		query: ({ id }) =>
			`EXEC Procedures_AdvisorViewAllAssignedStudents ${id} `,
	},
	{
		path: "/add-graduation-plan",
		method: "POST",
		query: ({
			semester_code,
			expected_grad_date,
			sem_credit_hours,
			advisor_id,
			student_id,
		}) =>
			`EXEC Procedures_AdvisorCreateGP '${semester_code}', '${expected_grad_date}', ${sem_credit_hours}, ${advisor_id}, ${student_id}`,
	},
	{
		path: "/add-graduation-plan-course",
		method: "POST",
		query: ({ student_id, semester_code, course_name }) =>
			`EXEC Procedures_AdvisorAddCourseGP ${student_id}, '${semester_code}', '${course_name}'`,
	},
	{
		path: "/update-graduation-plan-date",
		method: "POST",
		query: ({ expected_grad_date, student_id }) =>
			`EXEC Procedures_AdvisorUpdateGP '${expected_grad_date}', ${student_id}`,
	},
	{
		path: "/delete-graduation-plan-course",
		method: "POST",
		query: ({ student_id, semester_code, course_id }) =>
			`EXEC Procedures_AdvisorDeleteFromGP ${student_id}, '${semester_code}', ${course_id}`,
	},
	{
		path: "/students-courses",
		method: "POST",
		query: ({ advisor_id, major }) =>
			`EXEC Procedures_AdvisorViewAssignedStudents ${advisor_id}, '${major}'`,
	},
	{
		path: "/students",
		method: "POST",
		query: ({ advisor_id }) =>
			`EXEC Procedures_AdvisorViewAllAssignedStudents ${advisor_id}`,
	},
	{
		path: "/view-all-requests",
		method: "POST",
		query: ({ advisor_id }) =>
			`Select * from FN_Advisors_Requests(${advisor_id})`,
	},
	{
		path: "/view-pending-requests",
		method: "POST",
		query: ({ advisor_id }) =>
			`EXEC Procedures_AdvisorViewPendingRequests ${advisor_id}`,
	},
	{
		path: "/approve-reject-credit-hours-request",
		method: "POST",
		query: ({ request_id, semester_code }) =>
			`EXEC Procedures_AdvisorApproveRejectCHRequest ${request_id}, '${semester_code}'`,
	},
	{
		path: "/approve-reject-course-request",
		method: "POST",
		query: ({ request_id, semester_code }) =>
			`EXEC Procedures_AdvisorApproveRejectCourseRequest ${request_id}, '${semester_code}'`,
	},
];
