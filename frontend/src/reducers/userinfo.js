import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    user: {
        id: false,
        accessToken: false,
        loggedIn: false
    }
}

export const userProfile = createSlice({
    name: 'userProfile',
    initialState,
    reducers: {

        //reducer to set id and token with that recieved from backend
        loggedIn: (state, action) => {
            const { id, accessToken, loggedIn } = action.payload
            state.user.id = id;
            state.user.accessToken = accessToken;
            state.user.loggedIn = loggedIn
        },
        //reduer to set id and token to false when user logs out
        logOut: (state) => {
            state.user.id = false;
            state.user.accessToken = false
        }
    }
})