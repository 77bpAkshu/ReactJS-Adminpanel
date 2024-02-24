import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useSignup } from "./useSignup";

// Email regex: /\S+@\S+\.\S+/

function SignupForm() {

  const {register, formState, getValues, handleSubmit, reset} = useForm();
  const {errors} = formState;
  const {signup, isSignup} = useSignup();

  function onSubmit({fullName, email, password}) {
    signup({fullName, email, password}, {
      onSettled: () => reset(),
    });

  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Full name" error={errors?.fullName?.message}>
        <Input 
          type="text" 
          id="fullName" 
          {...register("fullName", { required: "This feild is required"})}
          disabled={isSignup} 
        />
      </FormRow>

      <FormRow label="Email address" error={errors?.email?.message}>
        <Input 
          type="email" 
          id="email"
          {...register("email", { 
            required: "This feild is required", 
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Please provide a valid Email address"
            }
          })}
          disabled={isSignup}
        />
      </FormRow>

      <FormRow label="Password (min 8 characters)" error={errors?.password?.message}>
        <Input 
          type="password" 
          id="password" 
          disabled={isSignup}
          {...register("password", { 
            required: "This feild is required",
            minLength: {
              value: 8,
              message: 'Password needs a minimum of 8 characters'
            }
          })}
        />
      </FormRow>

      <FormRow label="Repeat password" error={errors?.passwordConfirm?.message}>
        <Input 
          type="password" 
          id="passwordConfirm" 
          disabled={isSignup}
          {...register("passwordConfirm", { 
            required: "This feild is required",
            validate: (value) => 
              value === getValues().password || 
              'Passwords need to match',
            
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button disabled={isSignup} variation="secondary" type="reset" onClick={reset}>
          Cancel
        </Button>
        <Button disabled={isSignup}>Create new user</Button>
      </FormRow>
    </Form>
  );
}

export default SignupForm;
