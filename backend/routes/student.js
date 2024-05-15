module.exports = [
	{
		path: "/register",
		method: "POST",
		query: ({
			first_name,
			last_name,
			password,
			faculty,
			email,
			major,
			semester,
		}) =>
			`EXEC Procedures_StudentRegistration '${first_name}', '${last_name}', '${password}', '${faculty}', '${email}', '${major}', ${semester}`,
	},
	{
		path: "/login",
		method: "POST",
		query: ({ id, password }) =>
			`select dbo.FN_StudentLogin(${id},'${password}') as success`,
	},
	{
		path: "/add-mobile",
		method: "POST",
		query: ({ id, mobile }) =>
			`EXEC Procedures_StudentaddMobile ${id}, ${mobile}`,
	},
	{
		path: "/optional-courses",
		method: "POST",
		query: ({ id, semester_code }) =>
			`EXEC Procedures_ViewOptionalCourse ${id} , '${semester_code}' `,
	},
	{
		path: "/available-courses",
		method: "POST",
		query: ({ semester_code }) =>
			`Select * from dbo.FN_SemsterAvailableCourses('${semester_code}')`,
	},
	{
		path: "/required-courses",
		method: "POST",
		query: ({ id, semester_code }) =>
			`EXEC Procedures_ViewRequiredCourses ${id}, '${semester_code}'`,
	},
	{
		path: "/missing-courses",
		method: "POST",
		query: ({ id }) => `EXEC Procedures_ViewMS ${id}`,
	},
	{
		path: "/request-course",
		method: "POST",
		query: ({ id, course_id, type, comment }) =>
			`EXEC Procedures_StudentSendingCourseRequest ${id}, ${course_id}, '${type}', '${comment}'`,
	},
	{
		path: "/request-hours",
		method: "POST",
		query: ({ id, hours, type, comment }) =>
			`EXEC Procedures_StudentSendingCHRequest ${id}, ${hours}, '${type}', '${comment}'`,
	},
	{
		path: "/graduation-plan",
		method: "POST",
		query: ({ id }) => `select * from FN_StudentViewGP(${id})`,
	},
	{
		path: "/upcoming-installment",
		method: "POST",
		query: ({ id }) =>
			`select dbo.FN_StudentUpcoming_installment(${id}) as deadline`,
	},
	{
		path: "/courses-makeup-exams",
		method: "GET",
		query: ({}) => `SELECT * FROM Courses_MakeupExams`,
	},
	{
		path: "/register-first-makeup-exam",
		method: "POST",
		query: ({ id, course_id, semester_code }) =>
			`EXEC Procedures_StudentRegisterFirstMakeup ${id}, ${course_id}, '${semester_code}'`,
	},
	{
		path: "/register-second-makeup-exam",
		method: "POST",
		query: ({ id, course_id, semester_code }) =>
			`EXEC Procedures_StudentRegisterSecondMakeup ${id}, ${course_id}, '${semester_code}'`,
	},
	{
		path: "/courses-slots-instructors",
		method: "GET",
		query: ({}) => `SELECT * from Courses_Slots_Instructor`,
	},
	{
		path: "/courses-instructor",
		method: "POST",
		query: ({ course_id, instructor_id }) =>
			`SELECT * from FN_StudentViewSlot(${course_id}, ${instructor_id})`,
	},
	{
		path: "/choose-instuctor",
		method: "POST",
		query: ({ id, instructor_id, course_id, semester_code }) =>
			`EXEC Procedures_ChooseInstructor ${id}, ${instructor_id}, ${course_id}, '${semester_code}'`,
	},
	{
		path: "/view-course-prerequisites",
		method: "GET",
		query: ({}) => `select * from view_Course_prerequisites`,
	},
];
