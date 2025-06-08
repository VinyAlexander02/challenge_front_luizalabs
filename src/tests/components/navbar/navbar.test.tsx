import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, useLocation } from "react-router-dom";
import Navbar from "../../components/navbar";

function LocationDisplay() {
  const location = useLocation();
  return <div data-testid="location">{location.pathname}</div>;
}

describe("Navbar Navigation", () => {
  it("Should render name MAGALU on navbar element", () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    const nameMagalu = screen.getByText("MAGALU");
    expect(nameMagalu).toBeInTheDocument();
  });

  it("Should render Home Link on navbar element", () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    const nameHome = screen.getByText("Home");
    expect(nameHome).toBeInTheDocument();
  });

  it("Should render Vitrine Link on navbar element", () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    const nameVitrines = screen.getByText("Vitrines");
    expect(nameVitrines).toBeInTheDocument();
  });

  it("Should navigate to Vitrine screen when Vitrines button was clicked", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Navbar />
        <LocationDisplay />
      </MemoryRouter>
    );

    const nameVitrines = screen.getByText("Vitrines");
    userEvent.click(nameVitrines);

    expect(screen.getByTestId("location").textContent).toBe("/add-showcase");
  });
});
