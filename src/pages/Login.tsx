import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import CustomInput from "../components/atoms/CustomInput";
import PrimaryButton from "../components/atoms/PrimaryButton";
import LandingPageLayout from "./LandingPageLayout";

const Login = () => {
  const schema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
  });

  type FormFields = z.infer<typeof schema>;
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
    <LandingPageLayout
      title="Login to account"
      subtitle=" Log in with your data that you entered during your registration"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 ">
        <CustomInput
          {...register("email")}
          type="email"
          placeholder="Email*"
          error={errors.email}
          id="email"
        />
        {/* {errors.email && (
            <InputErrorMessage message={errors.email.message} />
          )} */}
        <CustomInput
          {...register("password")}
          type="password"
          placeholder="Password*"
          error={errors.password}
          id="password"
        />
        <PrimaryButton disabled={isSubmitting} type="submit">
          {isSubmitting ? "Loading..." : "Next"}
        </PrimaryButton>
      </form>
      <div className="text-center mt-6">
        <a href="/signup" className="">
          Not a member?{" "}
          <span className="text-bold text- text-carbonx-dark-green font-bold hover:text-carbonx-khaki transition-all">
            Sign up
          </span>
        </a>
      </div>
    </LandingPageLayout>
  );
};

export default Login;
