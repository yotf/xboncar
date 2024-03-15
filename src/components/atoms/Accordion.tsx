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
  openIndex?: number;
};

const Accordion: React.FC<AccordionProps> = ({
  items,
  className,
  id,
  name,
  openIndex,
}) => {
  return (
    <div className={`w-[100%] ${className || ""}`}>
      {items.map((item, index) => (
        <div key={index} className="collapse collapse-arrow rounded-none ">
          <input
            type="radio"
            name={name}
            id={`${id}-accordion-${index}`}
            className="peer"
            defaultChecked={index === 0}
            {...(openIndex !== undefined &&
              openIndex <= items.length - 1 && {
                checked: index === openIndex,
              })}
            // {...(openIndex !== undefined &&
            //   {
            //     // onClick: (e) => e.preventDefault(),
            //     // onChange: (e) => e.preventDefault(),
            //     // onSelect: (e) => e.preventDefault(),
            //   })}

            //checked={openIndex !== undefined ? index === openIndex : undefined}
            //checked={index === 2}
            //   onChange={() => setOpenIndex(index)}
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
