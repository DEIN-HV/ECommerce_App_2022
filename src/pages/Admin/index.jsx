import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../components/Form/Button";
import FormInput from "../../components/Form/FormInput";
import FormSelect from "../../components/Form/FormSelect";
import Modal from "../../components/Modal";
import "./styles.scss";
import { addProductStart } from "../../redux/Product/product.action"

const Admin = () => {

    // const { products } = useSelector(mapState);
    const dispatch = useDispatch();
    const [hideModal, setHideModal] = useState(true);
    const [productCategory, setProductCategory] = useState('mens');
    const [productName, setProductName] = useState('');
    const [productThumbnail, setProductThumbnail] = useState('');
    const [productPrice, setProductPrice] = useState(0);
    const [productDesc, setProductDesc] = useState('');

    const toggleModal = () => setHideModal(!hideModal);

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
        }))


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
                        <h2>
                            Add new product
                        </h2>

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
                        <Button type="submit">Add new product</Button>
                    </form>
                </div>
            </Modal>
        </div>
    )
}

export default Admin;