import { db } from "./firebaseConfig";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { storage } from "./firebaseConfig";
import { getDownloadURL, listAll, ref } from "firebase/storage";

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

// Otel bilgilerini Firebase'e yüklemek için bir fonksiyon
export const createHotel = async (hotelData) => {
  try {
    const docRef = await addDoc(collection(db, "hotels"), hotelData);
    console.log("Otel dökümanı ID ile oluşturuldu: ", docRef.id);
  } catch (error) {
    console.error("Otel dökümanı eklenirken hata oluştu: ", error);
  }
};

// *******************************************************************************

// resimleri çekme fonksiyornu
export const getImages = async () => {
  try {
    const storageRef = ref(storage, "hotelimages/");
    const listResult = await listAll(storageRef);
    const urls = await Promise.all(
      listResult.items.map((itemRef) => getDownloadURL(itemRef))
    );
    return urls;
  } catch (error) {
    console.error("Error fetching images:", error.code, error.message);
  }
};

// otel silme fonksiyonu
export const deleteHotelWithId = async (hotelId) => {
  try {
    // Belgeyi sil
    await deleteDoc(doc(db, "hotels", hotelId));
    console.log("Document successfully deleted!");
  } catch (error) {
    console.error("Error deleting document: ", error);
    throw error; // Hata durumunda hatayı ileterek işlemi kesintiye uğrat
  }
};

// otel update fonksiyonu
export const updateHotel = async (hotelId, hotelData) => {
  try {
    // Belgeyi güncelle
    await updateDoc(doc(db, "hotels", hotelId), hotelData);
    console.log("Document successfully updated!");
  } catch (error) {
    console.error("Error updating document: ", error);
    throw error; // Hata durumunda hatayı ileterek işlemi kesintiye uğrat
  }
};
