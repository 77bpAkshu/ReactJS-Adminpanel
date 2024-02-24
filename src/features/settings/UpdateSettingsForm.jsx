import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import Spinner from '../../ui/Spinner';
import { useSettings } from './useSettings';
import { useUpdateSettings } from './useUpdateSettings';

function UpdateSettingsForm() {

  const {isLoading, error, settings: {
    minimumBookingLength,
    maxBookingLength,
    maxGuestsPerBooking,
    breakfastPrice
  }={}} = useSettings();

  const {isEditing, updateSetting} = useUpdateSettings();

  if(isLoading) return <Spinner />;

  function handleUpdate(e, feild) {
    const {value} = e.target;
    if(!value) return;
    updateSetting({[feild]: value});
  }

  return (
    <Form>
      <FormRow label='Minimum nights/booking'>
        <Input 
          type='number' id='min-nights'
          defaultValue={minimumBookingLength} 
          onBlur={e => handleUpdate(e, 'minimumBookingLength')}
          disabled={isEditing}
        />
      </FormRow>

      <FormRow label='Maximum nights/booking'>
        <Input 
          type='number' id='max-nights' 
          defaultValue={maxBookingLength}
          onBlur={e => handleUpdate(e, 'maxBookingLength')}
          disabled={isEditing} 
        />
      </FormRow>

      <FormRow label='Maximum guests/booking'>
        <Input 
          type='number' 
          id='max-guests' 
          defaultValue={maxGuestsPerBooking}
          onBlur={e => handleUpdate(e, 'maxGuestsPerBooking')}
          disabled={isEditing} 
        />
      </FormRow>

      <FormRow label='Breakfast price'>
        <Input 
          type='number' id='breakfast-price' 
          defaultValue={breakfastPrice} 
          onBlur={e => handleUpdate(e, 'breakfastPrice')}
          disabled={isEditing}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
