import { useQuery } from "@tanstack/react-query";
import { Stages, TimelineItem } from "../../types";

const timelineStepsMockData: TimelineItem[] = [
  {
    id: 0,
    name: "Estimation/Conception",
    completed: false,
    documentGroups: [
      {
        id: 0,
        name: "Group of Document Estimation / Conception 1",

        documents: [],
      },
      {
        id: 1,
        name: "Group of Document Estimation / Conception 2",

        documents: [],
      },
    ],
  },
  {
    id: 1,
    name: "Certification",
    completed: false,
    documentGroups: [
      {
        id: 0,
        name: "Group of Document Certification 1",

        documents: [],
      },
      {
        id: 1,
        name: "Group of Document Certification 2",

        documents: [],
      },
    ],
  },
  {
    id: 2,
    name: "Monitoring",
    completed: false,
    documentGroups: [
      {
        id: 0,
        name: "Group of Document Monitoring 1",

        documents: [],
      },
      {
        id: 1,
        name: "Group of Document Monitoring 2",

        documents: [],
      },
    ],
  },
  {
    id: 3,
    name: "Issuance",
    completed: false,
    documentGroups: [
      {
        id: 0,
        name: "Group of Document Issuance 1",

        documents: [],
      },
      {
        id: 1,
        name: "Group of Document Issuance 2",

        documents: [],
      },
    ],
  },
];

const fetchTimelineStep = async (
  projectId: string,
  timelineStepId: Stages
): Promise<TimelineItem | undefined> => {
  const timelineStep = timelineStepsMockData.find(
    (item) => item.name === timelineStepId
  );
  return Promise.resolve(timelineStep);
  // const response = await ApiService.get<TimelineItem>(
  // `/timeline/${projectId}/step/${timelineStepId}`
  // );
  // return response.data;
};

export const useTimelineStepData = (
  projectId: string,
  timelineStepId: Stages
) => {
  return useQuery({
    queryKey: ["timelineStepData", projectId, timelineStepId],
    queryFn: () => fetchTimelineStep(projectId, timelineStepId),
  });
};

export const updateTimelineStepData = async (
  projectId: string,
  timelineStepId: Stages,
  data: TimelineItem
) => {
  return Promise.resolve(data); //TODO think whether to use this data or to invalidateQueries
  // const response = await ApiService.put<TimelineItem>(
  //   `/timeline/${projectId}/step/${timelineStepId}`,
  //   data
  // );
  // return response.data;
};
