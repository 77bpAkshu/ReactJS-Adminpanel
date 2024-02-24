import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

export function useEditCabin() {
    const queryClient = useQueryClient();
    const { mutate: updateCabin, isLoading: isEditing} = useMutation({
        mutationFn: ({newCabinData, id}) => createEditCabin(newCabinData, id),
        onSuccess: () => {
        toast.success('Cabin successfully updated');
        queryClient.invalidateQueries({
            queryKey: ['cabin']
        });
        //reset();
        },
        onError: (err) => toast.error(err.message)
    });

    return {isEditing, updateCabin};
}

