import './CheckoutForm.css';
import { useState } from 'react';
import { useContext } from 'react';
import CheckoutDetail from "../CheckoutDetail/CheckoutDetail";
import CartContext from "../../context/CartContext";

const CheckoutForm = ({ onConfirm }) => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');

    const { clearCart, cart, removeItem } = useContext(CartContext);

    const handleConfirm = (event) => {
        event.preventDefault();

        const userData = {
            name, 
            phone,
            email
        };
        onConfirm(userData);
    };

    // Función para restablecer los campos
    const resetForm = () => {
        setName('');
        setPhone('');
        setEmail('');
    };

    return (
        <div className='Container'>
            <form onSubmit={handleConfirm} className='Form'>
                <label className='Label'>
                    Nombre
                    <input className='Input' type='text' min="7" placeholder="Lionel Messi" value={name} onChange={({ target }) => setName(target.value)} />
                </label>
                <label className='Label'>
                    Teléfono
                    <input className='Input' type='tel' pattern="^\d{10}$" placeholder="261-000-0000" value={phone} onChange={({ target }) => setPhone(target.value)} />
                </label>
                <label className='Label'>
                    Email
                    <input className='Input' type="email" placeholder="lionelmessi@tuemail.com" value={email} onChange={({ target }) => setEmail(target.value)} />
                </label>
                <div className='Label'>
                    <button type='submit' className='Button'>
                        Crear pedido
                    </button>
                    <button type='button' onClick={resetForm} className="Option">
                        Restablecer
                    </button>
                    <button type='button' onClick={() => clearCart()} className="Option">
                        Cancelar pedido
                    </button>
                </div>
                <div>
                 <CheckoutDetail cart={cart} removeItem={removeItem} />
                </div>
            </form>
        </div>
    );
};
export default CheckoutForm;