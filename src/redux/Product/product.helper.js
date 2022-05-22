import { collection, deleteDoc, doc, getDocs, setDoc } from "firebase/firestore";
import { firestore } from "../../firebase/utils"
import { randomId } from "../../utils";

export const handleAddProduct = async (product) => {
    try {
        const id = randomId();

        await setDoc(doc(firestore, "products", id), product);
    } catch (error) {
        console.log(error)
    }
}

export const handleFetchProduct = async () => {
    try {
        const querySnapshot = await getDocs(collection(firestore, "products"));
        const products = []
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            const id = doc.id
            const productData = { ...data, id }
            products.push(productData);
        });
        return products

    } catch (error) {
        console.log(error);
        return;
    }
}

export const handleDeleteProduct = async (productId) => {
    try {
        await deleteDoc(doc(firestore, "products", productId));

    } catch (error) {
        console.log(error)
    }
}

