import { useFormContext } from "react-hook-form";
import InputWithLabel from "../../components/atoms/InputWithLabel";

type FuelFormProps = {
  prefix: string;
};

const FuelForm: React.FC<FuelFormProps> = ({prefix}) => {
  const { register } = useFormContext();
  return (
    <div className="grid grid-cols-3 gap-6">
      <InputWithLabel label={<p>Name</p>} id="name" placeholder="Fuel 1" 
      {...register(`${prefix}.name`)} />
      <InputWithLabel
        label={
          <p>
            NCV<span className=" text-xs">BSL</span>
          </p>
        }
        id="ncv_bsl"
        endPlaceholder="tCO2/MWh"
        {...register(`${prefix}.ncv_bsl`)}
      />
      <InputWithLabel
        label={
          <p>
            FC<span className="text-xs">PJ</span>
          </p>
        }
        id="fc_pj"
        endPlaceholder="kg or m3"
        {...register(`${prefix}.fc_pj`)}
      />
      <InputWithLabel
        label={
          <p>
            NCV<span className="text-xs">PJ</span>
          </p>
        }
        id="ncv_pj"
        endPlaceholder="TJ/kg or m3"
        {...register(`${prefix}.ncv_pj`)}
      />
      <InputWithLabel
        label={
          <p>
            EF<span className="text-xs">CO2,FF</span>
          </p>
        }
        id="ef_co2_ff"
        endPlaceholder="tCO2/kg"
        {...register(`${prefix}.ef_co2_ff`)}
      />
      <InputWithLabel
        label={
          <p>
            Q<span className="text-xs">BSL</span>
          </p>
        }
        id="q_bsl"
        endPlaceholder="MWh"
        {...register(`${prefix}.q_bsl`)}
      />
      <InputWithLabel
        label={
          <p>
            ε<span className="text-xs">BSL</span>
          </p>
        }
        id="e_bsl"
        placeholder=""
        {...register(`${prefix}.e_bsl`)}
      />
      <InputWithLabel
        label={
          <p>
            ε<span className="text-xs">PJ</span>
          </p>
        }
        id="e_pj"
        placeholder=""
        {...register(`${prefix}.e_pj`)}
      />
    </div>
  );
};

export default FuelForm;
