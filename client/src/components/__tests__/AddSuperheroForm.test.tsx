import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { waitFor } from "@testing-library/react";
import { routes } from "../../routes";
import { createMemoryRouter } from "react-router-dom";
import { RouterProvider } from "react-router-dom";
import userEvent from "@testing-library/user-event";
const renderWithProvider = () => {
  const router = createMemoryRouter(routes, {
    initialEntries: ["/new"],
  });

  render(<RouterProvider router={router} />);
};

describe("AddSuperheroForm", () => {
  it("should display unconfirmed newly uploaded images ", async () => {
    await waitFor(() => {
      expect(screen.queryAllByAltText(/batman/i).length).toBe(0);
    });
    expect(screen.queryAllByAltText(/batman/i).length).toBe(0);
    const user = userEvent.setup();
    renderWithProvider();
    const fileInput = await screen.findByLabelText(/add image/i);
    await user.upload(
      fileInput,
      new File(["test"], "batman.png", { type: "image/png" }),
    );

    await waitFor(() => {
      expect(screen.getAllByAltText(/batman/i).length).toBe(1);
    });
  });

  it("should be able to cancel assigned images before superhero creation", async () => {
    const user = userEvent.setup();
    renderWithProvider();
    await waitFor(() => {
      expect(screen.queryAllByAltText(/batman/i).length).toBe(0);
    });

    const fileInput = await screen.findByLabelText(/add image/i);
    await user.upload(
      fileInput,
      new File(["test"], "batman.png", { type: "image/png" }),
    );

    const removeBtn = await screen.findAllByRole("button", {
      name: /remove image/i,
    });
    await waitFor(() => {
      expect(screen.getAllByAltText(/batman/i).length).toBe(1);
    });
    await user.click(removeBtn[0]);

    await waitFor(() => {
      expect(screen.queryAllByAltText(/batman/i).length).toBe(0);
    });
  });
  it("should be able to add and remove multiple images", async () => {
    const user = userEvent.setup();
    renderWithProvider();
    await waitFor(() => {
      expect(screen.queryAllByAltText(/batman/i).length).toBe(0);
    });

    const fileInput = await screen.findByLabelText(/add image/i);
    await user.upload(
      fileInput,
      new File(["test"], "batman.png", { type: "image/png" }),
    );

    await waitFor(() => {
      expect(screen.getAllByAltText(/batman/i).length).toBe(1);
    });
    await user.upload(
      fileInput,
      new File(["test"], "batman 2.png", { type: "image/png" }),
    );
    await waitFor(() => {
      expect(screen.getAllByAltText(/batman/i).length).toBe(2);
    });
    const removeBtn = await screen.findAllByRole("button", {
      name: /remove image/i,
    });
    await user.click(removeBtn[0]);

    await waitFor(() => {
      expect(screen.getAllByAltText(/batman/i).length).toBe(1);
    });
    await user.click(removeBtn[1]);
    await waitFor(() => {
      expect(screen.queryAllByAltText(/batman/i).length).toBe(0);
    });
  });
});
