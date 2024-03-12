import { useEffect, useState } from "react";
import CustomInput from "../../components/atoms/CustomInput";
import SectionCard from "./SectionCard";

type CarbonPriceSectionProps = {
  onPriceSelected: (price: number) => void;
};

const CarbonPriceSection: React.FC<CarbonPriceSectionProps> = ({
  onPriceSelected,
}) => {
  const prices = [10, 20, 50];

  const [selectedPrice, setSelectedPrice] = useState<number>();

  useEffect(() => {
    if (prices.length > 0) {
      setSelectedPrice(prices[0]);
      onPriceSelected(prices[0]);
    }
  }, []);
  return (
    <SectionCard title="Carbon Price" className="px-10">
      <div className="grid grid-cols-2 gap-6 gap-x-12 gap-4 items-center justify-items-center w-fit  ">
        {prices.map((price, index) => (
          <div
            onClick={() => {
              setSelectedPrice(price);
              onPriceSelected(price);
            }}
            key={index}
            className={`p-6 border-2 cursor-pointer hover:bg-carbonx-light-green rounded-lg  text-xl w- w-fit ${
              price === selectedPrice ? "bg-carbonx-green " : "border-gray-300"
            }`}
          >
            ${price}
          </div>
        ))}

        <CustomInput
          type="number"
          className="w-[86px]  "
          placeholder="$__ "
          inputClassName=" h-[80px] mt-0 border-2 text-center"
        />
      </div>
    </SectionCard>
  );
};

export default CarbonPriceSection;
