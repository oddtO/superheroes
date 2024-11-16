import { createRoutesFromElements, Outlet, Route } from "react-router-dom";
import { SuperheroList } from "./components/SuperheroList/SuperheroList";
function BasicLayout() {
  return (
    <>
      <div>Heading</div>
      <Outlet />
    </>
  );
}

export const routes = createRoutesFromElements(
  <Route path="/" element={<BasicLayout />}>
    <Route errorElement={<div>error</div>}>
      <Route index element={<SuperheroList />} />
      <Route path="/home" element={<div>Home</div>} />
      <Route path="/superhero/:id" element={<div>Superhero</div>} />
    </Route>
  </Route>,
);
