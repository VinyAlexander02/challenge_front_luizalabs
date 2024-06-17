import { fireEvent, render, screen } from "@testing-library/react";
import Navbar from "../../../components/navbar";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { waitFor } from "@testing-library/react";

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

const renderComponents = () => {
  render(
    <BrowserRouter>
      <Navbar />
    </BrowserRouter>
  );
};

describe("Navbar Test", () => {
  it("Should render corretly Magalu Logo", () => {
    renderComponents();

    waitFor(() => expect(screen.getAllByText(/Magalu/i)).toBeInTheDocument());
  });

  it("Should render corretly Home ", () => {
    renderComponents();

    waitFor(() => expect(screen.getAllByText(/Home/i)).toBeInTheDocument());
  });

  it("Should render corretly Vitrines", () => {
    renderComponents();

    waitFor(() => expect(screen.getAllByText(/Vitrines/i)).toBeInTheDocument());
  });

  it("Should call navigate when Vitrine button is clicked", async () => {
    renderComponents();

    const button = screen.queryAllByTestId('page-name');
    fireEvent.click(button);

    await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith("/add-showcase"));
});

});
