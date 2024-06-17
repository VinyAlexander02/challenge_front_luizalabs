import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import Home from "../../../pages/Home";

global.fetch = () => ({
  json: jest.fn().mockImplementation(() => [
    {
      id: 1,
      title: "Product 1",
      price: 100,
      image: "product1.jpg",
      rating: { rate: 4.5, count: 10 },
    },
    {
      id: 2,
      title: "Product 2",
      price: 200,
      image: "product2.jpg",
      rating: { rate: 4.0, count: 5 },
    },
  ]),
});

const mockVitrines = [
  {
    id: "1",
    title: "Vitrine 1",
    products: "1,2",
  },
];

beforeAll(() => {
  Storage.prototype.getItem = () => JSON.stringify(mockVitrines);
});

afterEach(() => {
  jest.clearAllMocks();
});

describe("Home", () => {
  it("renders vitrines from localStorage and products from API", async () => {
    render(<Home />);

    expect(screen.getByText("Vitrine 1")).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText("Product 1")).toBeInTheDocument();
      expect(screen.getByText("Product 2")).toBeInTheDocument();
    });
  });

  it("renders product details correctly", async () => {
    render(<Home />);

    await waitFor(() => {
      const product1 = screen.getByText("Product 1");
      expect(product1).toBeInTheDocument();
      expect(product1.closest(".product").querySelector("img").src).toContain(
        "product1.jpg"
      );
      expect(screen.getByText("R$ 100")).toBeInTheDocument();
      expect(screen.getByText("4.5 (10)")).toBeInTheDocument();
      expect(screen.queryAllByText("(10% de desconto no pix)")).toHaveLength(2);
    });
  });

  it("handles scroll buttons", async () => {
    render(<Home />);

    await waitFor(() => {
      const content = screen.getByText("Product 1").closest(".content");

      const leftButton = screen.getByTestId("scroll-button-left-1");

      fireEvent.click(leftButton);

      expect(content.scrollLeft).not.toBe(0);
    });
  });
});
