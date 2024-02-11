import { configureStore } from '@reduxjs/toolkit'
import monstersReducer from './slices/monstersSlice'




export default configureStore({
    
    reducer: {
        monsters: monstersReducer
    }
}) 