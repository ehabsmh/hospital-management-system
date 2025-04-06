import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteReservation } from "../../../services/apiReservations";
import { toast } from "sonner";

function useDeleteReservation() {
  const queryClient = useQueryClient();

  const { mutate: delReservation, error } = useMutation({
    mutationFn: (reservationId: string) => deleteReservation(reservationId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["doctor-reservations"],
      });
      toast.success("Reservation has been deleted.");
    },
  });

  return { delReservation, error };
}

export default useDeleteReservation;
