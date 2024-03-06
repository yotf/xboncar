type TimeLineProps = {
  items: string[];
  currentStep: number;
};

// const TimeLine: React.FC<TimeLineProps> = ({ items, currentStep }) => {
// return (
// <>
//     <ul className="timeline timeline-vertical">
//     {items.map((item, index) => (
//         <li>
//         {index !== 0 ? (
//             <hr className={`${index < currentStep ? "bg-primary" : ""}`} />
//         ) : null}

//         <div className="timeline-middle">
//             <svg
//             xmlns="http://www.w3.org/2000/svg"
//             viewBox="0 0 20 20"
//             fill="currentColor"
//             className={`w-5 h-5 ${
//                 index <= currentStep ? "text-primary" : "text-gray-300"
//             }`}
//             >
//             <path
//                 fillRule="evenodd"
//                 d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
//                 clipRule="evenodd"
//             />
//             </svg>
//         </div>
//         <div className="timeline-end">{item}</div>
//         {index === items.length - 1 ? null : (
//             <hr className={`${index < currentStep ? "bg-primary" : ""}`} />
//         )}
//         </li>
//     ))}
//     </ul>
// </>
// );
// };

const TimeLine: React.FC<TimeLineProps> = ({ items, currentStep }) => {
  return (
    <div className="flex flex-col items-start">
      {items.map((item, index) => {
        const isCompleted = index <= currentStep;

        const isLast = index === items.length - 1;
        return (
          <div key={index} className="flex items-center mb-4 ">
            <div
              className={`relative  ${isLast ? " after:hidden" : ""} ${
                index < currentStep
                  ? "after:bg-carbonx-green"
                  : "after:bg-gray-200"
              } after:absolute after:top-8  after:h-[18px] after:start-[16px] after:w-[2px] after:-translate-x-[0.5px]  `}
            >
              <div
                className={`w-8 h-8 rounded-full border-2 flex items-center justify-center  ${
                  isCompleted
                    ? ` border-carbonx-green border-[7px]`
                    : `border-gray-200 border-[3px]`
                } `}
              >
                {/* {isCompleted && (
                <div className="w-3 h-3 rounded-full bg-carbonx-green"></div>
            )} */}
              </div>
            </div>

            <div className={`ml-3  font text-lg  `}>{item}</div>
          </div>
        );
      })}
    </div>
  );
};

export default TimeLine;
