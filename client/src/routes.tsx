import { createRoutesFromElements, Outlet, Route } from "react-router-dom";
import { SuperheroList } from "./components/SuperheroList/SuperheroList";
import { Heading } from "./components/Heading/Heading";
import { AddSuperheroForm } from "./components/AddSuperheroForm/AddSuperheroForm";
function BasicLayout() {
  return (
    <>
      <Heading />
      <Outlet />
    </>
  );
}

export const routes = createRoutesFromElements(
  <Route path="/" element={<BasicLayout />}>
    <Route errorElement={<div>error</div>}>
      <Route index element={<SuperheroList />} />
      <Route path="/home" element={<div>Home</div>} />
      <Route path="/new" element={<AddSuperheroForm />} />
      <Route path="/superhero/:id" element={<div>Superhero</div>} />
    </Route>
  </Route>,
);
