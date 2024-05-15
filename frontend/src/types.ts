export type User = {
	id: number;
	name: string;
	email: string;
	role: string;
};

export type TLoginForm = {
	id: number;
	password: string;
};

export type TRegisterForm = {
	name: string;
	email: string;
	password: string;
	confirmPassword: string;
	type: "student" | "advisor" | "admin";
} & (StudentRegisterForm | AdvisorRegisterForm | {});

export type StudentRegisterForm = {
	type: "student";
	faculty: string;
	major: string;
	semester: number;
};

export type AdvisorRegisterForm = {
	type: "advisor";
	office: string;
};

export type TCourse = {
	course_id: number;
	name: string;
	major: string;
	is_offered: boolean;
	credit_hours: string;
	semester: number;
};

export type TCoursePrerequisite = TCourse & {
	prerequisite_course_id: number;
	prerequisite_course_name: string;
};

export type TMakeUpExam = {
	course_id: number;
	course_name: string;
	course_semester: number;
	exam_id: number;
	date: string;
	type: string;
};

export type TSlot = {
	slot_id: number;
	slot_day: string;
	slot_time: string;
	slot_location: string;
	course_name: string;
	course_id?: number;
	instructor_name: string;
};

export type TSlotCoursesInstructors = {
	slot_id: number;
	slot_day: string;
	slot_time: string;
	slot_location: string;
	course_id: number;
	course_name: string;
	instructor_name: string;
};

export type TStudentGradPlan = {
	student_id: number;
	student_name: string;
	graduation_plan_id: number;
	course_id: number;
	course_name: string;
	semester_code: number;
	expected_graduation_date: string;
	semester_credit_hours: number;
	advisor_id: number;
};

export type TAdminGradPlan = {
	plan_id: number;
	semester_code: number;
	semester_credit_hours: number;
	expected_grad_date: string;
	student_id: number;
	advisor_id: number;
	advisor_name: string;
};

export type TRequest = {
	request_id: number;
	type: string;
	comment: string;
	status: string;
	credit_hours?: number;
	student_id: number;
	advisor_id: number;
	course_id?: number;
};

export type TAdminRequest = TRequest & {
	student_name: string;
	advisor_name: string;
};

export type TRequestType = {
	type: string;
};

export type TAdvisorStudent = {
	student_id: number;
	student_name: string;
	student_major: string;
	course_name: string;
};

export type TAdminStudent = {
	student_id: number;
	student_name: string;
	major: string;
	gpa: number;
	faculty: string;
	email: string;
	password: string;
	financial_status: boolean;
	semester: number;
	acquired_hours: number;
	assigned_hours: number;
};

export type TAdminAdvisor = {
	advisor_id: number;
	name: string;
	office: string;
	email: string;
	password: string;
};

export type TAdminAdvisorStudent = TAdminStudent & {
	advisor_id: number;
	advisor_name: string;
};

export type TAdminStudentCoursesTranscript = TAdminStudent & {
	course_id: number;
	course_name: string;
	exam_type: string;
	course_grade: string;
	semester_code: string;
	instructor_name: string;
};

export type TAdminPayment = {
	student_id: number;
	student_name: string;
	payment_id: number;
	amount: number;
	deadline: string;
	n_installments: number;
	status: string;
	fund_percentage: number;
	start_date: string;
	semester_code: string;
};

export type TAdminSemester = {
	course_id: number;
	course_name: string;
	semester_code: string;
};

export type TAdminInstructor = {
	instructor_id: number;
	instructor_name: string;
	email: string;
	faculty: string;
	office: string;
	course_id: number;
	course_name: string;
};
