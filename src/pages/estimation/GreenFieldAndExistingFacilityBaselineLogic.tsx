import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import Accordion from "../../components/atoms/Accordion";
import AddButton from "../../components/atoms/AddButton";
import BackButton from "../../components/atoms/BackButton";
import PrimaryButton from "../../components/atoms/PrimaryButton";
import FuelForm, { FuelFormFields } from "./FuelForm";

import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { numberRequiredSchema } from "./ProvidingElectricityBaseline";
import { useUpdateBaselineEstimationMutation } from "./queries";

type BaselineProps = { title: string };

export type BaselineCommonFormFields = {
  baselineFossilFuels: FuelFormFields[];
};

const schema = z.object({
  baselineFossilFuels: z.array(
    z.object({
      name: z.string(),
      fc_pj: numberRequiredSchema,
      ncv_pj: numberRequiredSchema,
      ef_co2_ff: numberRequiredSchema,
      q_bsl: numberRequiredSchema,
      e_bsl: numberRequiredSchema,
      ncv_bsl: numberRequiredSchema,
      e_pj: numberRequiredSchema,
    })
  ),
});

const defaultValues: BaselineCommonFormFields = {
  baselineFossilFuels: [
    {
      name: "",
      fc_pj: 0,
      ncv_pj: 0,
      ef_co2_ff: 0,
      q_bsl: 0,
      e_bsl: 0,
      ncv_bsl: 0,
      e_pj: 0,
    },
  ],
};

const BaselineCommon: React.FC<BaselineProps> = ({ title }) => {
  const formMethods = useForm<BaselineCommonFormFields>({
    defaultValues,
    resolver: zodResolver(schema),
    mode: "onSubmit",
  });
  const [emissionFactorItems, setEmissionFactorItems] = useState<any[]>([
    {
      title: "Fuel 1",
      content: <FuelForm prefix="baselineFossilFuels[0]" className="" />,
    },
    {
      title: "Fuel 2",
      content: <FuelForm prefix="baselineFossilFuels[1]" className="" />,
    },
  ]);

  const addEmissionFactorItem = () => {
    setEmissionFactorItems((prev) => [
      ...prev,
      {
        title: `Fuel ${prev.length + 1}`,
        content: <FuelForm prefix={`baselineFossilFuels[${prev.length}]`} />,
      },
    ]);
  };

  const accordionItems = [
    {
      title: title,
      content: (
        <div className="flex flex-col items-center">
          <Accordion items={emissionFactorItems} id="fuel" name="fuel" />{" "}
          <AddButton onClick={addEmissionFactorItem} />
        </div>
      ),
    },
  ];

  const baselineMutation = useUpdateBaselineEstimationMutation();

  const onSubmit = (data: BaselineCommonFormFields) => {
    console.log(data);
    baselineMutation.mutate(data);
  };

  const navigate = useNavigate();
  const validateAndProceed = async () => {
    const isValid = await formMethods.trigger();

    if (isValid) {
      navigate(-1);
      toast.success("Data is valid");
    } else {
      toast.error(`Please fill in all the required fields`);
    }
  };

  return (
    <FormProvider {...formMethods}>
      <form
        className="flex w-full px-4 md:px-8 lg:px-16 mx-auto flex-col lg:flex-row"
        //  onSubmit={formMethods.handleSubmit(onSubmit)}
      >
        <div className="flex w-1/6 flex-col gap-20 ">
          <div className="-ml-4">
            <BackButton label="Return to Dashboard" />
          </div>

          <PrimaryButton
            className={` 
               w-40 mt-auto ml-8`}
            disabled={baselineMutation.isPending}
            onClick={validateAndProceed}
          >
            {baselineMutation.isPending ? "Updating..." : "Validate"}
          </PrimaryButton>
        </div>

        <Accordion
          className="mx-8 mt-4 flex-1 "
          items={accordionItems}
          id="existing-facility"
          name="existing-facility"
        />
      </form>
    </FormProvider>
  );
};

export default BaselineCommon;
