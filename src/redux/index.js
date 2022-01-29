const INITIAL_STATE = {
name: "",
page: 1,
pokemon_show: 16,
type_select: "All"

}

const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "SET_NAME":
            return {...state, name: action.payload}
        case "NEXT_PAGE":
            return {...state, page: state.page + 1}
        case "PREV_PAGE":
            return {...state, page: state.page - 1}
        case "SELECT_TYPE":
            return {...state, type_select: action.payload}
        
        default:
            return state;
    }
    
}

export default reducer;