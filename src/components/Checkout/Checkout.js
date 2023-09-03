import { useContext, useState, useEffect } from "react";
import CartContext from "../../context/CartContext";
import { collection, writeBatch } from 'firebase/firestore';
import { db } from "../../service/firebase/firebaseConfig";
import Swal from "sweetalert2";
import CheckoutForm from "../CheckoutForm/CheckoutForm";
import { Timestamp, addDoc, documentId, getDocs, query, where} from "firebase/firestore"; 

const Checkout = () => {
    const [loading, setLoading] = useState(false);
    const [orderId, setOrderId] = useState('');

    const { cart, totalPrice, clearCart } = useContext(CartContext);

    const createOrder = async ({ name, phone, email }) => {
        setLoading(true);

        try {
            const objOrder = {
                buyer: {
                    name, phone, email
                },
                items: cart,
                total: typeof totalPrice === 'number' ? totalPrice : 0,
                date: Timestamp.fromDate(new Date())
            };

            const batch = writeBatch(db);

            const outOfStock = [];

            const ids = cart.map(prod => prod.id);

            const productsCollection = collection(db, 'products');

            const productsAddedFromFirestore = await getDocs(query(productsCollection, where(documentId(), 'in', ids))); 
            const { docs } = productsAddedFromFirestore;

            docs.forEach(doc => {
                const dataDoc = doc.data();
                const stockDb = dataDoc.stock;

                const productsAddedToCart = cart.find(prod => prod.id === doc.id);
                const prodQuantity = productsAddedToCart?.quantity;

                if (stockDb >= prodQuantity) {
                    batch.update(doc.ref, { stock: stockDb - prodQuantity });
                } else {
                    outOfStock.push({ id: doc.id, ...dataDoc });
                }
            });

            if (outOfStock.length === 0) {
                await batch.commit();

                const orderRef = collection(db, 'orders');

                const orderAdded = await addDoc(orderRef, objOrder);

                setOrderId(orderAdded.id);
                clearCart();
            } else {
                console.error('platos sin stock');
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };
    
    useEffect(() => {
        if (!loading && orderId) {
            console.log('Order ID:', orderId);
            Swal.fire({
                background:'rgba(177, 255, 164, 0.819)',
                color:'#f08ff',
                title: "Excelente",
                text: `El id de su pedido es : ${orderId}`,
                showConfirmButton: false,
                timer: 1600
            });
        } else if (loading) {
            Swal.fire({
                background:'rgba(255, 190, 190, 0.757)',
                color:'#f08ff',
                title: "Generando su pedido..",
                text: "Espere mientras se genera su ID...",
                showConfirmButton: false,
                timer: 1600
            });
        }
    }, [loading, orderId]);

    return (
        <div>
            <h1>Checkout</h1>
            <CheckoutForm onConfirm={createOrder} />
        </div>
    );
}
export default Checkout;