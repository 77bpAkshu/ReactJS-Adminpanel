import styled from "styled-components";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";
import FormRow from "../../ui/FormRow";



function CreateCabinForm() {

  const { register, handleSubmit, reset, getValues, formState } = useForm();

  const { errors } = formState;
  console.log(errors);

  const queryClient = useQueryClient();

  const { mutate, isLoading: isCreating} = useMutation({
    mutationFn: createCabin,
    onSuccess: () => {
      toast.success('New Cabin successfully created');
      queryClient.invalidateQueries({
        queryKey: ['cabin']
      });
      reset();
    },
    onError: (err) => toast.error(err.message)
  });


  function onSubmit(data) {
    //console.log(data.image[0]);
    mutate({...data, image: data.image[0]});

  }

  function onError(errors) {
    //console.log(errors);

  }

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow label="Cabin name" error={errors?.name?.message}>
        <Input type="text" id="name" disabled={isCreating} {...register("name", {
          required: "Name is required",
          min: {
            value: 3,
            message: "Name atleast 3 character"
          }
        })} />
      </FormRow>

      <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
        <Input type="number" id="maxCapacity" disabled={isCreating} {...register("maxCapacity", {
          required: "Maximum Capacity is required",
          min: {
            value: 1,
            message: "Capacity should be at least 1"
          }
        })} />
      </FormRow>

      <FormRow label="Regular price" error={errors?.regularPrice?.message}>
        <Input type="number" id="regularPrice" disabled={isCreating}  {...register("regularPrice", {
          required: "Price is required",
          min: {
            value: 1,
            message: "Price should be at least 1"
          }
        })} />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input type="number" id="discount" disabled={isCreating} defaultValue={0}  {...register("discount", {
          required: "Discount is required",
          validate: (value) => value <= getValues().regularPrice || "Discount should be less than regular price",
        })} />
      </FormRow>

      <FormRow label="Description for website" error={errors?.discription?.message}>
        <Textarea type="number" id="discription" disabled={isCreating} defaultValue=""  {...register("discription", {
          required: "Description is required",
        })} />
      </FormRow>

      <FormRow label="Cabin photo">
        <FileInput id="image" accept="image/*"  {...register("image", {
          required: "Image is required",
        })} />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isCreating}>Add cabin</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
