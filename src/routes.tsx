import { createBrowserRouter } from "react-router";
import { SignIn } from "./pages/auth/sign-in";
import { AppLayout } from "./pages/_layouts/app";
import { Dashboard } from "./pages/app/dashboard/dashboard";
import { AuthLayout } from "./pages/_layouts/auth";
import { Hills } from "./pages/app/hills/hills";
import { Avert } from "./pages/app/avert/avert";
import { PageNotFound } from "./pages/404";
import { Seamaty } from "./pages/app/seamaty/seamaty";
import { Search } from "./pages/app/search/search";
import { Goals } from "./pages/app/goals/goals";

export const router = createBrowserRouter([
    {
        path: '/', 
        errorElement: <PageNotFound />,
        element: <AppLayout />,
        children: [
            { path: '/', element: <Dashboard /> },
            { path: 'hills', element: <Hills />},
            { path: 'avert', element: <Avert />},
            { path: 'seamaty', element: <Seamaty />},
            { path: 'search', element: <Search />},
            { path: 'goals', element: <Goals />}
        ]
    },
    {
        path: '/', 
        element: <AuthLayout />,
        children: [{ path: '/sign-in', element: <SignIn/>}]
    }
])