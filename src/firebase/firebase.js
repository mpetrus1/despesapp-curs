import { firebaseConfig } from './config'
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, addDoc, collection, getDocs, onSnapshot, doc, deleteDoc, updateDoc, query, where, arrayRemove, arrayUnion } from "firebase/firestore";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, getAuth, signOut } from "firebase/auth";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries



// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

export const saveDespesa = async (despesa) => {
  console.log(despesa)
  const docRef = await addDoc(collection(db, "despeses"), despesa);

  //Afegir també el id dins l'objecte despesa
  await updateDoc(doc(db, "despeses", docRef.id), { id: docRef.id });

  return docRef.id;
}

export const saveCollection = async (collectionName, item) => {
  console.log(item)
  const docRef = await addDoc(collection(db, collectionName), item);

  return docRef.id;
}

export const getDespeses = () => getDocs(collection(db, "despeses"));

export const getItem = (collectionName, id) => doc(db, collectionName, id);

export const getParticipantAmbUid = async (uid) => {
  console.log("Buscant participant amb uid ", uid);
  const participantsRef = collection(db, "participants");
  const q = query(participantsRef, where("uid", "==", uid));
  const querySnapshot = await getDocs(q);

  if (!querySnapshot.empty) {
    const participantDoc = querySnapshot.docs[0];
    console.log("Resultat de la query: ", participantDoc)
    return { id: participantDoc.id, ...participantDoc.data() };
  } else {
    return null;
  }
}

//Aquesta primera opció és només els usuaris registrats i que tenen uid
// export const getParticipantsRegistrats = async () => {
//   const participantsRef = collection(db, "participants");
//   const q = query(participantsRef, where("uid", "!=", null)); //Només registrats
//   const querySnapShot = await getDocs(q);
//   return querySnapShot.docs.map(doc => ({
//     id : doc.id, ...doc.data()
//   }));
// };

//M'agrada més aquesta segona opció on es poden seleccionar els registrats més els que ja participen
//en algún altre projecte, sinó es duplicarien
export const getParticipantsRegistrats = async () => {
  const querySnapshot = await getDocs(collection(db, "participants"));
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};


export const onGetCollection = (collectionName, callback) =>
  onSnapshot(collection(db, collectionName), callback);

export const onGetItem = (collectionName, id, callback) =>
  onSnapshot(doc(db, collectionName, id), callback);

// export const onGetDespesa = (id, callback) =>
//   onSnapshot(doc(db, "despeses", id), callback);

///////////////////////////////////
//Mètodes per gestió de projectes//
///////////////////////////////////

export const eliminarProjecte = async (idProjecte) => {
  try {
    await deleteDoc(doc(db, "projectes", idProjecte));
  } catch (error) {
    console.log("Error a l'eliminar projecte", error)
  }
}

export const afegirProjecte = async (projecte) => {
  const docRef = await addDoc(collection(db, "projectes"), projecte);
  return docRef.id;
};

//////////////////////////////////
//Mètodes per gestió de despeses//
//////////////////////////////////

export const afegirDespesaAProjecte = async (idProjecte, despesa) => {
  try {
    console.log("Afegir despesa a projecte", despesa.id)
    const despesaRef = collection(db, "despeses");
    const novaDespesaDoc = await addDoc(despesaRef, despesa);

    const projecteRef = doc(db, "projectes", idProjecte);
    await updateDoc(projecteRef, {
      despeses: arrayUnion(novaDespesaDoc.id)
    });


  } catch (error) {
    console.log("Error creant despesa del projecte", error);
  }
}

export const eliminarDespesaDeProjecte = async (idProjecte, idDespesa) => {
  try {
    const projecteRef = doc(db, "projectes", idProjecte);
    await updateDoc(projecteRef, {
      despeses: arrayRemove(idDespesa)
    });

    const despesaRef = doc(db, "despeses", idDespesa);
    await deleteDoc(despesaRef);
  } catch (error) {
    console.log("Error eliminant despesa del projecte", error);
  }
}

//////////////////////////////////////
//Mètodes per gestió de participants//
//////////////////////////////////////

export const afegirParticipantAProjecte = async (idProjecte, participant) => {
  try {
    let participantId = participant.id;

    // Si no té id (participant extern), creem el document i agafem l'id
    if (!participantId) {
      const participantRef = collection(db, "participants");
      const nouParticipantDoc = await addDoc(participantRef, participant);
      participantId = nouParticipantDoc.id;
    }

    // Actualitzem el projecte per afegir l'id del participant
    const projecteRef = doc(db, "projectes", idProjecte);
    await updateDoc(projecteRef, {
      participants: arrayUnion(participantId)
    });

  } catch (error) {
    console.log("Error afegint participant al projecte", error);
  }
}




export const eliminarParticipantDeProjecte = async (idProjecte, idParticipant) => {
  try {
    console.log("Eliminant participant del projecte", idParticipant, idProjecte);
    const projecteRef = doc(db, "projectes", idProjecte);
    await updateDoc(projecteRef, {
      participants: arrayRemove(idParticipant)
    });
  } catch (error) {
    console.log("Error eliminant participant del projecte", error);
  }
}

////////////////////////////////
//Mètodes per a l'autenticació//
////////////////////////////////

export const registerUser = async (email, password) => {
  try {
    return await createUserWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.log(error.code);
    console.log(error.message);

    if (error.code == "auth/invalid-email") {
      error.message = "Email no vàlid";
    } else if (error.code == "auth/email-already-in-use") {
      error.message = "Email ja utilitzat";
    }
    return error;
  }
};

export const loginUser = async (email, password) => {
  try {
    return await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    if (error.code == "auth/invalid-email") {
      error.message = "Email no vàlid";
    } else if (error.code == "auth/invalid-credential") {
      error.message = "Email o contrasenya erronis";
    }

    return error;
  }
};

export const logoutUser = async () => {
  await signOut(auth);
}

