type TimeLineProps = {
  items: string[];
  currentStep: number;
};

const TimeLine: React.FC<TimeLineProps> = ({ items, currentStep }) => {
  return (
    <div className="flex flex-col items-start">
      {items.map((item, index) => {
        const isCurrent = index === currentStep;
        const isCompleted = index < currentStep;

        const isLast = index === items.length - 1;
        return (
          <div key={index} className="flex items-center mb-4 ">
            <div
              className={`relative  ${isLast ? " after:hidden" : ""} ${
                isCompleted ? "after:bg-carbonx-green" : "after:bg-gray-200"
              } after:absolute after:top-8  after:transition-all after:h-[18px] after:start-[16px] after:w-[2px] after:-translate-x-[0.5px]  `}
            >
              <div
                className={`w-8 h-8 rounded-full transition-all border-2 flex items-center justify-center  ${
                  isCompleted || isCurrent
                    ? ` border-carbonx-green border-[7px]`
                    : `border-gray-200 border-[3px]`
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

            <div
              className={`ml-3  font text-lg  overflow-ellipsis whitespace-nowrap`}
            >
              {item}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TimeLine;
