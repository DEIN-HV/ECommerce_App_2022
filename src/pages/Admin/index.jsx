import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../components/Form/Button";
import FormInput from "../../components/Form/FormInput";
import FormSelect from "../../components/Form/FormSelect";
import Modal from "../../components/Modal";
import "./styles.scss";
import { addProductStart, fetchProductStart } from "../../redux/Product/product.action";
import messages from "../../messages";
import AdminProductList from "../../components/AdminProductList";

const mapState = ({ product }) => ({
    addProductSuccess: product.addProductSuccess,
    products: product.products,
})

const Admin = () => {

    const dispatch = useDispatch();
    const [hideModal, setHideModal] = useState(true);
    const [productCategory, setProductCategory] = useState('mens');
    const [productName, setProductName] = useState('');
    const [productThumbnail, setProductThumbnail] = useState('');
    const [productPrice, setProductPrice] = useState(0);
    const [productDesc, setProductDesc] = useState('');
    const [productData, setProductData] = useState([]);
    const [message, setMessage] = useState('');

    const toggleModal = () => {
        setHideModal(!hideModal);
        resetForm();
        setMessage('');
    }


    const { addProductSuccess, products } = useSelector(mapState);
    console.log(products)
    useEffect(() => {
        if (addProductSuccess) setMessage(messages.ADD_PRODUCT_SUCCESS)
    }, [addProductSuccess]);

    useEffect(() => {
        dispatch(fetchProductStart());
    }, [])


    const modalConfig = {
        hideModal,
        toggleModal,
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(addProductStart({
            productCategory,
            productName,
            productThumbnail,
            productPrice,
            productDesc
        }));

        resetForm();
    }

    const resetForm = () => {
        setProductCategory('');
        setProductName('');
        setProductThumbnail('');
        setProductPrice(0);
        setProductDesc('');
    }

    return (
        <div className="admin">
            <div className="callToActions">
                <ul>
                    <li>
                        <Button onClick={() => toggleModal()}>
                            Add new product
                        </Button>
                    </li>
                </ul>
            </div>

            <Modal {...modalConfig}>
                <div className="addNewProductForm">
                    <form onSubmit={handleSubmit}>

                        <div className="topForm">
                            <h2>Add new product</h2>
                        </div>

                        <div className="centerForm">
                            <FormSelect
                                label="Category"
                                options={[{
                                    value: "mens",
                                    name: "Mens"
                                }, {
                                    value: "womens",
                                    name: "Womens"
                                }]}
                                handleChange={e => setProductCategory(e.target.value)}
                            />

                            <FormInput
                                label="Name"
                                type="text"
                                value={productName}
                                handleChange={e => setProductName(e.target.value)}
                            />

                            <FormInput
                                label="Main image URL"
                                type="url"
                                value={productThumbnail}
                                handleChange={e => setProductThumbnail(e.target.value)}
                            />

                            <FormInput
                                label="Price"
                                type="number"
                                min="0.00"
                                max="10000.00"
                                step="0.01"
                                value={productPrice}
                                handleChange={e => setProductPrice(e.target.value)}
                            />

                        </div>

                        <div className="bottomForm">
                            <div className="modalMessage">
                                <span className="successMess">{message}</span>
                            </div>
                            <Button type="submit">Add new product</Button>
                        </div>
                    </form>
                </div>
            </Modal>
            <AdminProductList products={products} />
        </div>
    )
}

export default Admin;