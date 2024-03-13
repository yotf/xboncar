import { AboutProjectFormFields } from "./AboutYourProject";

export const addProject = async (data: AboutProjectFormFields) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ data: "success" });
    }, 2000); // 2000 milliseconds = 2 seconds
  });
  //const response = await ApiService.post("/projects/add-project", data);
  //return response.data;
};
