import { db } from '../../firebase';
import { collection, addDoc, getDocs } from 'firebase/firestore';

export const ADD_USER = "ADD_USER";
export const ADD_PRODUCT = "ADD_PRODUCT";
export const ADD_INVOICE = "ADD_INVOICE";

export const GET_USERS = "ADD_USER";
export const GET_PRODUCTS = "ADD_PRODUCT";
export const GET_INVOICES = "ADD_INVOICE";

// POSTS
export function addUser(userData){
    return async dispatch => {
        try{
            const docRef = await addDoc(collection(db, 'users'), userData)
            console.log(docRef);
        }catch(err){
            console.log(err);
        }
    }
}

export function addProduct(productData){
    return async dispatch => {
        try{
            const docRef = await addDoc(collection(db, 'products'), productData)
            console.log(docRef);
        }catch(err){
            console.log(err);
        }
    }
}

// GETERS
export function getUsers(){
    return async dispatch => {
        try{
            const query = await getDocs(collection(db, "users"));
            dispatch({
                type: GET_USERS,
                payload: query
            })
        }catch(err){
            console.log(err);
        }
    }
}

export function getProduct(){
    return async dispatch => {
        try{
            const query = await addDoc(collection(db, 'products'))
            dispatch({
                type: GET_PRODUCTS,
                payload: query
            });
        }catch(err){
            console.log(err);
        }
    }
}