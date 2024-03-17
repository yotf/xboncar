import { PencilSquareIcon } from "@heroicons/react/24/outline";

const ProfilePage = () => {
  const firstName = "John";
  const lastName = "Doe";
  const organization = "CarbonX";
  const phoneNumber = "123-456-7890";
  const email = "john.doe@example.com";

  return (
    <div className="flex flex-col mx-auto gap-10 mt-6 ">
      <h2 className="text-4xl z-50  mx-10 font-semibold text-center text-gray-700">
        Profile
      </h2>
      <div className="gap-10 z-50 mt-[10%]">
        <div className=" px-6 py-6   bg-white shadow-md rounded-lg ">
          <div className="flex justify-between ">
            <div className="font-bold text-xl mb-2 text-center">
              {firstName} {lastName}
            </div>
            <div className="tooltip  tooltip-secondary" data-tip="Edit Profile">
              <PencilSquareIcon className="w-6 h-6 text-gray-600 cursor-pointer hover:scale-105 hover:text-gray-700" />
            </div>
          </div>
          <div className="space-y-4 border-t-2 mt-6 pt-4 ">
            <p className="text-gray-700  text-lg">
              Organization:{" "}
              <span className="text-gray-900  font-semibold">
                {organization}
              </span>
            </p>
            <p className="text-gray-700 text-lg">
              Phone Number:{" "}
              <span className="text-gray-900 font-semibold">{phoneNumber}</span>
            </p>
            <p className="text-gray-700 text-lg">
              Email:{" "}
              <span className="text-gray-900 font-semibold">{email}</span>
            </p>
          </div>
        </div>
      </div>
      <div className="max-[846px]:hidden absolute bg-right z-0  inset-x-0  bottom-0 right-0  max-[1512px]:bg-[url(/carbon-bg.png)]  bg-[url(/carbon-bg-full.png)] bg-no-repeat  h-[calc(100%-100px)]  bg-contain max-[920px]:bg-cover  "></div>
    </div>
  );
};

export default ProfilePage;
