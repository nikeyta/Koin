'use client'
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import addRecord from '@/app/actions/addRecordtoDb';
import suggestCategory from '@/app/actions/suggestCategory';

declare type AlertType = 'error' | 'success' | '';

declare interface ExpenseFormData {
  text: string;
  date: string;
  category: string;
  amount: number;
}


const AddRecordForm = ()=>{
  const [alertType, setAlertType] = useState<AlertType>("");
  const [isLoading, setisLoading] = useState(false) // spinner for submit
  const [isCategorising, setisCategorising] = useState(false)
  const [alertMessage, setAlertMessage] = useState(""); //Stores success/error messages to show users

  const {register, handleSubmit, watch, setValue, reset, formState:{errors}} = useForm(
    {
      defaultValues : {
        text : '',
        date : '',
        category : '',
        amount : 0
      }
    }
  )

  const description = watch('text');// monitors the description input field, to enable ai btn

  const onSubmit = async (data : ExpenseFormData)=>{
    try{
      setisLoading(true)

      const formData = new FormData();
      Object.entries(data).forEach(([Key, value])=>{
        formData.append(Key, value.toString());
      })

      const {error} = await addRecord(formData) //Send data to server
      if(error){
        setAlertMessage(`Error : ${error}`)
        setAlertType('error');
      }else{
        setAlertType('success');
        setAlertMessage('expense added successfully')
        reset()
      }
    }catch{
      setAlertMessage('An unexpected error occurred. Please try again.');
    }finally{
setisLoading(false);
    }
      
  }
  
  const handleAISuggestCategory = async ()=>{
      if(!description?.trim()){
        setAlertMessage('please enter a description')
        setAlertType('error');
        return
      }

      setisCategorising(true)

      try{
        const {category, error} = await suggestCategory(description)
        if(error){
          setAlertMessage(`AI Suggestion error : ${error}`)
          setAlertType('error');
        }else{
          setValue('category', category!)
           setAlertType('success');
          setAlertMessage(`AI successfully suggested a category`)
        }
      }catch(error){
        setAlertMessage('Failed to get AI category')
        setAlertType('error');
      }finally{
        setisCategorising(false)
      }
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="text">expense description</label>
        <input 
        type="text" 
        id='text' 
        {...register('text', {required: true})}
        placeholder='coffee, groceries, gas...'
        />
        {errors.text && (<p>{errors.text.message}</p>)}
        <button
        onClick={handleAISuggestCategory}
        disabled={isCategorising || !description?.trim()}
        >
          {isCategorising ? ( <div className='w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin'></div>) 
          : ('✨')}
        </button>
        
        <label htmlFor="date">Date</label>
        <input type="date" id='date' 
        {...register('date', {required : true})}
        onFocus={(e) => e.target.showPicker()}
        />
        {errors.date && (<p>{errors.date.message}</p>)}

        <label htmlFor="category">Select category</label>
        <select id="category"
        {...register('category', {required : true})}
        >
          <option value='Food'> 🍔 Food & Dining</option>
              <option value='Transportation'>🚗 Transportation</option>
              <option value='Shopping'>🛒 Shopping</option>
              <option value='Entertainment'>🎬 Entertainment</option>
              <option value='Bills'>💡 Bills & Utilities</option>
              <option value='Healthcare'>🏥 Healthcare</option>
              <option value='Other'>📦 Other</option>
        </select>
        {errors.category && (<p>{errors.category.message}</p>)}

        <label htmlFor="amount">enter amount</label>
        <input type="number" id='number'
        min='0'
        max='10000'
        step = '0.01'
        {...register('amount', { required : true, min : {value : 0, message : 'amount must be positive'}, max : {value : 10000, message : 'amount cannot exceed 10000'}})}
        placeholder='0.00'
        />
         {errors.amount && (<p>{errors.amount.message}</p>)}

        <button type='submit' disabled={isLoading}>Submit</button>

        {alertMessage && (
        <div
          className={`mt-4 p-3 rounded-lg border-l-4 ${
            alertType === 'success'
              ? 'bg-green-50 border-l-green-500 text-green-800'
              : 'bg-red-50 border-l-red-500 text-red-800'
          }`}
        >
          <div className='flex items-center gap-2'>
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center ${
                alertType === 'success'
                  ? 'bg-green-100'
                  : 'bg-red-100'
              }`}
            >
              <span className='text-sm'>
                {alertType === 'success' ? '✅' : '⚠️'}
              </span>
            </div>
            <p className='font-medium text-sm'>{alertMessage}</p>
          </div>
        </div>
      )}

      </form>
    </div>
  )
}

export default AddRecordForm
