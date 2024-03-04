import React from "react";

const ChooseYourProject: React.FC = () => {
  // Dummy data for the project cards
  const projects = [
    {
      title: "Switching Fossil Fuels",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed mollis est in vulputate eu ullamcorper faucibus.",
      icon: "switching-fuels.png", // Replace with your actual icon paths
    },
    {
      title: "Treatment of Wastewater",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed mollis est in vulputate eu ullamcorper faucibus.",
      icon: "water.svg",
    },
    {
      title:
        "Energy Efficiency for Thermal Applications of Non-Renewable Biomass",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed mollis est in vulputate eu ullamcorper faucibus.",
      icon: "energy-efficiency.png",
    },
    {
      title: "Increasing the Blend in Cement Production",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed mollis est in vulputate eu ullamcorper faucibus.",
      icon: "cement.png",
    },
  ];

  return (
    <>
      <div className="absolute top-[100px] bottom-0 left-0 w-full h-1/2  bg-carbonx-green" />
      <div className="container mx-auto px-4 py-10 z-10">
        <h1 className="text-4xl text-center font-bold mb-10">
          Choose your Project
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 ">
          {projects.map((project, index) => (
            <div
              key={index}
              className="bg-white  border-carbonx-green  border-4 rounded-lg shadow-lg p-6 flex flex-col items-center text-center"
            >
              <img
                src={project.icon}
                alt={project.title}
                className=" h-[40%] mb-4"
              />
              <h2 className="text-lg font-semibold mb-2">{project.title}</h2>
              <p className="text-sm mb-4">{project.description}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ChooseYourProject;
