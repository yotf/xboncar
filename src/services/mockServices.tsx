export const mockLogin = async (email: string, password: string) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email === "user@example.com" && password === "password123") {
        resolve({ token: "mockToken", user: { name: "John Doe", email } });
      } else {
        reject(new Error("Invalid email or password"));
      }
    }, 1000);
  });
};
