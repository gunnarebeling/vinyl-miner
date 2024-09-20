export const formReducer = (state, action) => {
    switch (action.type){
        case 'setNewInfo':
            return action.payload
        case 'handleInput': 
            return {
                ...state,
                [action.field]: action.value
            }
        default:
            return state;
                
            
    }
}