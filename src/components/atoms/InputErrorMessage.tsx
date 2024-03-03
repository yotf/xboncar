const InputErrorMessage = ({ message }: { message?: string }) => {
  return (
    <>
      <p className=" !-mb-5 !mt-0  text-sm  text-red-600 dark:text-red-500">
        {message}
      </p>
    </>
  );
};

export default InputErrorMessage;
