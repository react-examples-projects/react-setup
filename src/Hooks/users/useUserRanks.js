import { USER_RANKS } from "config/";

export default function useUserRanks() {
  const ranks = Object.values(USER_RANKS);
  return ranks;
}
