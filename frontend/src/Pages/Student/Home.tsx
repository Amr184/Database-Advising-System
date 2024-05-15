import HomePageCard from "../../Components/HomepageCard";

export default function Home() {
	return (
		<div className="grid h-full  w-full grid-cols-3  items-center  justify-center gap-44 bg-gray-900 px-24">
			<HomePageCard
				title="Courses"
				items={[
					{
						title: "Courses",
						link: "/student/courses",
					},
					{
						title: "Courses & Prerequisites",
						link: "/student/courses-prerequisites",
					},
					{
						title: "Slots",
						link: "/student/slots",
					},
					{
						title: "Exams",
						link: "/student/exams",
					},
					{
						title: "Graduation Plan",
						link: "/student/gradplan",
					},
				]}
			/>
			<HomePageCard
				title="Finance"
				items={[
					{
						title: "Installment",
						link: "/student/installment",
					},
				]}
			/>
			<HomePageCard
				title="Request"
				items={[
					{
						title: "Make-up",
						link: "/student/makeup",
					},
					{
						title: "Instructor",
						link: "/student/instructor",
					},

					{
						title: "Requests",
						link: "/student/requests",
					},
					{
						title: "Add phone",
						link: "/student/phone",
					},
				]}
			/>
		</div>
	);
}
