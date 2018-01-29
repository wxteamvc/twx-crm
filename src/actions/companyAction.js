import * as Types from "./actionTypes";
import * as Urls from "../constants/urls";
import Util from "../constants/util";
import { Toast } from 'teaset';

export function getCompanyList(geo={},url=false){
    return (dispatch) =>{
        dispatch({
            type:Types.CompanyList_BEGIN
        })
        Util.post(url ? url : Urls.CompanyList_url,geo,
            (respJson) =>{
                if (respJson.code == 1){
                    dispatch({
                        type:Types.CompanyList_SUCCESS,
                        data:respJson.data
                    })
                }else{
                    dispatch({
                        type:Types.CompanyList_SUCCESS,
                        data:respJson.data
                     })
                     Toast.fail(respJson.msg);
                }
            },
            (error)=>{
                dispatch({
                    type:Types.CompanyList_FAILED,
                })
                Toast.fail(error.message);
            }
        )
    }
}