import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import Accordion from "../../components/atoms/Accordion";
import AddButton from "../../components/atoms/AddButton";
import BackButton from "../../components/atoms/BackButton";
import InputWithLabel from "../../components/atoms/InputWithLabel";
import PrimaryButton from "../../components/atoms/PrimaryButton";
import Select from "../../components/atoms/Select";
import TimeLine from "../../components/atoms/TimeLine";
import FuelForm from "./FuelForm";
import { useUpdateBaselineEstimationMutation } from "./queries";
type Unit = "tCO2/Mwh";

type AnnualEnergyOutputOfProjectInstallationFields = {
  qkj: number;
  efgrid: number;
  unit: Unit;
};

type MaximumEnergySuppliedByAlternativeFields = {
  capmax: number;
  tmax: number;
};

type HistoricEnergySuppliedByPriorPlantFields = {
  qy1: number;
  qy2: number;
  qy3: number;
};

export type FuelFormFields = {
  name: string;
  ef: number;
  fc_pj: number;
  ncv_pj: number;
  ef_co2_ff: number;
  q_bsl: number;
  e_bsl: number;
  e_pj: number;
};

// type BaselineEmissionFactorFields = {
// fuels: FuelFormFields[];
// };
export type ProvidingElectricityFormFields = {
  annualEnergyOutputOfProjectInstallation: AnnualEnergyOutputOfProjectInstallationFields;
  maximumEnergySuppliedByAlternative: MaximumEnergySuppliedByAlternativeFields;
  historicEnergySuppliedByPriorPlant: HistoricEnergySuppliedByPriorPlantFields;
  baselineEmissionFactor: FuelFormFields[];
};

const ProvidingElectricityBaseline = () => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [emissionFactorItems, setEmissionFactorItems] = useState<any[]>([
    {
      title: "Fuel 1",
      content: <FuelForm prefix="baselineEmissionFactor[0]" />,
    },
    {
      title: "Fuel 2",
      content: <FuelForm prefix="baselineEmissionFactor[1]" />,
    },
  ]);

  const formMethods = useForm<ProvidingElectricityFormFields>();
  const addEmissionFactorItem = () => {
    setEmissionFactorItems((prev) => [
      ...prev,
      {
        title: `Fuel ${prev.length + 1}`,
        content: <FuelForm prefix={`baselineEmissionFactor[${prev.length}`} />,
      },
    ]);
  };

  const accordionItems = [
    {
      title: "Annual Energy Output of Project installation",
      content: (
        <div className="flex gap-6">
          <InputWithLabel
            label={
              <p>
                Q<span className="text-xs">KJ</span>
              </p>
            }
            id="qkj"
            {...formMethods.register(
              "annualEnergyOutputOfProjectInstallation.qkj"
            )}
          />
          <InputWithLabel
            label={
              <p>
                EF<span className="text-xs">GRID</span>
              </p>
            }
            id="efgrid"
            {...formMethods.register(
              "annualEnergyOutputOfProjectInstallation.efgrid"
            )}
          />

          <Select
            options={[{ label: "tCO2/Mwh", value: "" }]}
            className="w-40"
            {...formMethods.register(
              "annualEnergyOutputOfProjectInstallation.unit"
            )}
          />
        </div>
      ),
    },
    {
      title: "Maximum energy supplied by alternative",
      content: (
        <div className="flex gap-6">
          <InputWithLabel
            label={
              <p>
                CAP<span className="text-xs">MAX</span>
              </p>
            }
            id="capmax"
            endPlaceholder="MW"
            {...formMethods.register(
              "maximumEnergySuppliedByAlternative.capmax"
            )}
          />
          <InputWithLabel
            label={
              <p>
                T<span className="text-xs">MAX</span>
              </p>
            }
            id="efalt"
            endPlaceholder="hours"
            {...formMethods.register("maximumEnergySuppliedByAlternative.tmax")}
          />
          <div></div>
        </div>
      ),
    },
    {
      title: "Historic energy supplied by prior plant",
      content: (
        <div className="flex gap-6">
          <InputWithLabel
            label={
              <p>
                Q<span className="text-xs">y-1</span>
              </p>
            }
            id="qy1"
            endPlaceholder="MWh"
            {...formMethods.register("historicEnergySuppliedByPriorPlant.qy1")}
          />
          <InputWithLabel
            label={
              <p>
                Q<span className="text-xs">y-2</span>
              </p>
            }
            id="qy2"
            endPlaceholder="MWh"
            {...formMethods.register("historicEnergySuppliedByPriorPlant.qy2")}
          />
          <InputWithLabel
            label={
              <p>
                Q<span className="text-xs">y-3</span>
              </p>
            }
            id="qy3"
            endPlaceholder="MWh"
            {...formMethods.register("historicEnergySuppliedByPriorPlant.qy3")}
          />
        </div>
      ),
    },
    {
      title: "Baseline Emission Factor",
      content: (
        <div className="flex flex-col items-center ">
          <Accordion
            items={emissionFactorItems}
            className="flex-1"
            id="emission-sub"
            name="emission-sub"
          />
          <AddButton onClick={addEmissionFactorItem} />
        </div>
      ),
    },
  ];

  const baselineMutation = useUpdateBaselineEstimationMutation();

  const onSubmit = (data: ProvidingElectricityFormFields) => {
    console.log(data);
    baselineMutation.mutate(data);
    setCurrentStep(currentStep + 1);
  };

  return (
    <FormProvider {...formMethods}>
      <form
        className="flex container mx-auto overflow-hidden"
        onSubmit={formMethods.handleSubmit(onSubmit)}
      >
        <div className="flex w-1/4 flex-col gap-20 ">
          <div className="-ml-4">
            <BackButton label="Return to Dashboard" />
          </div>

          <TimeLine
            items={[
              "Projects output",
              "Maximum alternative supply",
              "Historic supply",
              "Baseline emission factor",
            ]}
            currentStep={currentStep}
          />

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
          items={accordionItems}
          className="flex-1 mt-4"
          id="estimate-accordion"
          name="estimate-accordion"
          openIndex={currentStep}
        />
      </form>
    </FormProvider>
  );
};

export default ProvidingElectricityBaseline;
