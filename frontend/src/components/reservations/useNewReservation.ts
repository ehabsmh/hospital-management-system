import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createReservation } from "../../services/apiReservations";

function useNewReservation(doctorId: string) {
  const queryClient = useQueryClient();

  const { mutate: newReservation } = useMutation({
    mutationFn: ({
      doctorId,
      patientId,
      reservationTypeId = "67e04d65182214fdd7282918", // default value
    }: {
      doctorId: string;
      patientId: string;
      reservationTypeId?: string;
    }) => createReservation({ doctorId, patientId }, reservationTypeId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["doctor-reservations", doctorId],
      });
    },
  });

  return { newReservation };
}

export default useNewReservation;
