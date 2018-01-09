import * as Types from "./actionTypes";
import * as Urls from "../constants/urls";
import Util from "../constants/util";
export function initPersonal(){
    return (dispatch) =>{
        dispatch({
            type:Types.Login_BEGIN
        })
        Util.post(Urls.UserInfo_url,{},
            (respJson) =>{
                if (respJson.code == 1){
                    dispatch({
                        type:Types.Home_SUCCESS,
                        data:respJson.data
                    })
                }else{
                    console.log(respJson);
                }
            },
            (error)=>{
                console.log(error)
            }
        )
    }
}