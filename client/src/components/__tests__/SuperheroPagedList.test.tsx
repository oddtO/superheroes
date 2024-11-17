import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { waitFor } from "@testing-library/react";
import { routes } from "../../routes";
import { createMemoryRouter } from "react-router-dom";
import { RouterProvider } from "react-router-dom";
const renderWithProvider = (index: number) => {
  const router = createMemoryRouter(routes, {
    initialEntries: ["/pages/" + index],
  });

  render(<RouterProvider router={router} />);
};

describe("SuperheroPagedList", () => {
  it("Displays number of pages", async () => {
    renderWithProvider(1);
    await waitFor(() => {
      expect(screen.queryAllByLabelText(/go to page/i).length).toBe(3);
    });
  });

  it("should display five heroes (page 1)", async () => {
    renderWithProvider(1);
    await waitFor(() => {
      expect(screen.queryAllByAltText(/batman/i).length).toBe(5);
    });
  });
  it("should display five heroes (page 2)", async () => {
    renderWithProvider(2);
    await waitFor(() => {
      expect(screen.queryAllByAltText(/batman/i).length).toBe(5);
    });
  });
  it("should display two heroes (the last not complete page)", async () => {
    renderWithProvider(3);
    await waitFor(() => {
      expect(screen.queryAllByAltText(/batman/i).length).toBe(2);
    });
  });
});
