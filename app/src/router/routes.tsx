import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/landing/HomePage";
import LoginPage from "../pages/auth/LoginPage";
import Error404Page from "../pages/Error/Error404Page";
import SignUpPage from "../pages/auth/SignUpPage";
import OnboardingPage from "../pages/onboarding/OnboardingPage";
import PrivateRoutes from "../components/auth/PrivateRoutes";

const routes = createBrowserRouter([
    {
        path: "/",
        element: <HomePage />,
        errorElement: <Error404Page />,
    },
    {
        path: "/login",
        element: <LoginPage />,
        errorElement: <Error404Page />,
    },
    {
        path: "/signup",
        element: <SignUpPage />,
        errorElement: <Error404Page />,
    },
    {
        path: "/onboarding",
        element: (
            <PrivateRoutes>
                <OnboardingPage />
            </PrivateRoutes>
        ),
        errorElement: <Error404Page />,
    },
])

export default routes;