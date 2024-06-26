import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import Accordion from "../../components/atoms/Accordion";
import AddButton from "../../components/atoms/AddButton";
import BackButton from "../../components/atoms/BackButton";
import InputWithLabel from "../../components/atoms/InputWithLabel";
import PrimaryButton from "../../components/atoms/PrimaryButton";
import Select from "../../components/atoms/Select";
import TimeLine from "../../components/atoms/TimeLine";
import FuelForm, { FuelFormFields } from "./FuelForm";
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

// type BaselineEmissionFactorFields = {
// fuels: FuelFormFields[];
// };
export type ProvidingElectricityFormFields = {
  annualEnergyOutputOfProjectInstallation: AnnualEnergyOutputOfProjectInstallationFields;
  maximumEnergySuppliedByAlternative: MaximumEnergySuppliedByAlternativeFields;
  historicEnergySuppliedByPriorPlant: HistoricEnergySuppliedByPriorPlantFields;
  baselineEmissionFactor: FuelFormFields[];
};
const tabs: (keyof ProvidingElectricityFormFields)[] = [
  "annualEnergyOutputOfProjectInstallation",
  "maximumEnergySuppliedByAlternative",
  "historicEnergySuppliedByPriorPlant",
  "baselineEmissionFactor",
];

export const numberRequiredSchema = z.number({
  errorMap: () => ({ message: "Number Required" }),
});

const schema = z.object({
  annualEnergyOutputOfProjectInstallation: z.object({
    qkj: numberRequiredSchema,
    efgrid: numberRequiredSchema,
  }),
  maximumEnergySuppliedByAlternative: z.object({
    capmax: numberRequiredSchema,
    tmax: numberRequiredSchema,
  }),
  historicEnergySuppliedByPriorPlant: z.object({
    qy1: numberRequiredSchema,
    qy2: numberRequiredSchema,
    qy3: numberRequiredSchema,
  }),
  baselineEmissionFactor: z.array(
    z.object({
      name: z.string(),
      ncv_bsl: numberRequiredSchema,
      fc_pj: numberRequiredSchema,
      ncv_pj: numberRequiredSchema,
      ef_co2_ff: numberRequiredSchema,
      q_bsl: numberRequiredSchema,
      e_bsl: numberRequiredSchema,
      e_pj: numberRequiredSchema,
    })
  ),
});
const defaultValues: ProvidingElectricityFormFields = {
  annualEnergyOutputOfProjectInstallation: {
    qkj: 0,
    efgrid: 0,
    unit: "tCO2/Mwh",
  },
  maximumEnergySuppliedByAlternative: {
    capmax: 0,
    tmax: 0,
  },
  historicEnergySuppliedByPriorPlant: {
    qy1: 0,
    qy2: 0,
    qy3: 0,
  },
  baselineEmissionFactor: [
    {
      name: "",
      ncv_bsl: 0,
      fc_pj: 0,
      ncv_pj: 0,
      ef_co2_ff: 0,
      q_bsl: 0,
      e_bsl: 0,
      e_pj: 0,
    },
    {
      name: "",
      ncv_bsl: 0,
      fc_pj: 0,
      ncv_pj: 0,
      ef_co2_ff: 0,
      q_bsl: 0,
      e_bsl: 0,
      e_pj: 0,
    },
  ],
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
  // const { register, handleSubmit, formState: { errors } } = useForm({
  //   defaultValues: isLoading ? {} : formData //if we need pre-filled data
  // });

  const formMethods = useForm<ProvidingElectricityFormFields>({
    defaultValues,
    resolver: zodResolver(schema),
    mode: "onSubmit",
  });

  const {
    formState: { errors },
  } = formMethods;

  const addEmissionFactorItem = () => {
    setEmissionFactorItems((prev) => [
      ...prev,
      {
        title: `Fuel ${prev.length + 1}`,
        content: <FuelForm prefix={`baselineEmissionFactor[${prev.length}]`} />,
      },
    ]);
  };

  useEffect(() => {
    console.log(formMethods.formState.errors);
  }, [formMethods.formState.errors]);

  const accordionItems = [
    {
      title: "Annual Energy Output of Project installation",
      content: (
        <div className="flex gap-6">
          <InputWithLabel
            type="number"
            label={
              <p>
                Q<span className="text-xs">KJ</span>
              </p>
            }
            id="qkj"
            {...formMethods.register(
              "annualEnergyOutputOfProjectInstallation.qkj",
              { valueAsNumber: true }
            )}
            error={errors.annualEnergyOutputOfProjectInstallation?.qkj}
          />
          <InputWithLabel
            type="number"
            label={
              <p>
                EF<span className="text-xs">GRID</span>
              </p>
            }
            id="efgrid"
            {...formMethods.register(
              "annualEnergyOutputOfProjectInstallation.efgrid",
              { valueAsNumber: true }
            )}
            error={errors.annualEnergyOutputOfProjectInstallation?.efgrid}
          />

          <Select
            options={[{ label: "tCO2/Mwh", value: "tCO2/Mwh" }]}
            className="w-40"
            {...formMethods.register(
              "annualEnergyOutputOfProjectInstallation.unit",
              { valueAsNumber: true }
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
            type="number"
            label={
              <p>
                CAP<span className="text-xs">MAX</span>
              </p>
            }
            id="capmax"
            endPlaceholder="MW"
            {...formMethods.register(
              "maximumEnergySuppliedByAlternative.capmax",
              { valueAsNumber: true }
            )}
            error={errors.maximumEnergySuppliedByAlternative?.capmax}
          />
          <InputWithLabel
            type="number"
            label={
              <p>
                T<span className="text-xs">MAX</span>
              </p>
            }
            id="efalt"
            endPlaceholder="hours"
            {...formMethods.register(
              "maximumEnergySuppliedByAlternative.tmax",
              { valueAsNumber: true }
            )}
          />
        </div>
      ),
    },
    {
      title: "Historic energy supplied by prior plant",
      content: (
        <div className="flex gap-6">
          <InputWithLabel
            type="number"
            label={
              <p>
                Q<span className="text-xs">y-1</span>
              </p>
            }
            id="qy1"
            endPlaceholder="MWh"
            {...formMethods.register("historicEnergySuppliedByPriorPlant.qy1", {
              valueAsNumber: true,
            })}
            error={errors.historicEnergySuppliedByPriorPlant?.qy1}
          />
          <InputWithLabel
            label={
              <p>
                Q<span className="text-xs">y-2</span>
              </p>
            }
            id="qy2"
            type="number"
            endPlaceholder="MWh"
            {...formMethods.register("historicEnergySuppliedByPriorPlant.qy2", {
              valueAsNumber: true,
            })}
            error={errors.historicEnergySuppliedByPriorPlant?.qy2}
          />
          <InputWithLabel
            label={
              <p>
                Q<span className="text-xs">y-3</span>
              </p>
            }
            id="qy3"
            endPlaceholder="MWh"
            type="number"
            {...formMethods.register("historicEnergySuppliedByPriorPlant.qy3", {
              valueAsNumber: true,
            })}
            error={errors.historicEnergySuppliedByPriorPlant?.qy3}
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
    baselineMutation.mutate(data); //uncomment this when adding the Save button
  };
  const navigate = useNavigate();

  const validateAndProceed = async () => {
    // Check if the currentStep index exists in the steps array to avoid indexing errors
    // if (currentStep < tabs.length) {
    const isValid = await formMethods.trigger();

    if (isValid) {
      navigate(-1);
      toast.success("Data is valid");
      // If the current step is valid, proceed to the next step or handle form submission
      // if (currentStep < tabs.length - 1) {
      //   setCurrentStep(currentStep + 1); // Move to the next step
      //     } else {
      //       // This is the final step, proceed with form submission
      //       //formMethods.handleSubmit(onSubmit)(); TODO: Uncomment this when adding the Save button
      //     }
      //   }
      // } else {
      //   console.warn("Step index out of bounds");
      // }
    } else {
      //const errorFields = Object.keys(formMethods.formState.errors);
      toast.error(`Please fill in all the required fields`);
    }
  };

  // const isPartValid = () => {
  //   return (
  //     formMethods.formState.errors[tabs[openTab]] === undefined &&
  //     !formMethods.formState.touchedFields[tabs[openTab]]
  //   );
  // };

  return (
    <FormProvider {...formMethods}>
      <form
        className="flex w-full px-4 md:px-8 lg:px-16 mx-auto flex-col lg:flex-row"
        // onSubmit={formMethods.handleSubmit((data, event) =>
        //   event?.preventDefault()
        // )}
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
            onClick={validateAndProceed}
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
        />
      </form>
    </FormProvider>
  );
};

export default ProvidingElectricityBaseline;
