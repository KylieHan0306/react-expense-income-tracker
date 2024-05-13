import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const billListStore = createSlice({
    name: 'billList',
    initialState: {
        billList: []
    },
    reducers: {
        setBillList(state, action) {
            state.billList = action.payload
        },
        addBill(state, action) {
            state.billList.push(action.payload);
        }
    }
}) 

const {setBillList, addBill} = billListStore.actions

const fetchBillList = () => {
    return async (dispatch) => {
        const res = await axios.get('http://localhost:4000/bills')
        dispatch(setBillList(res.data))
    }   
}

const fetchAddBill = (data) => {
    return async (dispatch) => {
        const res = await axios.post('http://localhost:4000/bills', data)
        if (res.status >= 200 && res.status < 300) {
            dispatch(addBill(data))
        }
    }
}
export { fetchBillList, fetchAddBill }
export default billListStore.reducer