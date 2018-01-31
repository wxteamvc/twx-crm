/**
 * 聊天socket
 *
 */

'use strict';

let ws = null;

let Tchat = {
    //初始化方法，必须在之前调用
    init:(url=null,port=null)=>{
        if (url && port){
            ws = new WebSocket(`ws://${url}:${port}`);
            return Tchat;
        }
    },
    login:(username)=>{
        if (ws){
            ws.send(JSON.stringify({type:'login',data:username}));
        }
    },
    send:(message)=>{
        if (ws){
            ws.send(message);
        }
    },
    addWebSocketOnOpenListener:(callBack)=>{
        if (ws){
            ws.onopen = ()=>callBack();
        }
    },
    addWebSocketOnMessageListener:(callBack)=>{
        if (ws){
            ws.onmessage = (e)=>callBack(e);
        }
    },
    addWebSocketOnErrorListener:(callBack)=>{
        if (ws){
            ws.onerror = (e)=>callBack(e);
        }
    },
    addWebSocketOnCloseListener:(callBack)=>{
        if (ws){
            ws.onclose = (e)=>callBack(e);
        }
    },
    close:()=>{
        if (ws){
            ws.close();
            return false;
        }
    }


}

export default Tchat;