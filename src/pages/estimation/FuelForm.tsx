import { get, useFormContext } from "react-hook-form";
import InputWithLabel from "../../components/atoms/InputWithLabel";

type FuelFormProps = {
  prefix: string;
  className?: string;
};
export type FuelFormFields = {
  name: string;
  fc_pj: number;
  ncv_pj: number;
  ef_co2_ff: number;
  q_bsl: number;
  e_bsl: number;
  ncv_bsl: number;
  e_pj: number;
};

const FuelForm: React.FC<FuelFormProps> = ({ prefix, className }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const error = get(errors, prefix);
 
  return (
    <div className={`grid grid-cols-3 gap-6 ${className ?? ""} `}>
      <InputWithLabel
        label={<p>Name</p>}
        id="name"
        placeholder="Fuel 1"
        defaultValue={""}
        {...register(`${prefix}.name`)}
      />
      <InputWithLabel
        label={
          <p>
            NCV<span className=" text-xs">BSL</span>
          </p>
        }
        id="ncv_bsl"
        type="number"
        defaultValue={0}
        endPlaceholder="tCO2/MWh"
        {...register(`${prefix}.ncv_bsl`, { valueAsNumber: true })}
        error={error?.ncv_bsl}
        // error={}
      />
      <InputWithLabel
        label={
          <p>
            FC<span className="text-xs">PJ</span>
          </p>
        }
        id="fc_pj"
        endPlaceholder="kg or m3"
        defaultValue={0}
        type="number"
        {...register(`${prefix}.fc_pj`, { valueAsNumber: true })}
        error={error?.fc_pj}
      />
      <InputWithLabel
        label={
          <p>
            NCV<span className="text-xs">PJ</span>
          </p>
        }
        id="ncv_pj"
        type="number"
        endPlaceholder="TJ/kg or m3"
        defaultValue={0}
        {...register(`${prefix}.ncv_pj`, { valueAsNumber: true })}
        error={error?.ncv_pj}
      />
      <InputWithLabel
        label={
          <p>
            EF<span className="text-xs">CO2,FF</span>
          </p>
        }
        id="ef_co2_ff"
        type="number"
        endPlaceholder="tCO2/kg"
        defaultValue={0}
        {...register(`${prefix}.ef_co2_ff`, { valueAsNumber: true })}
        error={error?.ef_co2_ff}
      />
      <InputWithLabel
        label={
          <p>
            Q<span className="text-xs">BSL</span>
          </p>
        }
        id="q_bsl"
        type="number"
        endPlaceholder="MWh"
        defaultValue={0}
        {...register(`${prefix}.q_bsl`, { valueAsNumber: true })}
        error={error?.q_bsl}
      />
      <InputWithLabel
        label={
          <p>
            ε<span className="text-xs">BSL</span>
          </p>
        }
        id="e_bsl"
        type="number"
        defaultValue={0}
        {...register(`${prefix}.e_bsl`, { valueAsNumber: true })}
        error={error?.e_bsl}
      />
      <InputWithLabel
        label={
          <p>
            ε<span className="text-xs">PJ</span>
          </p>
        }
        id="e_pj"
        type="number"
        defaultValue={0}
        {...register(`${prefix}.e_pj`, { valueAsNumber: true })}
        error={error?.e_pj}
      />
    </div>
  );
};

export default FuelForm;
