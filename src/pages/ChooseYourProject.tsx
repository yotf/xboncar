import ProjectCardsLayout, { Cards } from "./ProjectCardsLayout";

const ChooseYourProject = () => {
  const projects: Cards[] = [
    {
      title: "Switching Fossil Fuels",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed mollis est in vulputate eu ullamcorper faucibus.",
      icon: "/switching-fuels.png",
      url: "/projects/switching-fossil-fuels",
    },
    {
      title: "Treatment of Wastewater",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed mollis est in vulputate eu ullamcorper faucibus.",
      icon: "/water.svg",
      url: "/",
    },
    {
      title:
        "Energy Efficiency for Thermal Applications of Non-Renewable Biomass",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed mollis est in vulputate eu ullamcorper faucibus.",
      icon: "/energy-efficiency.png",
      url: "/",
    },
    {
      title: "Increasing the Blend in Cement Production",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed mollis est in vulputate eu ullamcorper faucibus.",
      icon: "/cement.png",
      url: "/",
    },
  ];
  return <ProjectCardsLayout title={"Choose your Project"} cards={projects} />;
};

export default ChooseYourProject;
