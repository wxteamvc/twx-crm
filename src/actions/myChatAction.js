import * as Types from './actionTypes';
import * as Urls from "../constants/urls";
import Util from "../constants/util";


export function sendMsg(data,type="text"){
    return (dispatch) =>{
        Util.post(Urls.SendMsg_url,{},
            (respJson) =>{
                if (respJson.code == 1){
                    dispatch({
                        type:Types.CustomerList_SUCCESS,
                        data:respJson.data
                    })
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