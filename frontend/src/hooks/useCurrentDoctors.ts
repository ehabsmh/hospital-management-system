import { useQuery } from "@tanstack/react-query";
import { getCurrentShift } from "../services/apiShifts";

function useCurrentDoctors() {
  const {
    isLoading,
    data: currentShift,
    error,
  } = useQuery({
    queryKey: ["current-shifts"],
    queryFn: getCurrentShift,
    retry: false
  });

  return { isLoading, currentShift, error };
}

export default useCurrentDoctors;
