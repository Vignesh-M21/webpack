import "@testing-library/jest-dom";
import React from "react";
import {
  render,
  screen,
  waitFor,
  act,
  renderHook,
} from "@testing-library/react";
import { ProductList, useProducts } from "./ProductList";

const mockData = [
  { id: 1, name: "Product 1", price: 100 },
  { id: 2, name: "Product 2", price: 200 },
  { id: 3, name: "Product 3", price: 100 },
];

global.fetch = jest.fn(
  () =>
    new Promise((resolve) =>
      setTimeout(() => {
        resolve({
          json: () => Promise.resolve(mockData),
        });
      }, 100)
    )
);

describe("ProductList Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  test("renders loading state initially", async () => {
    await React.act(async () => {
      render(<ProductList />);
    });
    expect(screen.getByText(/Loading products.../i)).toBeInTheDocument();
  });

  test("renders products after fetching", async () => {
    await act(async () => {
      render(<ProductList />);
    });

    expect(await screen.findByText(/Product 1/i)).toBeInTheDocument();
    expect(await screen.findByText(/Product 2/i)).toBeInTheDocument();
    expect(await screen.findByText(/Product 3/i)).toBeInTheDocument();
  });

  test("deletes a product when delete button is clicked", async () => {
    await act(async () => {
      render(<ProductList />);
    });

    const deleteButtons = await screen.findAllByRole("button", {
      name: /Delete/i,
    });
    expect(deleteButtons).toHaveLength(3);

    act(() => {
      deleteButtons[0].click();
    });

    await waitFor(() => {
      expect(screen.queryByText(/Product 1/i)).not.toBeInTheDocument();
      expect(screen.getByText(/Product 2/i)).toBeInTheDocument();
      expect(screen.getByText(/Product 3/i)).toBeInTheDocument();
    });
  });
});

describe("useProducts Hook", () => {
  test("fetched products using useProducts", async () => {
    global.fetch = jest.fn();

    global.fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(mockData),
    });

    const { result } = renderHook(() => useProducts());
    await act(async () => {});
    const [products, setProducts] = result.current;

    expect(products).toEqual(mockData);
  });
});
