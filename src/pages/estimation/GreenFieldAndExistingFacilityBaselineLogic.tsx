import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import Accordion from "../../components/atoms/Accordion";
import AddButton from "../../components/atoms/AddButton";
import BackButton from "../../components/atoms/BackButton";
import PrimaryButton from "../../components/atoms/PrimaryButton";
import FuelForm from "./FuelForm";
import { FuelFormFields } from "./ProvidingElectricityBaseline";
import { useUpdateBaselineEstimationMutation } from "./queries";

type BaselineProps = { title: string };

export type BaselineCommonFormFields = {
  baselineFossilFuels: FuelFormFields[];
};

const BaselineCommon: React.FC<BaselineProps> = ({ title }) => {
  const formMethods = useForm<BaselineCommonFormFields>();
  const [emissionFactorItems, setEmissionFactorItems] = useState<any[]>([
    {
      title: "Fuel 1",
      content: <FuelForm prefix="baselineFossilFuels[0]" />,
    },
    {
      title: "Fuel 2",
      content: <FuelForm prefix="baselineFossilFuels[1]" />,
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

  return (
    <FormProvider {...formMethods}>
      <form
        className="flex px-4 mx-auto overflow-hidden "
        onSubmit={formMethods.handleSubmit(onSubmit)}
      >
        <div className="flex w-1/6 flex-col gap-20 ">
          <div className="-ml-4">
            <BackButton label="Return to Dashboard" />
          </div>

          <PrimaryButton
            className={` 
               w-40 mt-auto ml-8`}
            type="submit"
            disabled={baselineMutation.isPending}
          >
            {baselineMutation.isPending ? "Updating..." : "Validate"}
          </PrimaryButton>
        </div>

        <Accordion
          className="mx-8 mt-4 flex-1"
          items={accordionItems}
          id="existing-facility"
          name="existing-facility"
        />
      </form>
    </FormProvider>
  );
};

export default BaselineCommon;
