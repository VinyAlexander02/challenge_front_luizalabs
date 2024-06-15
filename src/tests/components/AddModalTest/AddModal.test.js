import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import AddModal from "../../../components/addModal";
import validateProductIds from "../../../components/products";
import swal from "sweetalert";

jest.mock("./components/products"); // Mock the module correctly
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

  it("should render the modal with 'Adicionar Vitrine' message", () => {
    render(<AddModal open={true} onClose={onCloseMock} onSave={onSaveMock} />);
    expect(screen.getByText(/Adicionar Vitrine/i)).toBeInTheDocument();
  });

  it("should render the labels with title", () => {
    render(<AddModal open={true} onClose={onCloseMock} onSave={onSaveMock} />);

    expect(screen.getByLabelText(/Título/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Preço/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Descrição/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Produtos/i)).toBeInTheDocument();
  });

  it("should close modal when close button is clicked", () => {
    render(<AddModal open={true} onClose={onCloseMock} onSave={onSaveMock} />);

    fireEvent.click(screen.getByLabelText("close"));
    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });

  it("should call onSave with correct data when valid", async () => {
    validateProductIds.mockResolvedValueOnce({ isValid: true, invalidIds: [] });

    render(<AddModal open={true} onClose={onCloseMock} onSave={onSaveMock} />);

    fireEvent.change(screen.getByLabelText(/Título/i), {
      target: { value: "Test Title" },
    });
    fireEvent.change(screen.getByLabelText(/Preço/i), {
      target: { value: "100" },
    });
    fireEvent.change(screen.getByLabelText(/Descrição/i), {
      target: { value: "Test Description" },
    });
    fireEvent.change(screen.getByLabelText(/Produtos/i), {
      target: { value: "123, 456" },
    });

    fireEvent.click(screen.getByText(/Salvar/i));

    await waitFor(() => {
      expect(onSaveMock).toHaveBeenCalledWith(
        expect.objectContaining({
          title: "Test Title",
          price: "100",
          description: "Test Description",
          products: "123, 456",
        })
      );
    });

    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });

  test("should display error message for invalid product IDs", async () => {
    validateProductIds.mockResolvedValueOnce({
      isValid: false,
      invalidIds: ["123"],
    });

    render(<AddModal open={true} onClose={onCloseMock} onSave={onSaveMock} />);

    fireEvent.change(screen.getByLabelText(/Produtos/i), {
      target: { value: "123" },
    });
    fireEvent.click(screen.getByText(/Salvar/i));

    expect(
      await screen.findByText("IDs inválidos encontrados: 123")
    ).toBeInTheDocument();
    expect(swal).toHaveBeenCalledWith(
      "OPS!",
      "Os seguintes IDs são inválidos: 123",
      "error"
    );
  });

  test("should handle empty fields", () => {
    const onCloseMock = jest.fn();
    const onSaveMock = jest.fn();
    render(<AddModal open={true} onClose={onCloseMock} onSave={onSaveMock} />);

    fireEvent.click(screen.getByText(/Salvar/i));

    expect(onSaveMock).not.toHaveBeenCalled();
    expect(screen.getByLabelText(/Título/i)).toHaveValue("");
    expect(screen.getByLabelText(/Preço/i)).toHaveValue("");
    expect(screen.getByLabelText(/Descrição/i)).toHaveValue("");
    expect(screen.getByLabelText(/Produtos/i)).toHaveValue("");
  });
});
