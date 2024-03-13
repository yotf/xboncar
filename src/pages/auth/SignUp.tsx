import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import CustomCheckbox from "../../components/atoms/CustomCheckbox";
import CustomInput from "../../components/atoms/CustomInput";
import PrimaryButton from "../../components/atoms/PrimaryButton";
import LandingPageLayout from "./LandingPageLayout";
import { signupUser } from "./api";

const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
);
const schema = z
  .object({
    firstName: z.string().min(2),
    lastName: z.string().min(2),
    organization: z.string().min(2),
    phoneNumber: z.string().regex(phoneRegex, "Invalid phone number"),
    email: z.string().email(),
    password: z.string().min(8),
    passwordConfirmation: z.string().min(8),
    termsAndConditions: z.boolean(),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords do not match",
    path: ["passwordConfirmation"],
  })
  .refine((data) => data.termsAndConditions, {
    message: "You must agree to the terms and conditions",
    path: ["termsAndConditions"],
  });

export type SignupFormFields = z.infer<typeof schema>;

const SignUp = () => {
  const {
    register,
    handleSubmit,
    setError,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormFields>({ resolver: zodResolver(schema) });
  const { termsAndConditions } = watch();

  const navigate = useNavigate();

  const signupMutation = useMutation({
    mutationFn: signupUser,
    onSuccess: () => {
      toast.success("Account created successfully! You can login now", {
        duration: 4000, // Display the toast for 4 seconds);
      });

      navigate("/login");
    },
    onError: (error) => {
      setError("root", { message: error.message });
    },
  });

  const onSubmit: SubmitHandler<SignupFormFields> = async (data) => {
    signupMutation.mutate(data);
    await new Promise((r) => setTimeout(r, 1000)); //TODO: Remove after connected to server
  };

  return (
    <LandingPageLayout
      title="Create your account"
      subtitle="Fill the form below to create an account"
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-2 gap-6"
      >
        <CustomInput
          {...register("firstName")}
          type="text"
          placeholder="First Name*"
          error={errors.firstName}
          id="firstName"
        />
        <CustomInput
          {...register("lastName")}
          type="text"
          placeholder="Last Name*"
          error={errors.lastName}
          id="lastName"
        />
        <CustomInput
          {...register("organization")}
          type="text"
          placeholder="Organization*"
          error={errors.organization}
          id="organization"
        />
        <CustomInput
          {...register("phoneNumber")}
          type="text"
          placeholder="Phone Number*"
          error={errors.phoneNumber}
          id="phoneNumber"
        />
        <CustomInput
          {...register("email")}
          type="email"
          placeholder="Email*"
          error={errors.email}
          className="col-span-2"
          id="email"
        />
        <CustomInput
          {...register("password")}
          type="password"
          placeholder="Password*"
          error={errors.password}
          id="password"
        />
        <CustomInput
          {...register("passwordConfirmation")}
          type="password"
          placeholder="Confirm Password*"
          error={errors.passwordConfirmation}
          id="passwordConfirmation"
        />
        <CustomCheckbox
          {...register("termsAndConditions")}
          label="I have read, understood and agree to the terms and conditions*"
          id="termsAndConditions"
        />
        <PrimaryButton
          disabled={
            isSubmitting || !termsAndConditions || signupMutation.isPending
          }
          type="submit"
          className="col-span-2"
        >
          {isSubmitting || signupMutation.isPending ? "Loading..." : "Next"}
        </PrimaryButton>

     
      </form>
      <div className="text-center mt-6">
        <Link to="/login" className="">
          Already have an account?{" "}
          <span className="text-carbonx-dark-green font-bold">Login</span>
        </Link>
      </div>
    </LandingPageLayout>
  );
};

export default SignUp;
