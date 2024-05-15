module.exports = [
	{
		path: "/advisors",
		method: "GET",
		query: ({}) => `EXEC Procedures_AdminListAdvisors`,
	},
	{
		path: "/students",
		method: "GET",
		query: ({}) => `EXEC AdminListStudentsWithAdvisors`,
	},
	{
		path: "/pending-requests",
		method: "GET",
		query: ({}) => `select * from all_Pending_Requests`,
	},
	{
		path: "/add-semester",
		method: "POST",
		query: ({ start_date, end_date, sem_code }) =>
			`EXEC AdminAddingSemester '${start_date}', '${end_date}', '${sem_code}'`,
	},
	{
		path: "/add-course",
		method: "POST",
		query: ({ major, semester, credit_hours, course_name, is_offered }) =>
			`EXEC Procedures_AdminAddingCourse '${major}', ${semester}, ${credit_hours}, '${course_name}', ${is_offered}`,
	},
	{
		path: "/link-instructor",
		method: "POST",
		query: ({ instructor_id, course_id, slot }) =>
			`EXEC Procedures_AdminLinkInstructor ${instructor_id}, ${course_id}, ${slot}`,
	},
	{
		path: "/link-advisor",
		method: "POST",
		query: ({ student_id, advisor_id }) =>
			`EXEC Procedures_AdminLinkStudentToAdvisor ${student_id}, ${advisor_id}`,
	},
	{
		path: "/link-student",
		method: "POST",
		query: ({ instructor_id, student_id, course_id, semester_code }) =>
			`EXEC Procedures_AdminLinkStudent ${instructor_id}, ${student_id}, ${course_id}, '${semester_code}'`,
	},
	{
		path: "/view-instructors",
		method: "GET",
		query: ({}) => `select * from Instructors_AssignedCourses`,
	},
	{
		path: "/view-semesters",
		method: "GET",
		query: ({}) => `select * from Semster_offered_Courses`,
	},
	{
		path: "/delete-course",
		method: "POST",
		query: ({ course_id }) =>
			`EXEC Procedures_AdminDeleteCourse ${course_id}`,
	},
	{
		path: "/delete-slot",
		method: "POST",
		query: ({ current_semester }) =>
			`EXEC Procedures_AdminDeleteSlots '${current_semester}'`,
	},
	{
		path: "/add-makeup-exam",
		method: "POST",
		query: ({ type, date, course_id }) =>
			`EXEC Procedures_AdminAddExam '${type}', '${date}', ${course_id}`,
	},
	{
		path: "/view-payments",
		method: "GET",
		query: ({}) => `select * from Student_Payment`,
	},
	{
		path: "/issue-installment",
		method: "POST",
		query: ({ payment_id }) =>
			`EXEC Procedures_AdminIssueInstallment ${payment_id}`,
	},
	{
		path: "/update-status",
		method: "POST",
		query: ({ student_id }) =>
			`EXEC Procedure_AdminUpdateStudentStatus ${student_id}`,
	},
	{
		path: "/view-active-students",
		method: "GET",
		query: ({}) => `select * from view_Students`,
	},
	{
		path: "/view-graduation-plans",
		method: "GET",
		query: ({}) => `select * from Advisors_Graduation_Plan`,
	},
	{
		path: "/view-transcript-details",
		method: "GET",
		query: ({}) => `select * from Students_Courses_transcript`,
	},
];
