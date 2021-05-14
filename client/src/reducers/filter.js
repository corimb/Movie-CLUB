import { UPDATEFILTER } from '../constants/actionTypes';

// eslint-disable-next-line import/no-anonymous-default-export
export default (filter = '', action) =>{
    switch (action.type) {
        case UPDATEFILTER:
            filter = action.payload
            return filter
        default:
            filter = '';
            return filter;
        }
}

//the state must have a value. In this case the state will be the posts and at first it is equal to an empty array 