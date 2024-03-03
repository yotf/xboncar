import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import CustomInput from "../components/atoms/CustomInput";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

type FormFields = z.infer<typeof schema>;
const Login = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({ resolver: zodResolver(schema) });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    console.log(data);
    try {
      await new Promise((r) => setTimeout(r, 1000));
      throw new Error();
    } catch (error) {
      setError("root", { message: "Email is not registered" });
    }
  };

  return (
    <>
      <div className=" w-full md:w-1/2 h-full flex flex-col justify-center items-center  flex-grow self-center z-10 max-[1427px]:    py-48 px-10 ">
        <div className="max-w-md w-full">
          <h2 className="mb-6 text-4xl font-bold text-gray-700">
            Login to account
          </h2>
          <p className="mb-8 text-sm text-gray-600">
            Log in with your data that you entered during your registration
          </p>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 ">
            <CustomInput
              {...register("email")}
              type="email"
              placeholder="Email*"
            />
            <CustomInput
              {...register("password")}
              type="password"
              placeholder="Password*"
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex justify-center btn btn-primary"
            >
              {isSubmitting ? "Loading..." : "Next"}
            </button>
          </form>
          <div className="text-center mt-6">
            <a href="/signup" className="">
              Not a member?{" "}
              <span className="text-bold text- text-carbonx-dark-green font-bold hover:text-carbonx-khaki transition-all">
                Sign up
              </span>
            </a>
          </div>
        </div>
      </div>
      <div className="w-1/2 max-[846px]:hidden" />

      <div className="max-[846px]:hidden absolute bg-right z-0  inset-x-0  bottom-0 right-0  max-[1512px]:bg-[url(carbon-bg.png)]  bg-[url(carbon-bg-full.png)] bg-no-repeat  h-[calc(100%-100px)]  bg-contain max-[920px]:bg-cover  "></div>
    </>
  );
  // <div className="flex">
  //   <form onSubmit={handleSubmit(onSubmit)} className="">
  //     <CustomInput type="text" {...register("email")} />

  //     <CustomInput type="password" {...register("password")} />

  //     <button
  //       className="btn btn-primary"
  //       type="submit"
  //       disabled={isSubmitting}
  //     >
  //       {isSubmitting ? "Loading..." : "Submit"}
  //     </button>
  //   </form>
  // </div>
};

export default Login;
