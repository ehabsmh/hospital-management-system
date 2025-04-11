import { useQuery } from "@tanstack/react-query";
import { fetchDoctorByShift } from "../../../services/apiShifts";

function useDoctorByShift(shiftId: string, params: { groupId: string, clinicId: string }) {

  const { data: doctor, isLoading, isError } = useQuery({
    queryKey: ["doctor-by-shift", { clinicId: params.clinicId, shiftId, groupId: params.groupId }],
    queryFn: () => fetchDoctorByShift(params, shiftId),
    retry: false
  })

  return { doctor, isLoading, isError };
}

export default useDoctorByShift
