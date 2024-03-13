export type LoginResponse = {
  token: string;
  user: { name: string; email: string };
};

export const mockLogin = async (
  email: string,
  password: string
): Promise<LoginResponse | Error> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email === "user@example.com" && password === "password123") {
        resolve({ token: "mockToken", user: { name: "John Doe", email } });
      } else {
        reject(new Error("Invalid email or password"));
      }
    }, 1000);
  });
  // const response = await ApiService.post<LoginResponse>("/login"); //TODO replace with actual API
  // return response.data;
};

export const mockRefreshToken = async (): Promise<{ token: string }> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ token: "newMockToken" });
    }, 1000);
  });
// const response = await ApiService.post<LoginResponse>(REFRESH_TOKEN_API + localStorage.getItem("jwtToken");
// return response.data;
};
