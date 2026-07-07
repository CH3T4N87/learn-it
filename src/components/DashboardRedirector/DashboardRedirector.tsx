import { Outlet, useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { useAppSelector } from "../../redux/store/hooks"
import { ROLES } from "../../types/Roles"

const DashboardRedirector = () => {
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.auth.user);

  useEffect(() => {
    if (!user) return;

    switch (user.role) {
      case ROLES.ADMIN:
        navigate("/courses");
        break;
      case ROLES.STUDENT:
        navigate("/courses");
        break;
      case ROLES.INSTRUCTOR:
        navigate("/courses");
    }

  }, [user]);

  return <Outlet />;
};


export default DashboardRedirector;