import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import CustomInput from "../../components/atoms/CustomInput";
import PrimaryButton from "../../components/atoms/PrimaryButton";
import TextArea from "../../components/atoms/TextArea";

const AboutYourProject = () => {
  const schema = z.object({
    name: z.string().min(2),
    description: z.string(),
  });
  type FormFields = z.infer<typeof schema>;

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormFields>({ resolver: zodResolver(schema) });

  const onSubmit = (data: FormFields) => {
    console.log(data);
    toast.success("Project created successfully");
    navigate("/projects/0/dashboard");

    //TODO: Send data to server, implement query mutation
  };
  return (
    <>
      <button
        onClick={() => navigate(-1)}
        className="text-green-600 hover:text-green-800 transition duration-300 ease-in-out  font-semibold self-start m-5 -mr-5"
      >
        ‹ Go Back
      </button>
      <div className="container mx-auto my-8 max-w-2xl p-8 pt-4 rounded ">
        <h1 className="text-3xl font-bold mb-20 text-center">
          About your Project
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className=" space-y-8 ">
          <CustomInput
            {...register("name")}
            type="text"
            placeholder="Name*"
            error={errors.name}
            id="name"
          />
          <TextArea
            {...register("description")}
            placeholder="Description"
            error={errors.description}
            id="description"
            textareaClassName="h-40"
          />
          <PrimaryButton type="submit" className="w-full ">
            Validate
          </PrimaryButton>
        </form>
      </div>
    </>
  );
};

export default AboutYourProject;
