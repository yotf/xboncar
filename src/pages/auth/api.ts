import { SignupFormFields } from "./SignUp";

export const signupUser = async (data: SignupFormFields) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ data: "success" });
    }, 2000); // 2000 milliseconds = 2 seconds
  });
  //const response = await ApiService.post("/signup", data);
  //return response.data;
};
