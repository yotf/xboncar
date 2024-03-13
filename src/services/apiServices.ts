import axios, { AxiosInstance, AxiosResponse } from "axios";
import { mockRefreshToken } from "./mockServices";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: "", // Add your base URL TODO
  headers: {
    "Content-Type": "application/json",
  },
});

export const axiosSetup = () => {
  axiosInstance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("jwtToken");
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  //if the token is expired, refresh the token

  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalConfig = error.config;

      // Check for refresh token condition, e.g., 401 status code
      if (error.response?.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;

        try {
          const { token } = await mockRefreshToken();
          localStorage.setItem("jwtToken", token); // Update the token in localStorage

          // Update the token in the header for the original request
          originalConfig.headers.Authorization = `Bearer ${token}`;

          // Perform the original request again with the new token
          return axiosInstance(originalConfig);
        } catch (_error) {
          // Logout the user or redirect to login if refresh token fails
          // e.g., queryClient.invalidateQueries('userData');
          return Promise.reject(_error);
        }
      }

      return Promise.reject(error);
    }
  );
};

export type ApiServiceType = {
  get<Type>(url: string, body?: object): Promise<AxiosResponse<Type, any>>;
  getById<Type>(
    url: string,
    id: number | string
  ): Promise<AxiosResponse<Type, any>>;
  put<Type>(
    url: string,
    id: number | string,
    data: any
  ): Promise<AxiosResponse<Type>>;
  post<Type>(url: string, data?: any): Promise<AxiosResponse<Type>>;
  delete<Type>(url: string, id: number | string): Promise<AxiosResponse<Type>>;
};
/**
 * @returns CRUD operations used in the application
 */
const ApiService: ApiServiceType = {
  get<Type>(url: string, body?: object): Promise<AxiosResponse<Type>> {
    return axiosInstance.get(url, body);
  },

  getById<Type>(
    url: string,
    id: number | string
  ): Promise<AxiosResponse<Type>> {
    return axiosInstance.get(url + `/${id}`);
  },

  put<Type>(
    url: string,
    id: number | string,
    data: any
  ): Promise<AxiosResponse<Type>> {
    return axiosInstance.put(url + `/${id}`, data);
  },

  post<Type>(url: string, data?: any): Promise<AxiosResponse<Type>> {
    return axiosInstance.post(url, data);
  },

  delete<Type>(url: string, id: number | string): Promise<AxiosResponse<Type>> {
    return axiosInstance.delete(url + `/${id}`);
  },
};

export default ApiService;
