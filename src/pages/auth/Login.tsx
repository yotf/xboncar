import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import CustomInput from "../../components/atoms/CustomInput";
import PrimaryButton from "../../components/atoms/PrimaryButton";
import { LoginResponse, mockLogin } from "../../services/mockServices";
import LandingPageLayout from "./LandingPageLayout";

const Login = () => {
  const navigate = useNavigate();
  const schema = z.object({
    email: z.string().email(),
    password: z
      .string()
      .min(12, { message: "Password must be at least 12 characters long." })
      .regex(/[A-Z]/, {
        message: "Password must include at least one uppercase letter.",
      })
      .regex(/[a-z]/, {
        message: "Password must include at least one lowercase letter.",
      })
      .regex(/[0-9]/, { message: "Password must include at least one number." })
      .regex(/[@$!%*#?&]/, {
        message: "Password must include at least one special character.",
      }),
  });

  type FormFields = z.infer<typeof schema>;
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({ resolver: zodResolver(schema) });

  const loginMutation = useMutation({
    mutationFn: (data: FormFields) => mockLogin(data.email, data.password),
    onSuccess: (data) => {
      const { token, user } = data as LoginResponse;
      localStorage.setItem("userInfo", JSON.stringify(user));
      localStorage.setItem("jwtToken", token);
      toast.success("Logged in successfully!", {
        duration: 4000, // Display the toast for 4 seconds
        position: "top-center", // Position it at the top
      });
      navigate("/");
    },
    onError: (error) => {
      setError("root", { message: "The username or password is incorrect" });
    },
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    loginMutation.mutate(data);
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
        <PrimaryButton
          disabled={isSubmitting || loginMutation.isPending}
          type="submit"
          className="w-full"
        >
          {isSubmitting || loginMutation.isPending ? "Loading..." : "Next"}
        </PrimaryButton>
      </form>
      <div className="text-center mt-6">
        <Link to="/signup">
          Not a member?{" "}
          <span className="text-bold text- text-carbonx-dark-green font-bold hover:text-carbonx-khaki transition-all">
            Sign up
          </span>
        </Link>
      </div>
    </LandingPageLayout>
  );
};

export default Login;
