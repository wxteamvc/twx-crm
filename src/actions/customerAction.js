import * as Types from "./actionTypes";
import * as Urls from "../constants/urls";
import Util from "../constants/util";
import { Toast } from 'teaset';


export function getCustomerList(nextUrl=false){
    return (dispatch) =>{
        dispatch({
            type:Types.CustomerList_BEGIN
        })
        Util.post(nextUrl?nextUrl:Urls.CustomerList_url,{},
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
                     Toast.fail(respJson.msg);
                }
            },
            (error)=>{
                dispatch({
                    type:Types.CustomerList_FAILED,
                })
                Toast.fail(error.message);
            }
        )
    }
}

export function getCustomerInfo(customerId){
    return (dispatch) =>{
        dispatch({
            type:Types.CustomerInfo_BEGIN
        })
        Util.post(Urls.CustomerInfo_url+'/'+customerId,{},
            (respJson) =>{
                if (respJson.code == 1){
                    dispatch({
                        type:Types.CustomerInfo_SUCCESS,
                        data:respJson.data
                    })
                }else{
                    dispatch({
                        type:Types.CustomerInfo_SUCCESS,
                        data:respJson.data
                     })
                     Toast.fail(respJson.msg);
                }
            },
            (error)=>{
                dispatch({
                    type:Types.CustomerInfo_FAILED,
                })
                Toast.fail(error.message);
            }
        )
    }
}
