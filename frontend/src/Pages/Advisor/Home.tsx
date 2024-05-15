import HomePageCard from "../../Components/HomepageCard";

export default function AdvisoHome() {
	return (
		<div className=" grid h-full w-full grid-cols-1  items-center  justify-center gap-44 bg-gray-900 px-24">
			<HomePageCard
				title="Students"
				items={[
					{
						title: "Advising Students",
						link: "/advisor/students",
					},
					{
						title: "Advising Students Courses",
						link: "/advisor/students-courses",
					},
					{
						title: "Requests",
						link: "/advisor/requests",
					},
					{
						title: "Graduation Plan",
						link: "/advisor/gradplan",
					},
				]}
			/>
		</div>
	);
}
