import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteDoctorFromShift } from "../../../services/apiShifts";
import { toast } from "sonner";

type ShiftInfo = { groupId: string; shiftId: string };
type HookProps = ShiftInfo & { clinicId: string };
type MutationPayload = ShiftInfo & { doctorId: string };

function useDeleteDoctorFromShift({ clinicId, groupId, shiftId }: HookProps) {
  const queryClient = useQueryClient();

  const { mutate: delDoctorFromShift } = useMutation({
    mutationKey: ["doctor-by-shift", { clinicId, shiftId, groupId }],
    mutationFn: ({ doctorId, groupId, shiftId }: MutationPayload) =>
      deleteDoctorFromShift(shiftId, { doctorId, groupId }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["doctor-by-shift", { clinicId, shiftId, groupId }],
      });
      toast.success(data.message);
    },
    onError: (err) => {
      if (err instanceof Error) {
        toast.error(err.message);
      }
    },
  });

  return { delDoctorFromShift };
}

export default useDeleteDoctorFromShift;
