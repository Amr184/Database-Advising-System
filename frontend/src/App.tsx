import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Student/Home";
import TopBar from "./Components/TopBar";
import Login from "./Pages/Login";
import Courses from "./Pages/Student/Courses";
import Slots from "./Pages/Student/Slots";
import Install from "./Pages/Student/Installments";
import AdvisorHome from "./Pages/Advisor/Home";
import AdvisorStudents from "./Pages/Advisor/Students";
import AdvisorRequests from "./Pages/Advisor/Requests";
import AdvisorGradPlan from "./Pages/Advisor/GradPlan";
import AdminGradPlan from "./Pages/Admin/Student/GradPlan";
import AdminPayments from "./Pages/Admin/Course/Payments";
import StudentGradPlan from "./Pages/Student/GradPlan";
import AdvisorStudentsCourses from "./Pages/Advisor/StudentsCourses";
import AdminHome from "./Pages/Admin/Home";
import AdminRequests from "./Pages/Admin/Student/Requests";
import CoursesPrerequisites from "./Pages/Student/CoursesPrerequisites";
import Exams from "./Pages/Student/Exams";
import StudentRequests from "./Pages/Student/Requests";
import Instructor from "./Pages/Student/Instructor";
import Makeup from "./Pages/Student/Makeup";
import AdminAllStudents from "./Pages/Admin/Student/AllStudents";
import AdminAdvisorStudents from "./Pages/Admin/Advisor/AdvisorStudents";
import AdminGrades from "./Pages/Admin/Student/Grades";
import AdminAdvisors from "./Pages/Admin/Advisor/Advisors";
import AdminSemesters from "./Pages/Admin/Course/Semesters";
import AdminInstructors from "./Pages/Admin/Course/Instructors";
import AdminLinkStudent from "./Pages/Admin/Advisor/LinkStudent";
import AdminEditCourse from "./Pages/Admin/Course/EditCourse";
import AdminEditSemester from "./Pages/Admin/Course/EditSemester";
import AdminLinkSlot from "./Pages/Admin/Course/LinkSlot";
import { Toaster } from "react-hot-toast";
import StudentAddPhone from "./Pages/Student/Phone";
import AdminAddMakeupExam from "./Pages/Admin/Course/AddMakeupExam";

function App() {
	return (
		<BrowserRouter>
			<TopBar />
			<Toaster position="top-center" reverseOrder={false} />
			<div
				id="dialog"
				className="custom-scrollbar absolute flex h-screen w-full items-center justify-center empty:hidden"
			/>
			<Routes>
				<Route path="/" element={<Login />} />
				{/* Student Pages */}
				<Route path="/student" element={<Home />} />
				<Route path="/student/courses" element={<Courses />} />
				<Route
					path="/student/courses-prerequisites"
					element={<CoursesPrerequisites />}
				/>
				<Route path="/student/slots" element={<Slots />} />
				<Route path="/student/installment" element={<Install />} />
				<Route path="/student/gradplan" element={<StudentGradPlan />} />
				<Route path="/student/exams" element={<Exams />} />
				<Route path="/student/requests" element={<StudentRequests />} />
				<Route path="/student/instructor" element={<Instructor />} />
				<Route path="/student/makeup" element={<Makeup />} />
				<Route path="/student/phone" element={<StudentAddPhone />} />
				{/* Advisor Pages */}
				<Route path="/advisor" element={<AdvisorHome />} />
				<Route path="/advisor/students" element={<AdvisorStudents />} />
				<Route
					path="/advisor/students-courses"
					element={<AdvisorStudentsCourses />}
				/>
				<Route path="/advisor/requests" element={<AdvisorRequests />} />
				<Route path="/advisor/gradplan" element={<AdvisorGradPlan />} />
				{/*Admin Pages*/}
				<Route path="/admin" element={<AdminHome />} />
				<Route path="/admin/gradplans" element={<AdminGradPlan />} />
				<Route path="/admin/payments" element={<AdminPayments />} />
				<Route path="/admin/requests" element={<AdminRequests />} />
				<Route
					path="/admin/all-students"
					element={<AdminAllStudents />}
				/>
				<Route
					path="/admin/advisor-students"
					element={<AdminAdvisorStudents />}
				/>
				<Route path="/admin/grades" element={<AdminGrades />} />
				<Route path="/admin/advisors" element={<AdminAdvisors />} />
				<Route path="/admin/semesters" element={<AdminSemesters />} />
				<Route
					path="/admin/instructors"
					element={<AdminInstructors />}
				/>
				<Route
					path="/admin/link-student"
					element={<AdminLinkStudent />}
				/>
				<Route
					path="/admin/edit-course"
					element={<AdminEditCourse />}
				/>
				<Route
					path="/admin/edit-semester"
					element={<AdminEditSemester />}
				/>
				<Route path="/admin/link-slot" element={<AdminLinkSlot />} />
				<Route
					path="/admin/add-makeup-exam"
					element={<AdminAddMakeupExam />}
				/>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
