import { useState } from "react";
import "./App.css";

interface ShoppingItem {
  name: string;
  quantity: number;
}

function ShoppingList() {
  const [item, setItem] = useState<ShoppingItem>({ name: "", quantity: 0 });
  const [shoppingList, setShoppingList] = useState<ShoppingItem[]>([]);
  const [nameError, setNameError] = useState({ error: false, message: "" });
  const [quantityError, setQuantityError] = useState({
    error: false,
    message: "",
  });
  const [successMessage, setSuccessMessage] = useState({
    success: false,
    message: "",
  });
  const [deleteMessage, setDeleteMessage] = useState({
    deleted: false,
    message: "",
  });

  const addItem = () => {
    setSuccessMessage({ success: false, message: "" });
    setDeleteMessage({ deleted: false, message: "" });
    if (item.quantity <= 0) {
      setQuantityError({
        error: true,
        message: "Quantity must be greater than 0",
      });
      return;
    }
    if (item.name.trim() === "") {
      setNameError({
        error: true,
        message: "Name must not be empty",
      });
      return;
    }
    setShoppingList([...shoppingList, item]);
    setSuccessMessage({
      success: true,
      message: "Item added to shopping list",
    });
  };

  const removeItem = (index: number) => {
    let removedItem = shoppingList[index];
    setSuccessMessage({ success: false, message: "" });
    setDeleteMessage({ deleted: false, message: "" });
    setNameError({ error: false, message: "" });
    setQuantityError({ error: false, message: "" });
    setShoppingList((prev) => prev.filter((p, i) => i !== index));
    setDeleteMessage({
      deleted: true,
      message: `${removedItem.name} deleted successfully!`,
    }); //How can I reach name?
  };

  return (
    <div>
      {nameError.error && (
        <p className="message error-message">{nameError.message}</p>
      )}

      {quantityError.error && (
        <p className="message error-message">{quantityError.message}</p>
      )}

      {successMessage.success && (
        <p className="message success-message">{successMessage.message}</p>
      )}

      {deleteMessage.deleted && (
        <p className="message delete-message">{deleteMessage.message}</p>
      )}
      <div>
        <label>
          Name:
          <input
            type="text"
            value={item.name}
            onChange={(e) => {
              setItem({ ...item, name: e.target.value });
              setNameError({ error: false, message: "" });
            }}
          />
        </label>
        <label>
          Quantity:
          <input
            type="number"
            value={item.quantity}
            onChange={(e) => {
              setItem({ ...item, quantity: Number(e.target.value) });
              setQuantityError({ error: false, message: "" });
            }}
          />
        </label>
        <button onClick={addItem}>Add</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Quantity</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {shoppingList.map((s, i) => (
            <tr key={i}>
              <td>{s.name}</td>
              <td>{s.quantity}</td>
              <td>
                <button onClick={() => removeItem(i)}>Remove Item</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function App() {
  return (
    <>
      <ShoppingList />
    </>
  );
}

export default App;
