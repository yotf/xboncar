type TimeLineItem = {
  name: string;
  completed: boolean;
};

type TimeLineProps = {
  items: TimeLineItem[];
  currentStep: number;
  onClickItem: (index: number) => void;
};

const TimeLineHorizontal: React.FC<TimeLineProps> = ({
  items,
  currentStep,
  onClickItem,
}) => {
  return (
    <ul className="timeline timeline-horizontal ">
      {items.map((item, index) => {
        const isCurrent = index === currentStep;
        const isCompleted = item.completed;
        return (
          <li className="" onClick={() => onClickItem(index)}>
            {index !== 0 ? (
              <hr
                className={`${
                  isCompleted || isCurrent
                    ? "bg-primary transition-colors duration-500 "
                    : ""
                }`}
              />
            ) : null}
            <div
              className={` ${
                isCurrent || isCompleted
                  ? "text-gray-600 font-semibold"
                  : "text-gray-300"
              } timeline-start w-[300px] text-center pb-4`}
            >
              {item.name}
            </div>

            <div className="timeline-middle">
              <div
                className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-500 ${
                  isCurrent ? "scale-125" : ""
                } ${
                  isCompleted || isCurrent
                    ? ` border-carbonx-green border-[7px]`
                    : `border-gray-300 border-[3px]`
                } `}
              >
                {isCompleted && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="17"
                    height="12"
                    viewBox="0 0 17 12"
                    fill="none"
                  >
                    <path
                      d="M14.2151 0.0883255C14.1604 0.106664 14.055 0.147009 13.9807 0.180018C13.9065 0.216695 12.0198 1.95518 9.78933 4.04577L5.73855 7.84918L4.18386 6.3931C3.12136 5.39916 2.57839 4.91502 2.4573 4.85634C2.19167 4.73163 1.76589 4.71696 1.4612 4.82699C1.26199 4.89668 1.16042 4.9737 0.754173 5.35148C0.191673 5.88329 0.101829 6.02633 0.0979226 6.43711C0.0901101 6.96526 -0.0544212 6.80022 2.74636 9.44096C4.44948 11.0474 5.30105 11.8213 5.40652 11.869C5.60574 11.957 5.87136 11.957 6.07058 11.869C6.17995 11.8213 7.76589 10.3542 11.2307 7.09363C16.8167 1.84149 16.387 2.28528 16.3792 1.74246C16.3753 1.33168 16.2854 1.18864 15.7229 0.656819C15.3245 0.282714 15.2151 0.202024 15.0237 0.136005C14.7932 0.055316 14.4143 0.0333099 14.2151 0.0883255Z"
                      fill="#C1F48F"
                    />
                  </svg>
                )}
              </div>
            </div>

            {index === items.length - 1 ? null : (
              <hr
                className={`${
                  isCompleted &&
                  (items[index + 1]?.completed || index + 1 === currentStep)
                    ? "bg-primary transition-colors duration-500"
                    : ""
                }`}
              />
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default TimeLineHorizontal;
