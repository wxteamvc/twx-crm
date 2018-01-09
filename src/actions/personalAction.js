import * as Types from "./actionTypes";
import * as Urls from "../constants/urls";
import Util from "../constants/util";

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
                        type:Types.UserInfo_SUCCESS,
                        data:respJson.data
                     })
                }
            },
            (error)=>{
                console.log(error)
                dispatch({
                    type:Types.UserInfo_FAILED,
                })
            }
        )
    }
}