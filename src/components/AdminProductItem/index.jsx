import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteProuctStart } from '../../redux/Product/product.action';
import Button from '../Form/Button';
import "./styles.scss"

export const AdminProductItem = ({ product, index }) => {
    const dispatch = useDispatch();
    const { id, productName, productThumbnail, productDesc, productPrice } = product;

    const handleDeleteProduct = () => {
        dispatch(deleteProuctStart(id))
    }

    return (
        <tr key={index}>
            <td>
                <img className="thumb" src={productThumbnail} />
            </td>
            <td>
                {productName}
            </td>
            <td>
                ${productPrice}
            </td>
            <td>
                <Button onClick={handleDeleteProduct}>
                    Delete
                </Button>
            </td>
        </tr>
    )
}

export default AdminProductItem;
