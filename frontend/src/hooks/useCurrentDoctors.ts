import { useQuery } from "@tanstack/react-query";
import { getCurrentShiftDoctors } from "../services/apiShifts";

function useCurrentDoctors() {
  const {
    isLoading,
    data: currShiftDoctors,
    error,
  } = useQuery({
    queryKey: ["current-shifts"],
    queryFn: getCurrentShiftDoctors,
  });

  return { isLoading, currShiftDoctors, error };
}

export default useCurrentDoctors;
