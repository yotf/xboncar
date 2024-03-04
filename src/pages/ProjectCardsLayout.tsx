import React from "react";
import { Link } from "react-router-dom";

export type Cards = {
  title: string;
  description: string;
  icon: string;
  url: string;
};
type ProjectCardsLayoutProps = {
  cards: Cards[];
};

const ProjectCardsLayout: React.FC<ProjectCardsLayoutProps> = ({ cards }) => {
  return (
    <>
      <div className="absolute top-[100px] bottom-0 left-0 w-full h-1/2  bg-carbonx-green" />
      <div className="container mx-auto px-4 py-10 z-10">
        <h1 className="text-4xl text-center font-bold m-10 mb-16">
          Choose your Project
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4   ">
          {cards.map((card, index) => (
            <Link
              to={card.url}
              key={index}
              className="focus:outline-none  cursor-pointer bg-white hover:shadow-lg transition hover:scale-105 duration-300 ease-in-out hover:bg-gray-100  border-carbonx-green border-4 rounded-lg shadow-lg p-6 flex flex-col items-center text-center"
            >
              <img
                src={card.icon}
                alt={card.title}
                className=" h-[170px] mb-4"
              />
              <h2 className="text-lg font-semibold mb-2">{card.title}</h2>
              <p className="text-sm mb-4 ">{card.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default ProjectCardsLayout;
