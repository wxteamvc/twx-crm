const myChatState = {
    newMessage:null
}
export function myChatReducer(state = myChatState, action) {
    switch (action.type) {
        case 'mergeChatList':
            let { data } = action.data
            if (action.data.type == 'receive'){
                return {
                    ...state,
                    newMessage:null,
                    [data.from]:state[data.from] ? [data].concat(state[data.from]) : [data]
                }
            }else{
                return {
                    ...state,
                    newMessage:null,
                    [data.to]:state[data.to] ? [data].concat(state[data.to]) : [data]
                }
            }
           
        case 'addChatList':
            return {
                ...state,
                newMessage:action.data
            }
        case 'addHistory':
            return {
                ...state,
                [action.data.scope]:state[action.data.scope] ? state[action.data.scope].concat(action.data.data) : action.data.data
            }
        case 'cleanChat':
            return myChatState
        default:
            return state;
    }
}