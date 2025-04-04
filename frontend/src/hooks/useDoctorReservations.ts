import { useQuery } from "@tanstack/react-query";
import { getDoctorReservations } from "../services/apiReservations";

function useDoctorReservations(doctorId: string) {
  const {
    isLoading,
    data: doctorReservations,
    error,
  } = useQuery({
    queryKey: ["doctor-reservations", doctorId],
    queryFn: async ({ queryKey }) => await getDoctorReservations(queryKey[1]),
    enabled: !!doctorId
  });

  return { isLoading, doctorReservations, error };
}

export default useDoctorReservations;
