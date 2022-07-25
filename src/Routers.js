import routers from "config/routers";
import Layout from "components/Layout";
import PrivateRoute from "routers/PrivateRoute";
import RedirectRoute from "routers/RedirectRoute";
import AdminRoute from "routers/AdminRoute";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function Routers() {
  return (
    <BrowserRouter>
      <Routes>
        {routers.map(({ path, element: Element, layout, ...props }, i) => {
          const key = path || i;
          const Ele = () => (layout ? <Layout>{Element}</Layout> : Element);

          if (props.admin) {
            return (
              <Route path={path} element={<AdminRoute />} key={key}>
                <Route element={<Ele />} index {...props} />
              </Route>
            );
          } 
          if (props.private || props.redirect) {
            const Wrapper = props.private ? PrivateRoute : RedirectRoute;
            return (
              <Route path={path} element={<Wrapper />} key={key}>
                <Route element={<Ele />} index {...props} />
              </Route>
            );
          }
          return (
            <Route element={<Ele />} path={path} key={key} index {...props} />
          );
        })}
      </Routes>
    </BrowserRouter>
  );
}
