import React from 'react';
import "./styles.scss"
import ShopMens from "../../assets/shopMens.jpg";
import ShopWomens from "../../assets/shopWomens.jpg";
import { Link } from 'react-router-dom';

const Directory = props => {
    return (
        <div className='directory'>
            <div className="wrap">
                <div className="item"
                    style={{ backgroundImage: `url(${ShopMens})` }}>
                    <Link to="/search/mens">
                        Shop Mens
                    </Link>
                </div>
                <div className="item"
                    style={{ backgroundImage: `url(${ShopWomens})` }}>
                    <Link to="/search/womens">
                        Shop Womens
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Directory
