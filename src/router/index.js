import Create from "@/pages/Create";
import Layout from "@/pages/Layout";
import Month from "@/pages/Month";
import Year from "@/pages/Year";
import { createBrowserRouter } from "react-router-dom";

const routers = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                index: true,
                element: <Month />
            },
            {
                path: '/year',
                element: <Year />
            }
        ]
    },
    {
        path: '/create',
        element: <Create />
    }
])

export default routers