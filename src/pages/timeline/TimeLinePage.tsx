import autoAnimate from "@formkit/auto-animate";
import {
  InformationCircleIcon,
  PencilSquareIcon,
  PlusCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCallback, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import BackButton from "../../components/atoms/BackButton";
import CustomInput from "../../components/atoms/CustomInput";
import PrimaryButton from "../../components/atoms/PrimaryButton";
import { DropZoneDocument, TimelineItem, stagesEnum } from "../../types";
import { useProjectData } from "../dashboard/queries";
import FileUploadSection from "./FileUploadSection";
import TimeLineHorizontal, {
  HorizontalTimelineItem,
} from "./TimeLineHorizontal";
import { updateTimelineStepData, useTimelineStepData } from "./queries";

const TimelinePage = () => {
  const { projectId } = useParams();
  const queryClient = useQueryClient();

  const { data: projectData } = useProjectData(Number(projectId || 0));
  const [currentStepData, setCurrentStepData] = useState<TimelineItem | null>(
    null
  );

  const [currentStep, setCurrentStep] = useState<number>(
    stagesEnum.indexOf(projectData?.stage!)
  );

  const [validateDisabled, setValidateDisabled] = useState<boolean>(false);

  /// Editing group name logic

  const [editingGroupId, setEditingGroupId] = useState<number | null>(null); // Step 1

  const toggleEditGroupName = (groupId: number) => {
    // Step 2
    setEditingGroupId(editingGroupId === groupId ? null : groupId);
  };

  const handleGroupNameChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    groupId: number
  ) => {
    // Step 3
    const updatedName = e.target.value;
    setCurrentStepData((prev: TimelineItem | null) => ({
      ...prev!,
      documentGroups: prev!.documentGroups.map((group) =>
        group.id === groupId ? { ...group, name: updatedName } : group
      ),
    }));
  };

  // End of editing group name logic

  // Toggling document completion logic
  const [completedDocumentGroups, setCompletedDocumentGroups] = useState<
    Set<number>
  >(new Set());

  useEffect(() => {
    setCompletedDocumentGroups(new Set());
  }, [currentStep]);

  const toggleDocumentGroupCompletion = (groupId: number) => {
    setCompletedDocumentGroups((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(groupId)) {
        newSet.delete(groupId);
      } else {
        newSet.add(groupId);
      }
      return newSet;
    });
  };
  // End of toggling document completion logic
  const allDocumentGroupsCompleted =
    currentStepData &&
    completedDocumentGroups.size === currentStepData.documentGroups.length;
  useEffect(() => {
    setCurrentStep(stagesEnum.indexOf(projectData?.stage!));
  }, [projectData?.stage]);

  const [activeDocumentGroup, setActiveDocumentGroup] = useState<number>();

  const { data: stepDataRemote } = useTimelineStepData(
    projectId!,
    stagesEnum[currentStep]
  );

  useEffect(() => {
    setCurrentStepData(stepDataRemote ?? null);
  }, [stepDataRemote]);

  const [horizontalTimelineSteps, setHorizontalTimelineSteps] = useState<
    HorizontalTimelineItem[]
  >([]);

  useEffect(
    function prepareForTimelineComponent() {
      const t: HorizontalTimelineItem[] = [];
      stagesEnum.forEach((stage, index) => {
        const x = stage.indexOf(projectData?.stage!);
        debugger;
        t.push({
          name: stage,
          completed: stagesEnum.indexOf(projectData?.stage!) > index,
        });
      });
      setHorizontalTimelineSteps(t);
    },
    [projectData?.stage]
  ); //TODO this could go in the horizontalTImelineComponent and will change based on the back-end

  //Auto animate setup
  const parent = useRef<HTMLDivElement>(null);

  useEffect(() => {
    parent.current && autoAnimate(parent.current);
  }, [parent]);

  const updateMutation = useMutation({
    mutationFn: () =>
      updateTimelineStepData(
        projectId!,
        stagesEnum[currentStep],
        currentStepData!
      ),
    onSuccess: (data) => {
      toast.success("Step validated successfully", {});
      // queryClient.invalidateQueries({ queryKey: ["timelineStepData"] });
      setCurrentStepData(data);
      //queryClient.invalidateQueries({ queryKey: ["projectData", projectId] }); //TODO think whether to use this data or to invalidateQueries and also whether we need to invalidate the projectData
      //TODO need to make sure that the backend is updating the project stage data
    },
    onError: () => {
      toast.error("Error validating step", {});
    },
  });
  const completeCurrentStep = () => {
    setHorizontalTimelineSteps((prev) =>
      prev.map((step, index) => {
        if (index === currentStep) {
          return { ...step, completed: true };
        }
        return step;
      })
    ); // TODO this will not be needed if we invalidate the projectData
    updateMutation.mutate();

    if (currentStep === horizontalTimelineSteps.length - 1) {
      setValidateDisabled(true);
    } else {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const onClickItem = (index: number) => {
    if (
      horizontalTimelineSteps[index].completed ||
      (index !== 0 && horizontalTimelineSteps[index - 1].completed)
    ) {
      setCurrentStep(index);
    } else {
      toast.error("Please validate the previous step first", {
        icon: <InformationCircleIcon className="w-6 h-6" />,
      });
    }
  };

  const addNewDocumentGroup = () => {
    setCurrentStepData((prev) => {
      return {
        ...prev,
        documentGroups: [
          ...prev.documentGroups,
          {
            id: prev.documentGroups.length,
            name: `Group of Document ${prev.name} ${
              prev.documentGroups.length + 1
            }`,
            isSelected: false,
            documents: [],
          },
        ],
      };
    });
  };

  //TODO need to put initial data if there is no data

  const deleteDocumentGroup = (groupId: number) => {
    setCompletedDocumentGroups((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(groupId)) {
        newSet.delete(groupId);
      }
      return newSet;
    });
    setCurrentStepData((prev) => {
      return {
        ...prev,
        documentGroups: prev.documentGroups.filter(
          (group) => group.id !== groupId
        ),
      };
    });
  };

  const onDrop = useCallback(
    (acceptedFiles: any) => {
      setCurrentStepData((prev) => {
        return {
          ...prev,
          documentGroups: prev.documentGroups.map((group) => {
            if (group.id === activeDocumentGroup) {
              if (group.documents.length >= 6) {
                toast.error(
                  "You cannot upload more than 6 documents. Please limit your upload to 6 documents.",
                  {
                    icon: <InformationCircleIcon className="w-6 h-6" />,
                  }
                );
                return group;
              }
              return {
                ...group,
                documents: [...group.documents, ...acceptedFiles],
              };
            }
            return group;
          }),
        };
      });
    },
    [currentStep, activeDocumentGroup]
  );

  const onRemoveDocument = (doc: DropZoneDocument) => {
    setCurrentStepData((prev) => {
      return {
        ...prev,
        documentGroups: prev?.documentGroups.map((group) => {
          if (group.id === activeDocumentGroup) {
            return {
              ...group,
              documents: group.documents.filter((document) => document !== doc),
            };
          }
          return group;
        }),
      };
    });
  };

  useEffect(() => {
    setActiveDocumentGroup(currentStepData?.documentGroups[0].id);
  }, [currentStep, currentStepData?.documentGroups[0].id]);

  return (
    <div className="mx-auto  container ">
      <BackButton label="Return to Dashboard" />

      <div className=" flex flex-col items-center mx-2 h-[calc(100%-100px)]">
        <h1 className="text-3xl font-bold text-center mb-8">Timeline</h1>

        <TimeLineHorizontal
          items={horizontalTimelineSteps}
          currentStep={currentStep}
          onClickItem={onClickItem}
        />
        <div className="flex justify-between w-[90%] gap-24">
          <div className="flex-1 flex flex-col gap-2 " ref={parent}>
            {currentStepData &&
              currentStepData.documentGroups.map((group, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center first:border-none border-t-2 border-gray-300 pt-2 group"
                >
                  {editingGroupId === group.id ? (
                    <CustomInput
                      type="text"
                      value={group.name}
                      onChange={(e) => handleGroupNameChange(e, group.id)}
                      onBlur={() => setEditingGroupId(null)}
                      onKeyDown={(e) =>
                        e.key === "Enter" && setEditingGroupId(null)
                      }
                      autoFocus
                      className="input-class" // Style your input
                    />
                  ) : (
                    <>
                      <p
                        className={`transition-all duration-500 cursor-pointer ${
                          group?.id === activeDocumentGroup
                            ? "text-carbonx-dark-green font-semibold"
                            : ""
                        }`}
                        onClick={() => {
                          setActiveDocumentGroup(group?.id);
                        }} // Adjust the click handler for selecting the group
                      >
                        {group.name}
                      </p>
                      <button
                        onClick={() => toggleEditGroupName(group.id)} // Separate handler for toggling edit mode
                        className="ml-4 hidden group-hover:block"
                      >
                        <PencilSquareIcon className="h-5 w-5 text-gray-500 hover:text-gray-700" />
                      </button>
                    </>
                  )}
                  <div
                    onClick={() => toggleDocumentGroupCompletion(group.id)}
                    className={`w-6 h-6 rounded-full border flex items-center ml-auto justify-center cursor-pointer ${
                      completedDocumentGroups.has(group.id)
                        ? ` border-carbonx-green border-[3px]`
                        : `border-gray-200 border-[3px]`
                    } `}
                  >
                    {completedDocumentGroups.has(group.id) && (
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

                  {currentStepData.documentGroups.length > 1 && (
                    <button
                      onClick={() => deleteDocumentGroup(group.id)}
                      className="text-red-500  ml-4 sel justify-self-center  self-center  "
                    >
                      <XMarkIcon className="w-6 h-6 text-gray-600" />
                    </button>
                  )}
                </div>
              ))}

            <div className="  pt-4 flex items-center justify-center">
              <button onClick={addNewDocumentGroup}>
                <PlusCircleIcon className="w-8 h-8 hover:scale-110 text-gray-400 hover:text-gray-500 transition-all duration-300 cursor-pointer" />
              </button>
            </div>
          </div>
          <div className="flex-1">
            <FileUploadSection
              onDrop={onDrop}
              onRemoveDocument={onRemoveDocument}
              documents={
                currentStepData?.documentGroups?.[activeDocumentGroup || 0]
                  .documents
              }
            />
          </div>
        </div>
        <div className="flex items-center mt-auto">
          <div
            className={` ${
              !allDocumentGroupsCompleted && !validateDisabled
                ? "tooltip tooltip-primary"
                : ""
            }`}
            data-tip="You must mark all document groups as completed "
          >
            <PrimaryButton
              className="w-[169px] h-[63px]"
              onClick={completeCurrentStep}
              disabled={validateDisabled || !allDocumentGroupsCompleted}
            >
              <p className="text-lg"> Validate</p>
            </PrimaryButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimelinePage;
