import ProjectCardsLayout, { Cards } from "./ProjectCardsLayout";

// Dummy data for the project cards
const projects: Cards[] = [
  {
    title: "Switching Fossil Fuels",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed mollis est in vulputate eu ullamcorper faucibus.",
    icon: "switching-fuels.png", // Replace with your actual icon paths
    url: "/project/switching-fossil-fuels",
  },
  {
    title: "Treatment of Wastewater",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed mollis est in vulputate eu ullamcorper faucibus.",
    icon: "water.svg",
    url: "/project/treatment-of-wastewater",
  },
  {
    title:
      "Energy Efficiency for Thermal Applications of Non-Renewable Biomass",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed mollis est in vulputate eu ullamcorper faucibus.",
    icon: "energy-efficiency.png",
    url: "/project/energy-efficiency-for-thermal-applications",
  },
  {
    title: "Increasing the Blend in Cement Production",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed mollis est in vulputate eu ullamcorper faucibus.",
    icon: "cement.png",
    url: "/project/increasing-the-blend-in-cement-production",
  },
];

const ChooseYourProject = () => {
  return <ProjectCardsLayout cards={projects} />;
};

export default ChooseYourProject;
