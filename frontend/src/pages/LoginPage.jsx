import {useAuthStore} from "../store/useAuthStore.js";

function LoginPage() {
    const {authUser, isLoading, login} = useAuthStore();

    return (
        <div>
            Login Page
        </div>
    )
}

export default LoginPage