const myChatState = {
    newMessage:null
}
export function myChatReducer(state = myChatState, action) {
    switch (action.type) {
        case 'mergeChatList':
            let newChat=[];
            if (state[action.data.target]){
                newChat = state[action.data.target].concat(action.data.data)
            }else{
                newChat =[action.data.data]
            }
            return {
                ...state,
                newMessage:null,
                [action.data.target]:newChat
            }
        case 'addChatList':
            return {
                ...state,
                newMessage:action.data
            }
        default:
            return state;
    }
}