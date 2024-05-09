import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: 0,
  data:''
}

export const counterslice = createSlice({
    name: 'reg',
    initialState,
    reducers: {
        adddata:(state,action)=>{
        state.data=action.payload
      }
    },
  })
  export const {adddata } = counterslice.actions
  
  export default counterslice.reducer
