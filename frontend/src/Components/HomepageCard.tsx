import { Link } from "react-router-dom";
import React from "react";
import { homePageButtonClass, homePageContainerClass } from "../assets/Styles";

interface HomePageCardProps {
	title: string;
	items: {
		title: string;
		link: string;
	}[];
}

export default function HomePageCard({ title, items }: HomePageCardProps) {
	return (
		<div
			className={homePageContainerClass}
			style={{
				background:
					"linear-gradient(180, rgba(255,255,255,1), rgba(255,255,255,1))",
			}}
		>
			<h1 className="flex pb-7 text-4xl font-bold text-white ">
				{title}
			</h1>
			<span className="h-[1px] w-[95%] translate-y-[-2vh] bg-white" />

			{items.map((item) => (
				<Link to={item.link} className={homePageButtonClass}>
					{item.title}
				</Link>
			))}
		</div>
	);
}
