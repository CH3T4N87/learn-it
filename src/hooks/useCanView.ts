import { useAppSelector } from "../redux/store/hooks"
import type { ROLES } from "../types/Roles"

const useCanView = (allowed: Array<ROLES>) => {
  const user = useAppSelector(state => state.auth.user);
  if (!user) return { isAllowed: false };
  return {
    isAllowed: allowed.includes(user.role as ROLES)
  };
}

export default useCanView