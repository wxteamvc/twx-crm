import * as Types from "./actionTypes";
import * as Urls from "../constants/urls";
import Util from "../constants/util";
import { Toast } from 'teaset';



export function getOrderList(nextUrl=false) {
    return (dispatch) => {
        dispatch({
            type: Types.OrderList_BEGIN
        })
        Util.post(nextUrl?nextUrl:Urls.Get_orderList, {},
            (respJson) => {
                if (respJson.code == 1) {
                    dispatch({
                        type: Types.OrderList_SUCCESS,
                        data: respJson.data
                    })
                } else {
                    dispatch({
                        type: Types.OrderList_SUCCESS,
                        data: respJson.data
                    })
                    Toast.fail(respJson.msg);
                }
            },
            (error) => {
                dispatch({
                    type: Types.OrderList_FAILED,
                })
                Toast.fail(error.message);
            }
        )
    }
}