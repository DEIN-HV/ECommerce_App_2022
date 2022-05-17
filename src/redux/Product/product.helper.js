import { doc, setDoc } from "firebase/firestore";
import { firestore } from "../../firebase/utils"

export const handleAddProduct = product => {
    return Promise((resolve, reject) => {
        await setDoc(doc(firestore,), {
            name: "Los Angeles",
            state: "CA",
            country: "USA"
        });
    })
}