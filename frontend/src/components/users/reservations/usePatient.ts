import { useQuery } from "@tanstack/react-query";
import { getPatient } from "../../../services/apiPatients";

function usePatient() {
  const { } = useQuery({
    queryKey: ["patients",],
    queryFn: async ({ queryKey }) => await getPatient(queryKey[1]),
  }),

}
