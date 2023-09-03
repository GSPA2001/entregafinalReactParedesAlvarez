import './ItemDetailContainer.css';
import { useState, useEffect } from 'react';
import ItemDetail from '../ItemDetail/ItemDetail';
import { useParams } from 'react-router-dom';
import { getDoc, doc } from 'firebase/firestore';
import { db } from '../../service/firebase/firebaseConfig';

const ItemDetailContainer = ({ greeting }) => {
    const [product, setProduct] = useState(null);

    const { itemId } = useParams();

    useEffect(() => {
        const docRef = doc(db, 'products', itemId);

        getDoc(docRef)
            .then((response) => {
                if (response.exists()) {
                    const data = response.data();
                    const productAdapted = { id: response.id, ...data };
                    setProduct(productAdapted);
                } else {
                    console.log('No se encontró el producto');
                }
            })
            .catch((error) => {
                console.error('Error al obtener el producto:', error);
            });
    }, [itemId]);

    return (
        <div className='ItemDetailContainer'>
            {product ? <ItemDetail {...product} /> : <p>Producto no encontrado</p>}
        </div>
    );
};

export default ItemDetailContainer;