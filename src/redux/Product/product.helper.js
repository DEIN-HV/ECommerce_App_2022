import { collection, deleteDoc, doc, getDocs, setDoc, query, where } from "firebase/firestore";
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

export const handleFetchProduct = async (productCategory) => {
    try {
        let q = collection(firestore, "products");
        if (productCategory) {
            q = query(q, where("productCategory", "==", productCategory));
        }
        // console.log("q", q)
        const querySnapshot = await getDocs(q);
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

