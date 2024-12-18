import { createRoutesFromElements, Outlet, Route } from "react-router-dom";
import { SuperheroListPaged } from "./components/SuperheroListPaged/SuperheroListPaged";
import { Heading } from "./components/Heading/Heading";
import { AddSuperheroForm } from "./components/AddSuperheroForm/AddSuperheroForm";
import { EditSuperheroForm } from "./components/EditSuperheroForm/EditSuperheroForm";
import { ErrorBoundary } from "./components/ErrorBoundary/ErrorBoundary";
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
    <Route errorElement={<ErrorBoundary />}>
      <Route path="*" element={<div>There should be 404 page</div>} />
      <Route index element={<SuperheroListPaged />} />
      <Route path="/pages/:page" element={<SuperheroListPaged />} />
      <Route path="/home" element={<div>Home</div>} />
      <Route path="/new" element={<AddSuperheroForm />} />
      <Route path="/edit/:id" element={<EditSuperheroForm />} />
    </Route>
  </Route>,
);
