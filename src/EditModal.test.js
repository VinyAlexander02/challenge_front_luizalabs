import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import EditModal from "./components/editModal";

describe("Edit Modal", () => {
  const open = true;
  const onClose = jest.fn();
  const onSave = jest.fn();

  it("should render the modal with 'Editar Vitrine' message", () => {
    render(<EditModal open={open} onClose={onClose} onSave={onSave} />);
    expect(screen.getByText(/Editar Vitrine/i)).toBeInTheDocument();
  });

  it("Should render the labels with title", () => {
    render(<EditModal open={open} />);

    expect(screen.getByLabelText(/Título/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Preço/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Descrição/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Produtos/i)).toBeInTheDocument();
  });

  it("Should close modal when close button is clicked", () => {
    render(<EditModal open={open} onClose={onClose} onSave={onSave}/>);

    fireEvent.click(screen.getByLabelText('close'));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('should call onSave with correct data when valid', async () => {
    const mockValidateProductIds = jest.fn(() => Promise.resolve({ isValid: true, invalidIds: [] }));
    jest.mock('./components/products', () => mockValidateProductIds);

    render(<EditModal open={true} onClose={onClose} onSave={onSave} />);

    fireEvent.change(screen.getByLabelText(/Título/i), { target: { value: 'Test Title' } });
    fireEvent.change(screen.getByLabelText(/Preço/i), { target: { value: '100' } });
    fireEvent.change(screen.getByLabelText(/Descrição/i), { target: { value: 'Test Description' } });
    fireEvent.change(screen.getByLabelText(/Produtos/i), { target: { value: '123, 456' } });

    fireEvent.click(screen.getByText(/Salvar/i));
  });
});
