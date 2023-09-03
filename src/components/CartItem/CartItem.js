import React from 'react';

const CartItem = ({ id, name, price, quantity }) => {
  return (
    <div className="CartItem">
      <div className="CartItemInfo">
        <h3>{name}</h3>
        <p>Precio: ${price}</p>
        <p>Cantidad: {quantity}</p>
      </div>
    </div>
  );
}

export default CartItem;