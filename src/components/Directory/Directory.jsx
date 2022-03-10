import React from 'react';
import "./styles.scss"
import ShopMens from "../../assets/shopMens.jpg";
import ShopWomens from "../../assets/shopWomens.jpg";

const Directory = props => {
    return (
        <div className='directory'>
            <div className="wrap">
                <div className="item"
                    style={{ backgroundImage: `url(${ShopMens})` }}>
                    <a href="">
                        Shop Women
                    </a>
                </div>
                <div className="item"
                    style={{ backgroundImage: `url(${ShopWomens})` }}>
                    <a href="">Shop Men</a>
                </div>
            </div>
        </div>
    )
}

export default Directory
