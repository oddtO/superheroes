import { useRouteError } from "react-router-dom";

export function ErrorBoundary() {
  const error = useRouteError();
  if (!(error instanceof Error)) {
    return <div>Unknown error</div>;
  }
  return (
    <div>
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.message}</i>
      </p>
    </div>
  );
}
