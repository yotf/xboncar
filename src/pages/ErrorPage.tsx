import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const navigate = useNavigate();
  const handleGoHome = () => {
    navigate("/");
  };
  return (
    <div className="flex items-center justify-center w-screen h-screen bg-gray-100">
      <div className="container">
        <div className="bg-white rounded-lg shadow-xl md:flex">
          <div className="bg-carbonx-green rounded-tl-lg rounded-bl-lg md:w-1/2">
            <div className="text-center p-10 md:text-left">
              <h1 className="font-bold text-black text-9xl">404</h1>
            </div>
          </div>
          <div className="max-w-md w-full space-y-8 p-10 md:w-1/2">
            <div className="text-center md:text-left">
              <h2 className="mt-6 text-4xl font-extrabold text-gray-900">
                Something's missing.
              </h2>
              <p className="mt-2 text-base text-gray-500">
                Sorry, we can't find that page. You'll find lots to explore on
                the home page.
              </p>
              <button
                className="mt-6 bg-carbonx-green text-black rounded-md px-4 py-2"
                onClick={handleGoHome}
              >
                Back to Home
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
