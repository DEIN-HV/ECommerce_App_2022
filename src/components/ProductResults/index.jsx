import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductStart } from '../../redux/Product/product.action';
import Footer from '../Footer';
import Header from '../Header';
import Product from '../Product';
import FormSelect from '../Form/FormSelect';
import { useNavigate, useParams } from 'react-router-dom'
import "./styles.scss";

const mapState = ({ product }) => ({
    products: product.products,
});

export const ProductResults = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { products } = useSelector(mapState);

    const handleFilter = (e) => {
        navigate(`/search/${e.target.value}`)
    }

    const { filterType } = useParams();
    console.log(filterType)

    const configFilter = {
        options: [
            {
                name: "Show all",
                value: "",
            },
            {
                name: "Mens",
                value: "mens",
            },
            {
                name: "Womens",
                value: "womens",
            },
        ],

        defaultValue: filterType,
        handleChange: handleFilter,
    }

    useEffect(() => {
        dispatch(fetchProductStart(filterType));
    }, [filterType]);

    console.log(products)

    return (
        <div className="products">
            <Header />

            <div className="productsWrap">
                <FormSelect {...configFilter} />

                <div className='productResult'>
                    {(!Array.isArray(products) || products.length < 1)
                        ? ""
                        : products.map((product) => (
                            <Product product={product} />
                        ))
                    }
                    {/* {(Array.isArray(products) || products.length > 0) &&
                        products.map((product) => (
                            <Product product={product} />
                        ))
                    } */}
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default ProductResults;
