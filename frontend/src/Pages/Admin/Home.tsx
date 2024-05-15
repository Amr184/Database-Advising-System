import HomePageCard from "../../Components/HomepageCard";

export default function AdminHome() {
	return (
		<div className=" grid h-full w-full grid-cols-3  items-center  justify-center gap-44 bg-gray-900 px-24">
			<HomePageCard
				title="Students"
				items={[
					{
						title: "All Students",
						link: "/admin/all-students",
					},
					{
						title: "Grades",
						link: "/admin/grades",
					},
					{
						title: "Payments",
						link: "/admin/payments",
					},
				]}
			/>
			<HomePageCard
				title="Advisor"
				items={[
					{
						title: "All Advisors",
						link: "/admin/advisors",
					},
					{
						title: "Students",
						link: "/admin/advisor-students",
					},
					{
						title: "Link to Students",
						link: "/admin/link-student",
					},
					{
						title: "Requests",
						link: "/admin/requests",
					},
					{
						title: "Graduation Plans",
						link: "/admin/gradplans",
					},
				]}
			/>
			<HomePageCard
				title="Courses"
				items={[
					{
						title: "Instructors",
						link: "/admin/instructors",
					},
					{
						title: "Edit Courses",
						link: "/admin/edit-course",
					},
					{
						title: "Semesters",
						link: "/admin/semesters",
					},
					{
						title: "Edit Semester",
						link: "/admin/edit-semester",
					},
					{
						title: "Edit Slots",
						link: "/admin/link-slot",
					},
					{
						title: "Add Makeup Exam",
						link: "/admin/add-makeup-exam",
					},
				]}
			/>
		</div>
	);
}
