import { UPDATEFILTER } from '../constants/actionTypes';

//Action Creators

export const updateFilter = (genre) => (dispatch) => {
    try {
        dispatch({ type: UPDATEFILTER, payload: genre });
    } catch (error) {
        console.log(error);
    }
}