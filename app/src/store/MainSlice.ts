import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import ax from '../axiosConfig';
import { ItemType} from '../types';

interface IInitialState {
    list: Array<ItemType>
    loading: boolean;
    itemById: ItemType | null
}

const initialState: IInitialState = {
    list: [],
    loading: false,
    itemById: null
}

export const getList = createAsyncThunk('getList', async (_, { rejectWithValue }) => {
    try {
        const { data } = await ax.get('/items')
        return data
    } catch (error) {
        rejectWithValue(error)
    }
})

export const addItem = createAsyncThunk('addItem', async (payload: ItemType, { rejectWithValue }) => {
    try {
        const { data } = await ax.post('/items', payload)
        return data
    } catch (error) {
        rejectWithValue(error)
    }
})

export const getItemById = createAsyncThunk('getItemById', async (payload: number, { rejectWithValue }) => {
    try {
        const { data } = await ax.get(`/items/${payload}`)
        return data
    } catch (error) {
        rejectWithValue(error)
    }
})

export const updateItem = createAsyncThunk('updateItem', async (payload: ItemType, { rejectWithValue }) => {
    try {
        const { data } = await ax.put(`/items/${payload.id}`, payload)
        return data
    } catch (error) {
        rejectWithValue(error)
    }
})

const MainSlice = createSlice({
    name: 'main',
    initialState, 
    reducers: {
        clearItemById: (state) => {
            state.itemById = null
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getList.pending, (state) => {
            state.loading = true
        })
        builder.addCase(getList.fulfilled, (state, action) => {
            state.loading = false
            state.list = action.payload
        })
        builder.addCase(getList.rejected, (state) => {
            state.loading = false
        })

        builder.addCase(getItemById.pending, (state) => {
            state.loading = true
        })
        builder.addCase(getItemById.fulfilled, (state, action) => {
            state.loading = false
            state.itemById = action.payload
        })
        builder.addCase(getItemById.rejected, (state) => {
            state.loading = false
        })

        builder.addCase(updateItem.pending, (state) => {
            state.loading = true
        })
        builder.addCase(updateItem.fulfilled, (state, action) => {
            state.loading = false
            state.itemById = action.payload
        })
        builder.addCase(updateItem.rejected, (state) => {
            state.loading = false
        })
    }
})

export const { clearItemById } = MainSlice.actions

export default MainSlice.reducer