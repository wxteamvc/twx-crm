import * as Types from './actionTypes';
import * as Urls from "../constants/urls";
import Util from "../constants/util";
import { Toast } from 'teaset';

export function getFormOptions(){
    return (dispatch) =>{
        dispatch({
            type:Types.Get_Task_Form_BEGIN
        })
        Util.post(Urls.Get_task_form_options,{},
             (respJson) =>{
                if (respJson.code == 1){
                    dispatch({
                        type:Types.Get_Task_Form_SUCCESS,
                        data:respJson.data
                    })
                }else{
                    dispatch({
                        type:Types.Get_Task_Form_FAILED,
                        data:respJson.data
                     })
                     Toast.fail(respJson.msg);
                }
            },
            (error)=>{
                dispatch({
                    type:Types.Get_Task_Form_FAILED,
                })
                Toast.fail(error.msg);
            }
        )
    }
}

export function getTaskList(){
    return (dispatch) =>{
        dispatch({
            type:Types.Get_Task_List_BEGIN
        })
        Util.post(Urls.TASKLIST_URL,{},
             (respJson) =>{
                if (respJson.code == 1){
                    dispatch({
                        type:Types.Get_Task_List_SUCCESS,
                        data:respJson.data
                    })
                }else{
                    dispatch({
                        type:Types.Get_Task_List_FAILED,
                        data:respJson.data
                     })
                     Toast.fail(respJson.msg);
                }
            },
            (error)=>{
                dispatch({
                    type:Types.Get_Task_List_FAILED,
                })
                Toast.fail(error.msg);
            }
        )
    }
}
