import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import AddShowcase from "../../../components/addShowcase";
import EditModal from "../../../components/editModal";
import AddModal from "../../../components/addModal";

jest.mock("./components/editModal", () => jest.fn(() => null));
jest.mock("./components/addModal", () => jest.fn(() => null));

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

  test("renders vitrines from localStorage", () => {
    render(<AddShowcase />);

    expect(screen.getByText("(1) Vitrine 1")).toBeInTheDocument();
    expect(screen.getByText("(2) Vitrine 2")).toBeInTheDocument();
  });

  test("opens and closes the EditModal", () => {
    render(<AddShowcase />);

    fireEvent.click(screen.getAllByRole("button", { name: /edit/i })[0]);

    expect(EditModal).toHaveBeenCalledWith(
      expect.objectContaining({
        open: true,
        vitrine: { id: "1", title: "Vitrine 1" },
      }),
      expect.anything()
    );

    fireEvent.click(screen.getByRole("button", { name: /close/i }));
    expect(EditModal).toHaveBeenCalledWith(
      expect.objectContaining({
        open: false,
      }),
      expect.anything()
    );
  });

  test("opens and closes the AddModal", () => {
    render(<AddShowcase />);

    fireEvent.click(screen.getByText("+ Adicionar Vitrine"));

    expect(AddModal).toHaveBeenCalledWith(
      expect.objectContaining({
        open: true,
      }),
      expect.anything()
    );

    fireEvent.click(screen.getByRole("button", { name: /close/i }));
    expect(AddModal).toHaveBeenCalledWith(
      expect.objectContaining({
        open: false,
      }),
      expect.anything()
    );
  });

  test("adds a new vitrine", () => {
    const { rerender } = render(<AddShowcase />);

    AddModal.mockImplementation(({ onSave }) => {
      onSave({ id: "3", title: "Vitrine 3" });
      return null;
    });

    fireEvent.click(screen.getByText("+ Adicionar Vitrine"));

    expect(AddModal).toHaveBeenCalledWith(
      expect.objectContaining({
        open: true,
      }),
      expect.anything()
    );

    rerender(<AddShowcase />);

    expect(screen.getByText("(3) Vitrine 3")).toBeInTheDocument();
  });

  test("deletes a vitrine", () => {
    render(<AddShowcase />);

    fireEvent.click(screen.getAllByRole("button", { name: /close/i })[0]);

    expect(screen.queryByText("(1) Vitrine 1")).not.toBeInTheDocument();
  });
});
