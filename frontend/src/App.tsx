import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from "react-router-dom";
import Error from "./components/Error";
import Layout from "./components/Layout";
import NotFound from "./pages/NotFound";
import Login, { action as loginAction } from "./pages/Login";
import React, {createContext, useState} from "react";
import ProfileSettings, {action as profileUpdateAction} from "./pages/ProfileSettings";

export const authContext = createContext<any>(null)

export default function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/" element={<Layout />} errorElement={<Error />}>
          <Route index element={<h1>Overview page</h1>} />
          <Route path="/forms" element={<h1>Forms page</h1>} />
          <Route path="/trainees" element={<h1>Trainees page</h1>} />
          <Route
            path="/administer-coach"
            element={<h1>Administer coach page</h1>}
          />
          <Route
            path="/profile-settings"
            element={<ProfileSettings/>}
            action={profileUpdateAction}
          />
        </Route>
        <Route path="/login" element={<Login />} action={loginAction} />
        <Route path="*" element={<NotFound />} />
      </Route>
    )
  );
  const [user, setUser] = useState(null)
  return (
  <authContext.Provider value={{user, setUser}}>
  <RouterProvider router={router} />
  </authContext.Provider>);
}
