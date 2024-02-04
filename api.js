import { db } from "./firebaseConfig";
import { collection, addDoc, getDocs, doc, updateDoc } from "firebase/firestore"; 



// *******************************************************************************

export const sendData = async(value) => { 
    try {
    const docRef = await addDoc(collection(db, "hotels"), value);
    console.log("Document written with ID: ", docRef.id);
    } catch (e) {
    console.error("Error adding document: ", e);
    }
}

// *******************************************************************************




// *******************************************************************************

export const getData = async () => {
    const result = [];
 
    try {
      const querySnapshot = await getDocs(collection(db, "hotels"));
      querySnapshot.forEach((doc) => {
        const id = doc.id;
        const data = doc.data();
        result.push({ id, ...data});
      });

      return result;
    } catch (error) {
      console.error("Error getting data: ", error);
      throw error;
    }
  };

// *******************************************************************************






// *******************************************************************************

// export const updateData = async()=>{
//     const foodRef = doc(db, "burgerList", "j73He1aBbzPctrQiFQ5q");

//     // Set the "capital" field of the city 'DC'
//     await updateDoc(foodRef, {
//         foodName: "Kebap"
//     });
// }


// *******************************************************************************