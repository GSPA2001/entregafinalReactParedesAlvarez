import { useContext } from "react"
import CartContext from "../../context/CartContext";

const CartItem = ({ id, name, price, quantity }) => {

  const { removeItem } = useContext(CartContext)

  return (
    <div className="CartItem">
      <div className="CartItemInfo">
        <h3>{name}</h3>
        <p>Precio: ${price}</p>
        <p>Cantidad: {quantity}u.</p>
        <button onClick={() => removeItem(id)} className="Button">Eliminar plato</button>
      </div>
    </div>
  );
}
export default CartItem;