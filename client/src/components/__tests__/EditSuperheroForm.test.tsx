import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { waitFor } from "@testing-library/react";
import { routes } from "../../routes";
import { createMemoryRouter } from "react-router-dom";
import { RouterProvider } from "react-router-dom";
import userEvent from "@testing-library/user-event";
const renderWithProvider = () => {
  const router = createMemoryRouter(routes, {
    initialEntries: ["/edit/1"],
  });

  render(<RouterProvider router={router} />);
};

describe("EditSuperheroForm", () => {
  it("should display correct textual data", async () => {
    renderWithProvider();
    await waitFor(() => {
      expect(screen.getByLabelText(/nickname/i)).toHaveValue("Batman");
      expect(screen.getByLabelText(/real name/i)).toHaveValue("Bruce Wayne");
      expect(screen.getByLabelText(/origin description/i)).toHaveValue(
        "Gotham City",
      );
      expect(screen.getByLabelText(/superpowers/i)).toHaveValue("Money");
      expect(screen.getByLabelText(/catch phrase/i)).toHaveValue("I'm Batman");
    });
  });
  it("should display correct amount of images", async () => {
    renderWithProvider();
    await waitFor(() => {
      expect(screen.getAllByAltText(/batman/i).length).toBe(2);
    });
  });

  it("should display unconfirmed newly uploaded images additionally to images stored on the server", async () => {
    const user = userEvent.setup();
    renderWithProvider();
    const fileInput = await screen.findByLabelText(/add image/i);
    await user.upload(
      fileInput,
      new File(["test"], "batman.png", { type: "image/png" }),
    );

    await waitFor(() => {
      expect(screen.getAllByAltText(/batman/i).length).toBe(3);
    });
  });

  it("should remove images sent from the database", async () => {
    const user = userEvent.setup();
    renderWithProvider();
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
  });
});
