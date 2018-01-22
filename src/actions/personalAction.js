import * as Types from "./actionTypes";
import * as Urls from "../constants/urls";
import Util from "../constants/util";
import { Toast } from 'teaset';

export function login(data,type=1){
    return (dispatch)=>{
        Util.post(Urls.Login_url,data,
            (respJson)=>{
                if (respJson.code == 1){
                    dispatch({
                        type:Types.Login_SUCCESS,
                        data:respJson.data
                    })
                    dispatch({
                        type:Types.Change_TOKEN,
                        data:respJson.data.token
                    })
                }else{
                    Toast.message(respJson.msg);
                    dispatch({
                        type:Types.Login_FAILED,
                        data:respJson.msg
                    })
                }
            },
            (error)=>{
                console.log(error)
                dispatch({
                    type:Types.Login_FAILED,
                })
            }
        )
    }
}

export function logout(data,type=1){
    return (dispatch)=>{
        dispatch({
            type:Types.Logout
        })
        dispatch({
            type:Types.Change_TOKEN,
            data:''
        })
    }
}

export function initPersonal(){
    return (dispatch) =>{
        dispatch({
            type:Types.UserInfo_BEGIN
        })
        Util.post(Urls.UserInfo_url,{},
            (respJson) =>{
                if (respJson.code == 1){
                    dispatch({
                        type:Types.UserInfo_SUCCESS,
                        data:respJson.data
                    })
                }else{
                    dispatch({
                        type:Types.UserInfo_FAILED,
                    })
                    dispatch({
                        type:Types.Change_TOKEN,
                        data:''
                    })
                }
            },
            (error)=>{
                console.log(error)
                dispatch({
                    type:Types.UserInfo_FAILED,
                })
                dispatch({
                    type:Types.Change_TOKEN,
                    data:''
                })
            }
        )
    }
}