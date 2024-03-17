import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import CustomInput from "../components/atoms/CustomInput";
import PrimaryButton from "../components/atoms/PrimaryButton";
import TextArea from "../components/atoms/TextArea";

// Define the form schema using Zod
const schema = z.object({
  email: z
    .string()
    .email({ message: "Invalid email address" })
    .nonempty({ message: "Email is required" }),
  subject: z.string().min(1, "Subject is required"),
  message: z.string().min(1, "Message is required"),
});

// Type for form values
type FormData = z.infer<typeof schema>;

const ContactPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log(data);
    //toast.success("Message sent successfully!");
    // Handle form submission
  };

  return (
    <>
      <div className="container  mx-auto p-6 z-50">
        <div className=" mx-auto  flex flex-col gap-10 mt-[10%] justify-between  rounded-lg  overflow-hidden md:max-w-lg">
          <h2 className="text-3xl text-center font-semibold text-gray-700 z-50">
            Contact Us
          </h2>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6 p-4 z-50"
          >
            <CustomInput
              type="email"
              {...register("email")}
              className=""
              placeholder="Email"
              error={errors.email}
            />

            <CustomInput
              type="text"
              {...register("subject")}
              className=""
              error={errors.subject}
              placeholder="Subject"
            />

            <TextArea
              rows={4}
              {...register("message")}
              error={errors.message}
              className=""
              placeholder="Message"
            />

            <PrimaryButton type="submit" className="w-full">
              Send{" "}
            </PrimaryButton>
          </form>
        </div>
      </div>
      <div className="max-[846px]:hidden absolute bg-right z-0  inset-x-0  bottom-0 right-0  max-[1512px]:bg-[url(/carbon-bg.png)]  bg-[url(/carbon-bg-full.png)] bg-no-repeat  h-[calc(100%-100px)]  bg-contain max-[920px]:bg-cover  z-0 "></div>
    </>
  );
};

export default ContactPage;
