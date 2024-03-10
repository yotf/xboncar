import InputWithLabel from "../../components/atoms/InputWithLabel";

const FuelForm = () => {
  return (
    <div className="grid grid-cols-4 gap-6">
      <InputWithLabel label={<p>Name</p>} id="name" placeholder="Fuel 1" />
      <InputWithLabel
        label={
          <p>
            NCV<span className="text-xs">PJ</span>
          </p>
        }
        id="ncv_pj"
        endPlaceholder="TJ/kg or m3"
      />

      <InputWithLabel
        label={
          <p>
            FC<span className="text-xs">PJ</span>
          </p>
        }
        id="fc_pj"
        endPlaceholder="kg or m3"
      />

      <InputWithLabel
        label={
          <p>
            EF<span className="text-xs">CO2</span>
          </p>
        }
        id="ef_co2_"
        endPlaceholder="tCO2/kJ"
      />
    </div>
  );
};

export default FuelForm;
