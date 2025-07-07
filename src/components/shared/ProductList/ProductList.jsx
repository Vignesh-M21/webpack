import React, { Fragment, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProducts,
  updateProducts,
} from "../../../redux/features/products/productsSlice";

export const API_URL = "https://fakestoreapi.com/products";

export function useProducts() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.products);

  useEffect(() => {
    if (state.status === "idle") dispatch(fetchProducts());
  }, []);
  return state;
}

function EditableItemField({ product, fieldName }) {
  const [isEditable, setIsEditable] = React.useState(false);
  const [value, setValue] = React.useState(product[fieldName]);
  const $element = React.useRef(null);
  const handleChange = (event) => {
    setValue(event.target.value);
  };
  const handleSubmit = () => {
    setIsEditable(false);
    product[fieldName] = value; // Update the product object directly
  };

  if (fieldName in product === false) {
    console.warn(`Field "${fieldName}" does not exist in product`, product);
    return null; // or handle the error as needed
  }

  const Tag = fieldName === "title" ? "h3" : "span";

  return (
    <div className="editable-item-field">
      {isEditable ? (
        <div>
          <input
            type="text"
            value={value}
            id={fieldName}
            name={fieldName}
            autoFocus
            onChange={handleChange}
            onBlur={handleSubmit}
            style={{ width: $element.current?.offsetWidth || "100%" }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSubmit();
              }
            }}
          />
        </div>
      ) : (
        <div onClick={() => setIsEditable(true)}>
          <Tag ref={$element}>{value}</Tag>
        </div>
      )}
    </div>
  );
}
function ProductItem({ product, onDelete, onDragStart, onDragOver, onDrop }) {
  return (
    <li
      className="product-item"
      draggable="true"
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDragEnd={onDrop}
    >
      <EditableItemField product={product} fieldName={"title"} />
      <p>{product.description}</p>
      <span>${product.price}</span>
      <button onClick={onDelete}>Delete</button>
    </li>
  );
}

export function ProductList() {
  const { items: products, status } = useProducts();
  const [startIndex, setStartIndex] = React.useState(null);
  const [endIndex, setEndIndex] = React.useState(null);
  const dispatch = useDispatch();
  if (!status === "loading") {
    return <p>Loading products...</p>;
  }

  const handleDelete = (id) => () => {
    dispatch(updateProducts(products.filter((product) => product.id !== id)));
  };

  const handleDragStart = (id) => (e) => {
    e.dataTransfer.setData("text/plain", id);
    setStartIndex(id);
  };

  const handleDragOver = (id) => (e) => {
    e.preventDefault(); // Prevent default to allow drop
    if (endIndex === id) {
      return; // Prevent unnecessary updates
    }
    setEndIndex(id);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    let draggedIndex = products.findIndex(
      (product) => product.id === startIndex
    );
    let targetIndex = products.findIndex((product) => product.id === endIndex);
    let cloneProducts = [...products];
    let temp = cloneProducts[draggedIndex];
    cloneProducts[draggedIndex] = cloneProducts[targetIndex];
    cloneProducts[targetIndex] = temp;
    dispatch(updateProducts(cloneProducts));
    console.log("Dropped product:", startIndex, "on", endIndex);
    setStartIndex(null);
    setEndIndex(null);
  };
  return (
    <ul className="product-list">
      {products.map((product) => (
        <Fragment key={product.id}>
          <ProductItem
            product={product}
            onDelete={handleDelete(product.id)}
            onDragStart={handleDragStart(product.id)}
            onDragOver={handleDragOver(product.id)}
            onDrop={handleDrop}
          />
        </Fragment>
      ))}
    </ul>
  );
}
