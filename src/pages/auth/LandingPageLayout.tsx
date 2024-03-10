interface LayoutPageContainerProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}

const LandingPageLayout: React.FC<LayoutPageContainerProps> = ({
  children,
  title,
  subtitle,
}) => {
  return (
    <>
      <div className=" w-full md:w-1/2 h-full flex flex-col justify-center items-center  flex-grow self-center z-10 pl-10 pt-10 ">
        <div className="max-w-md w-full">
          <h2 className="mb-6 text-4xl font-bold text-gray-700">{title}</h2>
          <p className="mb-8 text-sm text-gray-600">{subtitle}</p>
          {children}
        </div>
      </div>
      <div className={`w-1/2 max-[846px]:hidden`} />

      <div className="max-[846px]:hidden absolute bg-right z-0  inset-x-0  bottom-0 right-0  max-[1512px]:bg-[url(/carbon-bg.png)]  bg-[url(/carbon-bg-full.png)] bg-no-repeat  h-[calc(100%-100px)]  bg-contain max-[920px]:bg-cover  "></div>
    </>
  );
};

export default LandingPageLayout;
