import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addDoctorToShift } from "../../../services/apiShifts";
import { toast } from "sonner";

type ShiftInfo = { groupId: string; shiftId: string };
type HookProps = ShiftInfo & { clinicId: string };
type MutationPayload = ShiftInfo & { doctorId: string };

function useAddDoctorToShift({ clinicId, groupId, shiftId }: HookProps) {
  const queryClient = useQueryClient();

  const { mutate: newDoctorToShift } = useMutation({
    mutationKey: ["doctor-by-shift", { clinicId, shiftId, groupId }],
    mutationFn: ({ doctorId, groupId, shiftId }: MutationPayload) =>
      addDoctorToShift({ doctorId, groupId, shiftId }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["doctor-by-shift", { clinicId, shiftId, groupId }],
      });
      toast.success("Doctor added to shift successfully");
    },
    onError: (err) => {
      if (err instanceof Error) {
        toast.error(err.message);
      }
    },
  });

  return { newDoctorToShift };
}

export default useAddDoctorToShift;
