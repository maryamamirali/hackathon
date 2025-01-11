import {createBrowserRouter,RouterProvider} from "react-router-dom";
import Dashboard from "../screens/posts";
import Login from "../screens/login";
import AddPost from "../screens/addpost";
import Message from "../screens/message";

const router = createBrowserRouter([

{    path: "/",
    element: <Dashboard />
},
{
    path: "addpost",
    element: <AddPost />
},
{
    path: "login",
    element: <Login />
},
{
    path: "message",
    element: <Message />
},
]);

export default function Route () {
    return  <RouterProvider router={router} />
}