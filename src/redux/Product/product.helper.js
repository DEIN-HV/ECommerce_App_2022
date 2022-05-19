import { doc, setDoc } from "firebase/firestore";
import { firestore } from "../../firebase/utils"

export const handleAddProduct = async (product) => {
    const { productAdminUserUID } = product
    console.log(productAdminUserUID)
    try {
        await setDoc(doc(firestore, "products", productAdminUserUID), product);
    } catch (error) {
        console.log(error)
    }


}