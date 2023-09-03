import React from 'react';
import './ItemList.css';
import Item from '../Item/Item';

const ItemList = ({ products }) => {
    if (!products || !Array.isArray(products) || products.length === 0) {
        return <div>No se porque no se cargan los platos 😔 perdon</div>;
    }

    return (
        <div className='ListGroup'>
            {products.map(prod => <Item key={prod.id} {...prod} />)}
        </div>
    );
}

export default ItemList;
