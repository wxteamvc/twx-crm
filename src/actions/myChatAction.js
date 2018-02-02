import * as Types from './actionTypes';
import * as Urls from "../constants/urls";
import Util from "../constants/util";
import { Toast } from 'teaset';

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
                Toast.message(error.message);
            }
        )
    }
}

export function getScopeHistory(scope,begin = false){
    return (dispatch)=>{
        let url  = Urls.ChatHistory_url+'/'+scope;
        url = begin ? url+'/'+begin : url;
        Util.post(url,{},
            (respJson) =>{
                console.log(respJson)
                if (respJson.code == 1){
                    dispatch({
                        type:'addHistory',
                        data:{
                            scope:scope,
                            data:respJson.data
                        }
                    })
                }else{
                    Toast.message(respJson.msg);
                }
            },
            (error)=>{
                Toast.message(error.message);
            }
        )
    }
}