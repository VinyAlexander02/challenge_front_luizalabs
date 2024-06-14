import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import EditModal from "./components/EditModal";
import validateProductIds from "./components/products";
import swal from "sweetalert";

// Mocking the validateProductIds function and swal
jest.mock("./components/products");
jest.mock("sweetalert");

describe("Edit Modal", () => {
  const open = true;
  const onClose = jest.fn();
  const onUpdate = jest.fn();

  const vitrine = {
    id: "1",
    title: "Existing Title",
    price: "50",
    description: "Existing Description",
    products: "111, 222",
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render the modal with 'Editar Vitrine' message", () => {
    render(
      <EditModal
        open={true}
        onClose={onClose}
        onUpdate={onUpdate}
        vitrine={vitrine}
      />
    );
    expect(screen.getByText(/Editar Vitrine/i)).toBeInTheDocument();
  });

  it("Should render the labels with title", () => {
    render(
      <EditModal
        open={true}
        onClose={onClose}
        onUpdate={onUpdate}
        vitrine={vitrine}
      />
    );

    expect(screen.getByLabelText(/Título/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Preço/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Descrição/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Produtos/i)).toBeInTheDocument();
  });

  it("Should close modal when close button is clicked", () => {
    render(
      <EditModal
        open={open}
        onClose={onClose}
        onUpdate={onUpdate}
        vitrine={vitrine}
      />
    );

    fireEvent.click(screen.getByLabelText("close"));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("should call onUpdate with correct data when valid", async () => {
    validateProductIds.mockResolvedValueOnce({ isValid: true, invalidIds: [] });

    render(
      <EditModal
        open={true}
        onClose={onClose}
        onUpdate={onUpdate}
        vitrine={vitrine}
      />
    );

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
      expect(onUpdate).toHaveBeenCalledWith({
        id: "1",
        title: "Test Title",
        price: "100",
        description: "Test Description",
        products: "123, 456",
      });
    });
  });

  test("should display error message for invalid product IDs", async () => {
    validateProductIds.mockResolvedValueOnce({
      isValid: false,
      invalidIds: ["123"],
    });

    render(
      <EditModal
        open={true}
        onClose={onClose}
        onUpdate={onUpdate}
        vitrine={vitrine}
      />
    );

    fireEvent.change(screen.getByLabelText(/Produtos/i), {
      target: { value: "123" },
    });
    fireEvent.click(screen.getByText(/Salvar/i));

    expect(
      await screen.findByText("Os seguintes IDs são inválidos: 123")
    ).toBeInTheDocument();
    expect(swal).toHaveBeenCalledWith(
      "OPS!",
      "Os seguintes IDs são inválidos: 123",
      "error"
    );
  });
});
