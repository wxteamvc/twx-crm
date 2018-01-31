import * as Types from "./actionTypes";
import * as Urls from "../constants/urls";
import Util from "../constants/util";
import { Toast } from 'teaset';


export function bindWechat(data){
    return (dispatch)=>{
        Util.post(Urls.Bind_wechat+'/'+data,{},
            (respJson)=>{
                if (respJson.code == 1){
                    dispatch({
                        type:Types.Change_User_Info,
                        data:respJson.data
                    })
                    Toast.success(respJson.msg);
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

export function unbindWeChat(data){
    return (dispatch)=>{
        Util.post(Urls.Unbind_wechat,{},
            (respJson)=>{
                if (respJson.code == 1){
                    dispatch({
                        type:Types.Change_User_Info,
                        data:respJson.data
                    })
                    Toast.success(respJson.msg);
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

export function loginWithWechat(data,type=1){
    return (dispatch)=>{
        dispatch({
            type:Types.UserInfo_BEGIN
        })
        let register_id = global.registrationId ? global.registrationId : null;
        Util.post(Urls.Login_wechat_url+'/'+data,{register_id},
            (respJson)=>{
                let token = '';
                if (respJson.code == 1){
                    dispatch({
                        type:Types.UserInfo_SUCCESS,
                        data:respJson.data
                    })
                    token = respJson.data.token;
                }else{
                    dispatch({
                        type:Types.UserInfo_FAILED,
                    })
                    Toast.fail(respJson.msg);
                }
                dispatch({
                    type:Types.Change_TOKEN,
                    data:token
                })
            },
            (error)=>{
                dispatch({
                    type:Types.UserInfo_FAILED,
                })
                Toast.message(error.message);
            }
        )
    }
}

export function login(data,type=1){
    return (dispatch)=>{
        dispatch({
            type:Types.UserInfo_BEGIN
        })
        let register_id = global.registrationId ? global.registrationId : null;
        Util.post(Urls.Login_url,{...data,register_id},
            (respJson)=>{
                console.log(respJson)
                let token = '';
                if (respJson.code == 1){
                    dispatch({
                        type:Types.UserInfo_SUCCESS,
                        data:respJson.data
                    })
                    token = respJson.data.token;
                }else{
                    dispatch({
                        type:Types.UserInfo_FAILED,
                    })
                    Toast.fail(respJson.msg);
                }
                dispatch({
                    type:Types.Change_TOKEN,
                    data:token 
                })
            },
            (error)=>{
                dispatch({
                    type:Types.UserInfo_FAILED,
                })
                Toast.message(error.message);
            }
        )
    }
}

export function initPersonal(){
    return (dispatch) =>{
        dispatch({
            type:Types.UserInfo_BEGIN
        })
        Util.post(Urls.UserInfo_url,{},
            (respJson) =>{
                let token = '';
                if (respJson.code == 1){
                    dispatch({
                        type:Types.UserInfo_SUCCESS,
                        data:respJson.data
                    })
                   token = respJson.data.token;
                }else{
                    dispatch({
                        type:Types.UserInfo_FAILED,
                    })
                    Toast.fail(respJson.msg);
                }
                dispatch({
                    type:Types.Change_TOKEN,
                    data:token
                })
            },
            (error)=>{
                dispatch({
                    type:Types.UserInfo_FAILED,
                })
                Toast.message(error.message);
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

export function uploadAvatar(data){
    return (dispatch)=>{
        Util.post(Urls.Upload_avatar,data,
            (respJson)=>{
                if (respJson.code == 1){
                    dispatch({
                        type:Types.Upload_Avatar_SUCCESS,
                        data:respJson.data
                    })
                }else{
                    Toast.message(respJson.msg);
                }
            },
            (error)=>{
                console.log(error)
                Toast.message(error.message);
            }
        )

    }
}