import {create} from 'zustand';

export const useAuthStore = create(set => ({
    authUser: null,
    isLoggedIn: false,
    isLoading: false,

    login: () => {
        console.log("Login");
        set({isLoggedIn: true, isLoading: true});
    }
}));