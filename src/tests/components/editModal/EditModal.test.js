import { render, screen, fireEvent, waitFor, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import EditModal from "../../../components/editModal";
import validateProductIds from "../../../components/products";
import swal from "sweetalert";


jest.mock("../../../components/products");
jest.mock("sweetalert");

describe("Edit Modal", () => {
  const open = true;
  const onClose = jest.fn();
  const onUpdate = jest.fn();

  const vitrine = {
    id: "1",
    title: "Existing Title",
    products: "111, 222",
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("Should render the modal with 'Editar Vitrine' message", () => {
    act(() => {
      render(
        <EditModal
          open={true}
          onClose={onClose}
          onUpdate={onUpdate}
          vitrine={vitrine}
        />
      );
    });
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

  it("Should call Update with correct data when valid", async () => {
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
    fireEvent.change(screen.getByLabelText(/Produtos/i), {
      target: { value: "123, 456" },
    });

    fireEvent.click(screen.getByText(/Salvar/i));

    await waitFor(() => {
      expect(onUpdate).toHaveBeenCalledWith({
        id: "1",
        title: "Test Title",
        products: "123, 456",
      });
    });
  });

  test("Should display error message for invalid product IDs", async () => {
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
