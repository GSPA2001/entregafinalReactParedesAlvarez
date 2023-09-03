import './CheckoutForm.css';
import { useState } from 'react';
import { useContext } from 'react';
import CheckoutDetail from "../CheckoutDetail/CheckoutDetail";
import CartContext from "../../context/CartContext";

const CheckoutForm = ({ onConfirm }) => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');

    const { clearCart, cart } = useContext(CartContext);

    const handleConfirm = (event) => {
        event.preventDefault();

        const userData = {
            name, 
            phone,
            email
        };
        onConfirm(userData);
    };

    return (
        <div className='Container'>
            <form onSubmit={handleConfirm} className='Form'>
                <label className='Label'>
                    Nombre
                    <input className='Input' type='text' value={name} onChange={({ target }) => setName(target.value)} />
                </label>
                <label className='Label'>
                    Teléfono
                    <input className='Input' type='text' value={phone} onChange={({ target }) => setPhone(target.value)} />
                </label>
                <label className='Label'>
                    Email
                    <input className='Input' type='text' value={email} onChange={({ target }) => setEmail(target.value)} />
                </label>
                <div className='Label'>
                    <button type='submit' className='Button'>
                        Crear pedido
                    </button>
                    <button type='button' onClick={() => clearCart()} className="Option">
                        Cancelar pedido
                    </button>
                </div>
                <div>
                <CheckoutDetail cart={cart} />
                </div>
            </form>
        </div>
    );
};
export default CheckoutForm;