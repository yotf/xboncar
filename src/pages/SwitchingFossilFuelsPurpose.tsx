import ProjectCardsLayout, { Cards } from "./ProjectCardsLayout";
const purposes: Cards[] = [
  {
    title: "Existing Facility Generating Energy for Captive Users",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed mollis est in vulputate eu ullamcorper faucibus.",
    icon: "../windmill.png",
    url: "/projects/switching-fossil-fuels/generating-energy-for-captive-users",
  },
  {
    title: "Providing Electricity to the Grid",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed mollis est in vulputate eu ullamcorper faucibus.Sed mollis est in vulputate eu ullamcorper faucibus. In vulputate eu ullamcorper faucibus.",
    icon: "../grid.png",
    url: "/projects/switching-fossil-fuels/providing-electricity-to-the-grid",
  },
  {
    title: "Greenfield/Capacity Expansion",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed mollis est in vulputate eu ullamcorper faucibus.",
    icon: "../expansion.png",
    url: "/projects/switching-fossil-fuels/greenfield-capacity-expansion",
  },
];

const SwitchingFossilFuelsPurpose = () => {
  return (
    <ProjectCardsLayout
      title="What is the project's purpose?"
      cards={purposes}
    />
  );
};

export default SwitchingFossilFuelsPurpose;
