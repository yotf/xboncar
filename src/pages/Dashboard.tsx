import React from "react";
import { AddOutline } from "react-ionicons";
import { Link } from "react-router-dom";
import CustomInput from "../components/atoms/CustomInput";
import TimeLine from "../components/atoms/TimeLine";

// Reusable card component

type CardProps = {
  title: string;
  children: React.ReactNode;
  className?: string;
};
const Card: React.FC<CardProps> = ({ title, children, className }) => (
  <div
    className={`p-4 hover:shadow-lg ease-in-out transition-all hover:bg-carbonx-light-green hover:bg-opacity-30 cursor-pointer bg-white rounded-lg shadow border-2 ${
      className || ""
    }`}
  >
    <h3 className="mb-6 text-xl font-semibold text-center">{title}</h3>
    {children}
  </div>
);

const DashboardPage: React.FC = () => {
  const prices = [10, 20, 50];

  return (
    <div className="container mx-auto px-4 mt-6">
      <h2 className="text-3xl font-bold text-center mb-6">
        Project Name
        <br /> Dashboard
      </h2>
      <div className="flex gap-6 justify-center ">
        <div className="flex flex-col gap-6 ">
          <Card title="Summary" className="grow">
            <div className="space-y-6 h-[214px]">
              <p>Project Type </p>
              <p className="border-bottom">Stage </p>
              <p className="block w-60 border-t-2  text-[14px] pt-2">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iusto,
                distinctio a. Itaque alias excepturi aperiam deleniti inventore?
              </p>
            </div>
          </Card>

          <Link to="./timeline">
            <Card title="Timeline">
              <TimeLine
                items={[
                  "Estimation/Conception",
                  "Certification",
                  "Monitoring",
                  "Issuance",
                ]}
                currentStep={1}
              />
            </Card>
          </Link>
        </div>
        <div className="flex flex-col gap-6">
          <div className="flex gap-6 grow ">
            <Card title="Estimate" className="grow">
              <div className="flex flex-col items-center justify-evenly gap-6 text-carbonx-text-green  ">
                <p className="text-6xl font-bold text-center ">
                  300 t CO<span className="text-4xl">2e</span>
                </p>
                <p className="text-6xl font-bold text-center">$ 3000</p>
              </div>
            </Card>

            <Card title="Carbon Price" className="px-10">
              <div className="grid grid-cols-2 gap-6 gap-x-12 gap-4 items-center justify-items-center w-fit  ">
                {prices.map((price, index) => (
                  <div
                    key={index}
                    className={`p-6 border-2 rounded-lg  text-xl w- w-fit ${
                      index === 0 ? "bg-carbonx-green " : "border-gray-300"
                    }`}
                  >
                    ${price}
                  </div>
                ))}

                <CustomInput
                  type="number"
                  className="w-[86px]  "
                  placeholder="$__ "
                  inputClassName=" h-[80px] mt-0 border-2 text-center"
                />
              </div>
            </Card>
          </div>
          <div className="flex gap-6 ">
            <Card title="Baseline Estimation">
              <div className="flex justify-center items-center space-x-4 p-4 ">
                <div className="flex flex-wrap justify-around items-start w-full">
                  {/* Card for Baseline 1 */}
                  <div className="flex flex-col items-center justify-between p-4 m-2 bg-carbonx-green border  rounded-lg shadow w-28 h-24">
                    <span className="text-xs ">Baseline 1</span>
                    <span className="text-sm font-semibold">900 tCO2e</span>
                  </div>
                  {/* Card for Baseline 2 */}
                  <div className="flex flex-col items-center justify-between p-4 m-2 border rounded-lg shadow w-28 h-24">
                    <span className="text-xs">Baseline 2</span>
                    <span className="text-sm font-semibold">700 tCO2e</span>
                  </div>
                  {/* Placeholder for adding a new card */}
                  <div className="flex transition-all items-center hover:bg-carbonx-light-green justify-center w-28 h-24 p-4 m-2 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer">
                    <div className=" transition-all">
                      <AddOutline />
                    </div>
                  </div>
                </div>
              </div>
            </Card>
            <Card title="Project Estimation">
              <div className="flex justify-center items-center space-x-4 p-4 ">
                <div className="flex flex-wrap justify-around items-start w-full">
                  <div className="flex flex-col items-center justify-between p-4 m-2 bg-carbonx-green border  rounded-lg shadow w-28 h-24">
                    <span className="text-sm ">Project 1</span>
                    <span className="text-sm font-semibold">900 tCO2e</span>
                  </div>

                  <div className="flex flex-col items-center justify-between p-4 m-2 border rounded-lg shadow w-28 h-24">
                    <span className="text-sm ">Project 2</span>
                    <span className="text-sm font-semibold">700 tCO2e</span>
                  </div>

                  <div className="flex transition-all items-center hover:bg-carbonx-light-green justify-center w-28 h-24 p-4 m-2 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer">
                    <div className=" transition-all">
                      <AddOutline />
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
