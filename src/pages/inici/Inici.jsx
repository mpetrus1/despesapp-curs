import {useState, useEffect} from 'react';
import {onGetCollection, deleteDespesa, saveDespesa} from '../../firebase/firebase';
import Modal from '../../components/modal/Modal';
import DespesesLlista from '../../components/despesesLlista/DespesesLlista';
import DespesaForm from '../../components/despesaForm/DespesaForm';

//import { useCollection } from '../../hooks/useCollection';



export default function Inici() {
const [mostraModal, setMostraModal] = useState(false);
const [despeses, setDespeses] = useState (null);

const [filtrarPerQuantia, setFiltrarPerQuantia] = useState(false); 

//const {documents : despeses} = useCollection('despeses');



  useEffect(()=>{
    const unsubscribe = onGetCollection("despeses",(querySnapshot)=>{
      let resultats = [];

      querySnapshot.forEach((doc)=>{
        const despesa = doc.data();
        despesa.id = doc.id;

        resultats.push({...doc.data(), id: doc.id});
      });

      setDespeses(resultats)
    });
    return ()=>unsubscribe();
  },[])

  useEffect(()=>{
    setDespeses((despesesPrevies) => {
      if(filtrarPerQuantia)
        return despesesPrevies.filter((despesa) => despesa.quantia > 10.00);
      else
        return despesesPrevies;
    })
  }
  , [filtrarPerQuantia]) 


      const afegirDespesa = (despesa) => {
        //Comentat el que provocava la duplicació de despeses
        // setDespeses((despesesPrevies) => {

        //     saveDespesa(despesa)
        //         .then((idDespesa) => {
        //             despesa.id = idDespesa;

        //             if (!despesesPrevies) {
        //                 return [despesa];
        //             } else {
        //                 return [...despesesPrevies, despesa];
        //             }
        //         })
        // }
        // );
        saveDespesa(despesa)
                .then((idDespesa) => {
                    despesa.id = idDespesa;

                    // if (!despesesPrevies) {
                    //     return [despesa];
                    // } else {
                    //     return [...despesesPrevies, despesa];
                    // }
                })
        setMostraModal(false);
    };

    const eliminarDespesa = (id) =>{
      //No fa falta  cridar a setDespeses. Firebase ja elimina del snapshot
      // setDespeses((despesesPrevies)=> {
      //   deleteDespesa(id)
      //   .then(
      //     ()=>{
      //       return despesesPrevies.filter((despesa) => id !== despesa.id)
      //     }
      //   )
        
      // })
      deleteDespesa(id)

    }

      const handleTancar = () => {
    setMostraModal(false);
    console.log(mostraModal);
  }
  const handleMostrarModal = () => {
    setMostraModal(true);
    console.log(mostraModal);
  }

  return (
    <>
        {
          despeses && <DespesesLlista despeses = {despeses} handleClick = {eliminarDespesa}/>
        }
        {mostraModal && <Modal handleTancar = {handleTancar}>
              <DespesaForm afegirDespesa = {afegirDespesa}/>
            </Modal>}
        
            <div>
              <button onClick = {handleMostrarModal}>Afegir despesa</button>
            </div>
            <div>
              <button onClick={()=>setFiltrarPerQuantia(true)}>Filtrar</button>
            </div>
    </>
    
  )
}
