import { db } from '../../firebase';
import { collection, addDoc, getDocs } from 'firebase/firestore';

export const ADD_CLIENT = "ADD_CLIENT";
export const ADD_PRODUCT = "ADD_PRODUCT";
export const ADD_INVOICE = "ADD_INVOICE";

export const GET_CLIENTS = "GET_CLIENTS";
export const GET_PRODUCTS = "GET_PRODUCTS";
export const GET_INVOICES = "GET_INVOICES";

// POSTS
export function addClient(clientData){
    return async dispatch => {
        try{
            await addDoc(collection(db, 'clients'), clientData)
            
            return dispatch({
                type: ADD_CLIENT,
                payload: clientData
            });
        }catch(err){
            console.log(err);
        }
    }
}

export function addProduct(productData){
    return async dispatch => {
        try{
            await addDoc(collection(db, 'products'), productData)
            return dispatch({
                type: ADD_PRODUCT,
                payload: productData
            });
        }catch(err){
            console.log(err);
        }
    }
}

// GETERS
export function getClients(){
    return async dispatch => {
        try{
            const query = await getDocs(collection(db, "clients"));
            dispatch({
                type: GET_CLIENTS,
                payload: query._snapshot.docChanges
            })
        }catch(err){
            console.log(err);
        }
    }
}

export function getProducts(){
    return async dispatch => {
        try{
            const query = await getDocs(collection(db, 'products'))
            dispatch({
                type: GET_PRODUCTS,
                payload: query._snapshot.docChanges
            });
        }catch(err){
            console.log(err);
        }
    }
}