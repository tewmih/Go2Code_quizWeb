import { createStore } from 'redux';

// Initial state with user data grouped together
const initialState = {
    count: 0,
    user: {
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        url: '',
    },
};

// Global reducer function
const globalReducer = (state = initialState, action) => {
    switch (action.type) {
        // Update user information
        case 'SET_USER':
            return { ...state, user: { ...state.user, ...action.payload } };
        case 'CLEAR_USER':
            return { ...state, user: initialState.user }; // Reset user data to initial state
        case 'INCREMENT_COUNT':
            return { ...state, count: state.count + 1 };
        case 'DECREMENT_COUNT':
            return { ...state, count: state.count - 1 };
        default:
            return state;
    }
};


// Create Redux store
const store = createStore(globalReducer);

export default store;
