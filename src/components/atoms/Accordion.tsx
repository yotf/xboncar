import React from "react";

export type AccordionItem = {
  title: string;
  content: React.ReactNode;
};

type AccordionProps = {
  items: AccordionItem[];
  className?: string;
  id: string;
  name: string;
};

const Accordion: React.FC<AccordionProps> = ({
  items,
  className,
  id,
  name,
}) => {
  return (
    <div className={className}>
      {items.map((item, index) => (
        <div key={index} className="collapse collapse-arrow rounded-none">
          <input
            type="radio"
            name={name}
            id={`${id}-accordion-${index}`}
            className="peer"
            defaultChecked={index === 0}
          />
          <label
            htmlFor={`${id}-accordion-${index}`}
            className="collapse-title text-xl font-medium border-b-2 border-t-2 mt-2 border-gray-300  shadow-md "
          >
            {item.title}
          </label>
          <div className="collapse-content peer-checked:block hidden bg-carbonx-green  bg-opacity-20 !p-9 ">
            {item.content}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Accordion;
