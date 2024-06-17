import React, { act } from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import AddModal from "../../../components/addModal";
import validateProductIds from "../../../components/products";
import swal from "sweetalert";

jest.mock("../../../components/products");
jest.mock("sweetalert", () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe("AddModal", () => {
  const onCloseMock = jest.fn();
  const onSaveMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("Should render the modal with 'Adicionar Vitrine' message", () => {
    render(<AddModal open={true} onClose={onCloseMock} onSave={onSaveMock} />);
    expect(screen.getByText(/Adicionar Vitrine/i)).toBeInTheDocument();
  });

  it("Should render the labels with title", () => {
    render(<AddModal open={true} onClose={onCloseMock} onSave={onSaveMock} />);

    expect(screen.getByLabelText(/Título/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Produtos/i)).toBeInTheDocument();
  });

  it("Should close modal when close button is clicked", () => {
    render(<AddModal open={true} onClose={onCloseMock} onSave={onSaveMock} />);

    fireEvent.click(screen.getByLabelText("close"));
    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });

  // it("Should call onSave with correct data when valid", async () => {
  //   validateProductIds.mockResolvedValueOnce({ isValid: true, invalidIds: [] });

  //   render(<AddModal open={true} onClose={onCloseMock} onSave={onSaveMock} />);

  //   act(() => {
  //     fireEvent.change(screen.getByLabelText(/Título/i), {
  //       target: { value: "Test Title" },
  //     });

  //     fireEvent.change(screen.getByLabelText(/Produtos/i), {
  //       target: { value: "1,2,3, 4,5,6" },
  //     });
  //   });

  //   await act(async() => {
  //     fireEvent.click(screen.getByText(/Salvar/i));
  //   });

  //   await waitFor(() => {
  //     expect(onSaveMock).toHaveBeenCalledWith(
  //       expect.objectContaining({
  //         title: "Test Title",
  //         products: [1, 2, 3, 4, 5, 6],
  //       })
  //     );
  //   });

  //   expect(onCloseMock).toHaveBeenCalledTimes(1);
  // });

  it("Should display error message for invalid product IDs", async () => {
    validateProductIds.mockResolvedValueOnce({
      isValid: false,
      invalidIds: ["123"],
    });

    render(<AddModal open={true} onClose={onCloseMock} onSave={onSaveMock} />);

    fireEvent.change(screen.getByLabelText(/Produtos/i), {
      target: { value: "123" },
    });
    fireEvent.click(screen.getByText(/Salvar/i));

    expect(swal).toHaveBeenCalledWith(
      "Ops!",
      "O campo produtos precisa ser preenchido",
      "error"
    );
  });

  it("Should handle empty fields", () => {
    validateProductIds.mockResolvedValueOnce({
      isValid: false,
      isValidIds: ["123"],
    });
    const onCloseMock = jest.fn();
    const onSaveMock = jest.fn();
    render(<AddModal open={true} onClose={onCloseMock} onSave={onSaveMock} />);

    fireEvent.click(screen.getByText(/Salvar/i));

    expect(onSaveMock).not.toHaveBeenCalled();
    expect(screen.getByLabelText(/Título/i)).toHaveValue("");
    expect(screen.getByLabelText(/Produtos/i)).toHaveValue("");
  });
});
