import { db } from "./firebaseConfig";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

// *******************************************************************************

export const sendData = async (value) => {
  try {
    const docRef = await addDoc(collection(db, "hotels"), value);
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

// *******************************************************************************

// *******************************************************************************

export const getData = async () => {
  const result = [];

  try {
    const querySnapshot = await getDocs(collection(db, "hotels"));
    querySnapshot.forEach((doc) => {
      const id = doc.id;
      const data = doc.data();
      result.push({ id, ...data });
    });

    return result;
  } catch (error) {
    console.error("Error getting data: ", error);
    throw error;
  }
};

// *******************************************************************************

export const sendReservationData = async (value) => {
  try {
    const docRef = await addDoc(collection(db, "reservation"), value);
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

// *******************************************************************************

// *******************************************************************************

export const getReservationData = async () => {
  const result = [];

  try {
    const querySnapshot = await getDocs(collection(db, "reservation"));
    querySnapshot.forEach((doc) => {
      const id = doc.id;
      const data = doc.data();
      result.push({ id, ...data });
    });

    return result;
  } catch (error) {
    console.error("Error getting data: ", error);
    throw error;
  }
};

// *******************************************************************************
// *******************************************************************************

export const deleteReservationData = async (reservationId) => {
  try {
    // Belgeyi sil
    await deleteDoc(doc(db, "reservation", reservationId));
    console.log("Document successfully deleted!");
  } catch (error) {
    console.error("Error deleting document: ", error);
    throw error; // Hata durumunda hatayı ileterek işlemi kesintiye uğrat
  }
};

// *******************************************************************************

// export const updateData = async()=>{
//     const foodRef = doc(db, "burgerList", "j73He1aBbzPctrQiFQ5q");

//     // Set the "capital" field of the city 'DC'
//     await updateDoc(foodRef, {
//         foodName: "Kebap"
//     });
// }

// *******************************************************************************
