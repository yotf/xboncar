import autoAnimate from "@formkit/auto-animate";
import { useEffect, useRef, useState } from "react";
import { AddCircleOutline } from "react-ionicons";
import { useNavigate } from "react-router-dom";
import PrimaryButton from "../../components/atoms/PrimaryButton";
import TimeLineHorizontal from "../../components/atoms/TimeLineHorizontal";
import FileUploadSection from "./FileUploadSection";
type DocumentGroup = {
  name: string;
  isSelected: boolean;
};

const TimelinePage = () => {
  // Dummy data for timeline steps

  const [currentStep, setCurrentStep] = useState<number>(0);
  const timelineSteps = [
    { name: "Estimation / Conception", completed: true },
    { name: "Certification", completed: false },
    { name: "Monitoring", completed: false },
    { name: "Issuance", completed: false },
  ];

  const [documentGroups, setDocumentGroups] = useState<DocumentGroup[]>([
    {
      name: `Group of Document ${timelineSteps[currentStep].name} 1`,
      isSelected: true,
    },
    {
      name: `Group of Document ${timelineSteps[currentStep].name} 2`,
      isSelected: false,
    },
  ]);

  const incrementCurrentStep = () => {
    setCurrentStep((prev) => prev + 1);
  };

  useEffect(
    function resetDocumentGroups() {
      setDocumentGroups([
        {
          name: `Group of Document ${timelineSteps[currentStep].name} 1`,
          isSelected: true,
        },
        {
          name: `Group of Document ${timelineSteps[currentStep].name} 2`,
          isSelected: false,
        },
      ]);
    },
    [currentStep]
  );

  const parent = useRef<HTMLDivElement>(null);

  useEffect(() => {
    parent.current && autoAnimate(parent.current);
  }, [parent]);

  const addNewDocumentGroup = () => {
    setDocumentGroups((prev) => [
      ...prev,
      {
        name: `Group of Document ${timelineSteps[currentStep].name} ${
          prev.length + 1
        }`,
        isSelected: false,
      },
    ]);
  };

  const activateDocumentGroup = (documentGroup: DocumentGroup) => {
    setDocumentGroups((prev) =>
      prev.map((group) => {
        if (group.name === documentGroup.name) {
          return { ...group, isSelected: true };
        }
        return { ...group, isSelected: false };
      })
    );
  };

  const navigate = useNavigate();
  return (
    <>
      <button
        onClick={() => navigate(-1)}
        className="text-green-600  hover:text-green-800 transition duration-300 ease-in-out  font-semibold self-start m-5 -mr-5"
      >
        ‹ Go Back
      </button>

      <div className="mx-auto p-4  mt-4 container flex flex-col items-center ">
        <h1 className="text-3xl font-bold text-center mb-8">Timeline</h1>

        <TimeLineHorizontal
          items={timelineSteps.map((step) => step.name)}
          currentStep={currentStep}
        />
        <div className="flex justify-between w-[90%] gap-24">
          <div className="flex-1 flex flex-col gap-2 " ref={parent}>
            {documentGroups.map((group, index) => (
              <div
                key={index}
                className=" flex justify-between  first:border-none border-t-2 border-gray-300 pt-2 cursor-pointer"
                onClick={() => activateDocumentGroup(group)}
              >
                <p
                  className={`transition-all duration-500 ${
                    group.isSelected
                      ? "text-carbonx-dark-green font-semibold"
                      : ""
                  }`}
                >
                  {group.name}
                </p>
                <div
                  className={`w-6 h-6 rounded-full border flex items-center justify-center  ${
                    group.isSelected
                      ? ` border-carbonx-green border-[3px]`
                      : `border-gray-200 border-[3px]`
                  } `}
                >
                  {group.isSelected && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="17"
                      height="12"
                      viewBox="0 0 17 12"
                      fill="none"
                    >
                      <path
                        d="M14.2151 0.0883255C14.1604 0.106664 14.055 0.147009 13.9807 0.180018C13.9065 0.216695 12.0198 1.95518 9.78933 4.04577L5.73855 7.84918L4.18386 6.3931C3.12136 5.39916 2.57839 4.91502 2.4573 4.85634C2.19167 4.73163 1.76589 4.71696 1.4612 4.82699C1.26199 4.89668 1.16042 4.9737 0.754173 5.35148C0.191673 5.88329 0.101829 6.02633 0.0979226 6.43711C0.0901101 6.96526 -0.0544212 6.80022 2.74636 9.44096C4.44948 11.0474 5.30105 11.8213 5.40652 11.869C5.60574 11.957 5.87136 11.957 6.07058 11.869C6.17995 11.8213 7.76589 10.3542 11.2307 7.09363C16.8167 1.84149 16.387 2.28528 16.3792 1.74246C16.3753 1.33168 16.2854 1.18864 15.7229 0.656819C15.3245 0.282714 15.2151 0.202024 15.0237 0.136005C14.7932 0.055316 14.4143 0.0333099 14.2151 0.0883255Z"
                        fill="#C1F48F"
                      />
                    </svg>
                  )}
                </div>
              </div>
            ))}
            <div className="  pt-4 flex items-center justify-center">
              <button onClick={addNewDocumentGroup}>
                <AddCircleOutline
                  color={"gray"}
                  cssClasses={
                    "hover:scale-150 scale-125 transition-all duration-300 cursor-pointer text-xl"
                  }
                />
              </button>
            </div>
          </div>
          <div className="flex-1">
            <FileUploadSection />
          </div>
        </div>
        <div className="flex items-center mt-auto">
          <PrimaryButton
            className="w-[169px] h-[63px]"
            onClick={incrementCurrentStep}
          >
            <p className="text-lg"> Validate</p>
          </PrimaryButton>
        </div>
      </div>
    </>
  );
};

export default TimelinePage;
