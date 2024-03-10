import InputWithLabel from "../../components/atoms/InputWithLabel";

const FuelForm = () => {
  return (
    <div className="grid grid-cols-3 gap-6">
      <InputWithLabel label={<p>Name</p>} id="name" placeholder="Fuel 1" />
      <InputWithLabel
        label={
          <p>
            NCV<span className=" text-xs">BSL</span>
          </p>
        }
        id="ef"
        endPlaceholder="tCO2/MWh"
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
            NCV<span className="text-xs">PJ</span>
          </p>
        }
        id="ncv_pj"
        endPlaceholder="TJ/kg or m3"
      />
      <InputWithLabel
        label={
          <p>
            EF<span className="text-xs">CO2,FF</span>
          </p>
        }
        id="ef_co2_ff"
        endPlaceholder="tCO2/kg"
      />
      <InputWithLabel
        label={
          <p>
            Q<span className="text-xs">BSL</span>
          </p>
        }
        id="q_bsl"
        endPlaceholder="MWh"
      />
      <InputWithLabel
        label={
          <p>
            ε<span className="text-xs">BSL</span>
          </p>
        }
        id="e_bsl"
        placeholder=""
      />
      <InputWithLabel
        label={
          <p>
            ε<span className="text-xs">PJ</span>
          </p>
        }
        id="e_pj"
        placeholder=""
      />
    </div>
  );
};

export default FuelForm;
