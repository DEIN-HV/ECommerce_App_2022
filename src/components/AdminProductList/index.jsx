import React from 'react';
import AdminProductItem from '../AdminProductItem';
import "./styles.scss"

export const AdminProductList = ({ products }) => {
    return (
        <div className='manageProducts'>
            <table border="0" cellPadding="0" cellSpacing="0">
                <tbody>
                    <tr>
                        <th>
                            <h1>Manage Products</h1>
                        </th>
                    </tr>

                    <tr>
                        <tbody>
                            <td>
                                <table className="results" border="0" cellPadding="10" cellSpacing="0">
                                    <tbody>
                                        {
                                            (Array.isArray(products) && products.length > 0)
                                            && products.map((product, index) => (
                                                <AdminProductItem product={product} key={index} />
                                            ))
                                        }
                                    </tbody>
                                </table>
                            </td>
                        </tbody>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default AdminProductList
