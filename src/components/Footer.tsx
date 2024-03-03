const Footer = () => {
  return (
    <div className="mt-6 grid grid-cols-3 gap-3 justify-between w-72  m-auto  mb-10 z-10  ">
      <div className="text-sm text-center">
        <a href="#" className="font-medium text-gray-600 hover:text-gray-500">
          Terms
        </a>
      </div>
      <div className="text-sm text-center">
        <a href="#" className="font-medium text-gray-600 hover:text-gray-500">
          Privacy
        </a>
      </div>
      <div className="text-sm text-center">
        <a href="#" className="font-medium text-gray-600 hover:text-gray-500">
          Cookies
        </a>
      </div>
    </div>
  );
};

export default Footer;
