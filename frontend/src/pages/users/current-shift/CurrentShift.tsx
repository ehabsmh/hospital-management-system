import Loader from "../../../ui/Loader";
import useCurrentDoctors from "../../../hooks/useCurrentDoctors";
import Table from "./Table";

function CurrentShift() {
  const { isLoading, currShiftDoctors, error } = useCurrentDoctors();

  return (
    <>
      {isLoading && (
        <div className="flex justify-center items-center">
          <Loader size={30} color={"#23B1F8"} />
        </div>
      )}
      {!isLoading && error && (
        <div className="h-screen flex justify-center items-center">
          <p className="text-red-500">{error.message}</p>
        </div>
      )}
      {!isLoading && !error && <Table currShiftDoctors={currShiftDoctors} />}
    </>
  );
}

export default CurrentShift;
