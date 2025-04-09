import { useQuery } from "@tanstack/react-query";
import { fetchDoctorByShift } from "../../../services/apiShifts";

function useDoctorByShift(shiftId: string, params: { groupId: string, clinicId: string }) {

  const { data: doctor, isLoading, error } = useQuery({
    queryKey: ["doctor-by-shift", { clinicId: params.clinicId, shiftId, groupId: params.groupId },
      `clinicId: ${params.clinicId}`
    ],
    queryFn: () => fetchDoctorByShift(params, shiftId)
  })

  return { doctor, isLoading, error };
}

export default useDoctorByShift
