import { createBrowserRouter } from "react-router-dom";
import AuthGuard from "../components/AuthGuard/AuthGuard";
import RoleGuard from "../hoc/RoleGuard";
import { ROLES } from "../types/Roles";
import { lazy } from "react";
import StudentsPage from "../pages/AdminPages/StudentsPage/StudentsPage";
import CourseDetailPage from "../pages/CoursesPage/CourseDetails/CourseDetailsPage";
import GradesPage from "../pages/StudentPages/EnrolledCourses/GradesPage/GradesPage";
const LandingPage = lazy(() => import("../pages/LandingPage/LandingPage"))
const RegistrationPage = lazy(() => import("../pages/RegistrationPage/RegistrationPage"))
const LoginPage = lazy(() => import("../pages/LoginPage/LoginPage"))
const AddUserPage = lazy(() => import("../pages/AddUserPage/AddUserPage"))
const DashboardRedirector = lazy(() => import("../components/DashboardRedirector/DashboardRedirector"))
const DashboardLayout = lazy(() => import("../layouts/DashboardLayout/DashboardLayout"))
const CoursesPage = lazy(() => import("../pages/CoursesPage/CoursesPage"))
const EnrolledCourses = lazy(() => import("../pages/StudentPages/EnrolledCourses/EnrolledCourses"))
const UnauthorizedPage = lazy(() => import("../pages/UnauthorizedPage/UnauthorizedPage"))

export const router = createBrowserRouter([

    {
        path: "/",
        element: <LandingPage />
    },
    {
        path: "/register",
        element: <RegistrationPage />
    },
    {
        path: "/login",
        element: <LoginPage />
    },
    {
        path: "/unauthorized",
        element: <UnauthorizedPage />
    },
    {
        element: <AuthGuard />,
        children: [
            {
                path: "/dashboardRedirector",
                element: <DashboardRedirector />,
            },
            {
                element: <DashboardLayout />,
                children: [
                    {
                        path: "adduser",
                        element: <RoleGuard isRouterGuard allowed={[ROLES.ADMIN]}><AddUserPage /></RoleGuard>
                    },
                    {
                        path: "students",
                        element: <RoleGuard isRouterGuard allowed={[ROLES.ADMIN]}><StudentsPage /></RoleGuard>
                    },
                    {
                        path: "courses",
                        element: <RoleGuard isRouterGuard allowed={[ROLES.ADMIN, ROLES.STUDENT, ROLES.INSTRUCTOR]}><CoursesPage /></RoleGuard>
                    },
                    {
                        path: "me/courses",
                        element: <RoleGuard isRouterGuard allowed={[ROLES.STUDENT, ROLES.INSTRUCTOR]}><EnrolledCourses /></RoleGuard>
                    },
                    {
                        path: "me/grades",
                        element: <RoleGuard isRouterGuard allowed={[ROLES.STUDENT]}><GradesPage /></RoleGuard>
                    },
                    {
                        path: "courses/:id",
                        element: <RoleGuard isRouterGuard allowed={[ROLES.ADMIN, ROLES.STUDENT, ROLES.INSTRUCTOR]}><CourseDetailPage /></RoleGuard>
                    },
                ]
            }
        ]
    },

]);
