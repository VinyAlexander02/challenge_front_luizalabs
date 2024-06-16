import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import AddShowcase from "../../../components/addShowcase";
import EditModal from "../../../components/editModal";

jest.mock("../../../components/editModal", () => jest.fn(() => null));

describe("AddShowcase", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.setItem(
      "vitrines",
      JSON.stringify([
        { id: "1", title: "Vitrine 1" },
        { id: "2", title: "Vitrine 2" },
      ])
    );
  });

  it("Should render vitrines from localStorage", () => {
    render(<AddShowcase />);

    expect(screen.getByTestId("showCase-1")).toBeInTheDocument();
    expect(screen.getByTestId("showCase-2")).toBeInTheDocument();
  });

  it("Should open and close the EditModal", () => {
    render(<AddShowcase />);

    fireEvent.click(screen.getByTestId("edit")[0]);

    expect(EditModal).toHaveBeenCalledWith(
      expect.objectContaining({
        open: true,
        vitrine: { id: "1", title: "Vitrine 1" },
      }),
      expect.anything()
    );
  });

  it("Should to add a new vitrine", () => {
    render(<AddShowcase />);

    act(() => fireEvent.click(screen.getByText("+ Adicionar Vitrine")));
    expect(screen.getByText("Adcionar Vitrine")).toBeInTheDocument();
  });

  it("Should delete a vitrine", () => {
    render(<AddShowcase />);

    expect(screen.getByTestId("showCase-1")).toBeInTheDocument();
    fireEvent.click(screen.getByTestId("delete")[0]);

    expect(screen.queryByText("showCase-1")).not.toBeInTheDocument();
  });
});
