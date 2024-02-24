import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSetting as updateSettingApi } from "../../services/apiSettings";
import toast from "react-hot-toast";

export function useUpdateSettings() {
    const queryClient = useQueryClient();
    const {mutate: updateSetting, isLoading: isEditing} = useMutation({
        mutationFn: updateSettingApi,
        onSuccess: () => {
            toast.success('settings updated successfully');
            queryClient.invalidateQueries({
                queryKey: ['settings']
            })
        },
        onError: (err) => toast.error(err.message)
    });
    return {isEditing, updateSetting};
}

