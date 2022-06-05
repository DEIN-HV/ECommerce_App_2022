import React from 'react';
import "./styles.scss";
import { Link } from "react-router-dom";
import Button from "../Form/Button"

export const Product = ({ product }) => {
    const { id, productName, productThumbnail, productDesc, productPrice } = product;

    return (
        <div className="product">
            <div className="thumb">
                <Link to={`/product/${id}`}>
                    <img src={productThumbnail} alt={productName} />
                </Link>
            </div>

            <div className="details">
                <ul>
                    <li>
                        <div className="name">
                            <Link to={`/product/${id}`}>
                                {productName}
                            </Link>
                        </div>
                    </li>
                    <li>
                        <span className="price">
                            ${productPrice}
                        </span>
                    </li>
                    <li>
                        <div className="addToCart">
                            <Button>
                                Add to cart
                            </Button>
                        </div>
                    </li>
                </ul>
            </div>

        </div>

    )
}

export default Product