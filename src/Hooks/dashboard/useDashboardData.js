import { useQuery } from "react-query";
import { getDashboardData } from "helpers/api";

export default function useDashboardInfo() {
  const data = useQuery("dashboardData", getDashboardData);
  return data;
}
