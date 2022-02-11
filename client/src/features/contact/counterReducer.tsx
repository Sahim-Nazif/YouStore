export const INCRECMENT_COUNTER="INCRECMENT_COUNTER";
export const DECREMENT_COUNTER="DECREMENT_COUNTER"


export interface CounterState{

    data:number;
    title:string;
}

const initialState:CounterState={
    data:42,
    title:'REDUX LEARNING'
}

export function increment(amount=1) {
    return {
        type:INCRECMENT_COUNTER,
        payload:amount
    }
}
export function decrement(amount=1) {
    return {
        type:DECREMENT_COUNTER,
        payload:amount
    }
}
export default function counterReducer(state=initialState, action:any) {

    switch (action.type) {
        case INCRECMENT_COUNTER:
        return{
            ...state,
            data:state.data + action.payload
            
        }
        case DECREMENT_COUNTER:
            return{
                ...state,
                data:state.data - action.payload
                
            }
            default:
                return state;
    }


}
