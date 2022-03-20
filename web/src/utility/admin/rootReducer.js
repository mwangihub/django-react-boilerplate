import { combineReducers } from 'redux';
import authReducer  from "./auth/authReducer";
// import  adminReducer  from "./admin/adminReducer"
/**
 * adminReducer should not be combined here. Just for the purpose of practise
 * of combining two reducers, adminReducer appears here
 */
const rootReducer = combineReducers({
    authReducer, 
    //adminReducer
});

export default rootReducer;