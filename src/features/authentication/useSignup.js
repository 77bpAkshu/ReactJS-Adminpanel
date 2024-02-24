import { useMutation } from "@tanstack/react-query";
import { signup as signupApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useSignup() {
    const {mutate: signup, isLoading: isSignup} = useMutation({
        mutationFn: signupApi,
        onSuccess: (user) => {
            toast.success('User created successfully');
        },
        onError: (err) => toast.error(err.message)
    });

    return {signup, isSignup};
}

