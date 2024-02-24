import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useLogin() {

    const navigate = useNavigate();
    const queryClient = useQueryClient();
    
    const {mutate: login, isLoading: isLogin} = useMutation({
        mutationFn: ({email, password}) => loginApi({email, password}),
        onSuccess: (user) => {
            //console.log(user);
            queryClient.setQueryData(['user'], user.user);
            toast.success('User Loged in Successfully...');
            navigate('/', { replace: true });
        },
        onError: (err) => toast.error('Provided email or password are incorrect')
    });

    return { isLogin, login };
}

