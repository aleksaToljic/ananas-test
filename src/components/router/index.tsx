import { lazy, Suspense } from "react";
import generatedRoutes from "../../routes.json";
import { Navigate, Route, Routes } from "react-router-dom";

interface GeneratedRouteProps {
  /**
   * Represents the path to the file relative to `src/pages` used to lazy load the component.
   */
  filename: string;
  /**
   * Represents path for `<Route` component (e.g posts/:id)
   */
  path: string;
}

// force type to routes.json
const routes: GeneratedRouteProps[] = generatedRoutes;

export const Router = () => {
  function renderRoute({ path, filename }: GeneratedRouteProps) {
    /* @vite-ignore */
    const Page = lazy(() => import(`../../pages/${filename}`));

    return <Route path={path} key={path} element={<Page />} />;
  }

  //convinient place to make a page Layout for all the pages, like header, footer, sidebar, etc.
  return (
    //TODO add some nice loading component
    <Suspense fallback={<div className="l-center l-center--text">...Loading</div>}>
      <Routes>
        {routes.map(renderRoute)}
        <Route path="*" element={<Navigate to="posts" />} />
      </Routes>
    </Suspense>
  );
};
