import { Navigate, Outlet, useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../redux/store/hooks"
import Loader from "../Loader/Loader";
import { useEffect } from "react";
import { restoreSession } from "../../redux/slices/authSlice";
import { useLazyGetMeQuery, useRefreshSessionMutation } from "../../redux/slices/authApiSlice";

const AuthGuard = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.auth.user);
  
  const token = localStorage.getItem("token");
  const refreshToken = localStorage.getItem("refreshToken");

  const [getMe, { isFetching, isLoading }] = useLazyGetMeQuery();
  const [refreshSession] = useRefreshSessionMutation();

  useEffect(() => {
    const fetchUserData = async () => {
      if (!token || user) return;

      try {
        const response = await getMe().unwrap();
        if (response) {
          dispatch(restoreSession(response));
        }
      } catch (e: any) {
        if (refreshToken) {
          try {
            const response = await refreshSession({ refreshToken }).unwrap();
            localStorage.setItem("token", response.accessToken);
            localStorage.setItem("refreshToken", response.refreshToken);
            
            const retryResponse = await getMe().unwrap();
            if (retryResponse) {
              dispatch(restoreSession(retryResponse));
            }
          } catch (e: any) {
            clearLocalStorage();
          }
        } else {
          clearLocalStorage();
        }
      }
    };

    const clearLocalStorage = () => {
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      navigate("/login");
    };

    fetchUserData();
  }, [user, getMe]);

  if (!token) {
    return <Navigate to="/" />;
  }

  if (isLoading || isFetching || (token && !user)) {
    return <Loader />;
  }

  return <Outlet />;
};

export default AuthGuard;
