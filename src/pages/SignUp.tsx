import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import CustomInput from "../components/atoms/CustomInput";
import InputErrorMessage from "../components/atoms/InputErrorMessage";
import PrimaryButton from "../components/atoms/PrimaryButton";
import LandingPageLayout from "./LandingPageLayout";

const SignUp = () => {
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
      setError("root", { message: "Could not create user" }); //TODO: Get error message from server
    }
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
        />
        <CustomInput
          {...register("lastName")}
          type="text"
          placeholder="Last Name*"
          error={errors.lastName}
        />
        <CustomInput
          {...register("organization")}
          type="text"
          placeholder="Organization*"
          error={errors.organization}
        />
        <CustomInput
          {...register("phoneNumber")}
          type="text"
          placeholder="Phone Number*"
          error={errors.phoneNumber}
        />
        <CustomInput
          {...register("email")}
          type="email"
          placeholder="Email*"
          error={errors.email}
          className="col-span-2"
        />
        <CustomInput
          {...register("password")}
          type="password"
          placeholder="Password*"
          error={errors.password}
        />
        <CustomInput
          {...register("passwordConfirmation")}
          type="password"
          placeholder="Confirm Password*"
          error={errors.passwordConfirmation}
        />
        <div className="flex items-center col-span-2">
          <input
            {...register("termsAndConditions")}
            type="checkbox"
            className="checkbox checkbox-primary"
            //className="rounded border-gray-300 text-carbonx-green focus:ring focus:ring-carbonx-khaki focus:ring-opacity-20"
          />
          <label htmlFor="termsAndConditions" className="ml-2">
            I agree to the terms and conditions
          </label>
        </div>
        <PrimaryButton
          disabled={isSubmitting}
          type="submit"
          className="col-span-2"
        >
          {isSubmitting ? "Loading..." : "Next"}
        </PrimaryButton>

        {errors.root && <InputErrorMessage message={errors.root.message} />}
      </form>
      <div className="text-center mt-6">
        <a href="/login" className="">
          Already have an account? Login
        </a>
      </div>
    </LandingPageLayout>
  );
};

export default SignUp;
