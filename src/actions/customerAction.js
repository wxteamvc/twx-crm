import * as Types from "./actionTypes";
import * as Urls from "../constants/urls";
import Util from "../constants/util";

export function getCustomerList(){
    return (dispatch) =>{
        dispatch({
            type:Types.CustomerList_BEGIN
        })
        Util.post(Urls.CustomerList_url,{},
            (respJson) =>{
                if (respJson.code == 1){
                    dispatch({
                        type:Types.CustomerList_SUCCESS,
                        data:respJson.data
                    })
                }else{
                    dispatch({
                        type:Types.CustomerList_SUCCESS,
                        data:respJson.data
                     })
                }
            },
            (error)=>{
                console.log(error)
                dispatch({
                    type:Types.CustomerList_FAILED,
                })
            }
        )
    }
}