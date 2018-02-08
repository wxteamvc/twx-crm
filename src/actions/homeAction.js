import * as Types from './actionTypes';
import * as Urls from "../constants/urls";
import Util from "../constants/util";
import { Toast } from 'teaset';

export function getHomeInfo() {
    return (dispatch) => {
        dispatch({
            type: Types.Home_BEGIN
        })
        Util.post(Urls.HomeInfo_url, {},
            (respJson) => {
                console.log(respJson)
                if (respJson.code == 1) {
                    dispatch({
                        type: Types.Home_SUCCESS,
                        data: respJson.data
                    })
                } else {
                    Toast.fail(respJson.msg);
                }
            },
            (error) => {
                dispatch({
                    type: Types.Home_FAILED,
                })
                Toast.fail(error.message);
            }
        )
    }
}
