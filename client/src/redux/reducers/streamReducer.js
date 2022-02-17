import {
	CREATE_STREAM,
	DELETE_STREAM,
	EDIT_STREAM,
	FETCH_STREAM,
	FETCH_STREAMS,
} from "../actions/types";
import _ from "lodash";

const streamReducer = (state = {}, action) => {
	switch (action.type) {
		case FETCH_STREAMS:
			// LODASH FUNCTION
			//-- method is used to create an object with the same values as the object
			//and the keys created by running each of the object’s own enumerable string keys.
			return { ...state, ..._.mapKeys(action.payload, "id") };
		case FETCH_STREAM:
			// THIS IS A KEY INTERPOLATION ES6
			return { ...state, [action.payload.id]: action.payload };
		case CREATE_STREAM:
			return { ...state, [action.payload.id]: action.payload };
		case EDIT_STREAM:
			return { ...state, [action.payload.id]: action.payload };
		case DELETE_STREAM:
			// LODASH FUNCTION
			// -- method is used to return a copy of the object that composed of the own and inherited enumerable property
			// paths of the given object that are not omitted.
			// It is the opposite of the _.pick() method.
			return _.omit(state, action.payload);
		default:
			return state;
	}
};

export default streamReducer;
