import {createStore} from 'redux'

const intialState={
    count:0,
    name:'',
    email:'',
    password:'',
    confirmPassword:'',
}

const GlobalReducer=(state=intialState,action)=>{
   switch(action.type){
    case 'name':
        return{...state,name:action.payload };
    case 'email':
        return{...state,email:action.payload};
    case 'password':
        return{...state,password:action.payload};
    case 'confirmPassword':
        return{...state,confirmPassword:action.payload};
    default:return state;
   }
}



const store=createStore(GlobalReducer)

export default store;