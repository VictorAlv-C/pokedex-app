const INITIAL_STATE = {
name: "",
page: 1,
pokemon_show: 16,
rangeFilterPage:{
    firtsIndex: 0,
    lastIndex: 10
},
type_select: "All"

}

const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "SET_NAME":
            return {...state, name: action.payload}
        case "SELECT_TYPE":
            return {...state, type_select: action.payload}
        case "SET_PAGE":
            return {...state, page: action.payload }
        case "NEXT_RANGE":
            return {...state, rangeFilterPage: {
                                                firtsIndex: state.rangeFilterPage.firtsIndex + 1,
                                                lastIndex: state.rangeFilterPage.lastIndex + 1
                                                }
                    }
        case "PREV_RANGE":
            return {...state, rangeFilterPage: {
                                                firtsIndex: state.rangeFilterPage.firtsIndex - 1,
                                                lastIndex: state.rangeFilterPage.lastIndex - 1
                                                }
                    }
        case "RESET_RANGE":
            return{...state, rangeFilterPage: {firtsIndex: 0, lastIndex: 10}}
        default:
            return state;
    }
    
}

export default reducer;