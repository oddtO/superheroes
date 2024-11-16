import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { SuperheroList } from "../SuperheroList/SuperheroList";
import { waitFor } from "@testing-library/react";
describe("SuperheroList", () => {
  it("should display fetched superheroes", async () => {
    render(<SuperheroList />);

    await waitFor(() => {
      expect(screen.getAllByText(/Batman/).length).toBe(2);
    });
  });
});
