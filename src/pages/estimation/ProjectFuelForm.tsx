import { useFormContext } from "react-hook-form";
import InputWithLabel from "../../components/atoms/InputWithLabel";

export type ProjectFuelFormFields = {
  name: string;
  ncv_pj: number;
  fc_pj: number;
  ef_co2: number;
};

type ProjectFuelFormProps = {
  prefix: string;
};

const ProjectFuelForm: React.FC<ProjectFuelFormProps> = ({ prefix }) => {
  const { register } = useFormContext();
  return (
    <div className="grid grid-cols-4 gap-6">
      <InputWithLabel
        label={<p>Name</p>}
        id="name"
        placeholder="Fuel 1"
        type="number"
        {...register(`${prefix}.name`)}
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
        {...register(`${prefix}.ncv_pj`)}
      />

      <InputWithLabel
        label={
          <p>
            FC<span className="text-xs">PJ</span>
          </p>
        }
        id="fc_pj"
        type="number"
        endPlaceholder="kg or m3"
        {...register(`${prefix}.fc_pj`)}
      />

      <InputWithLabel
        label={
          <p>
            EF<span className="text-xs">CO2</span>
          </p>
        }
        id="ef_co2"
        type="number"
        endPlaceholder="tCO2/kJ"
        {...register(`${prefix}.ef_co2`)}
      />
    </div>
  );
};

export default ProjectFuelForm;
