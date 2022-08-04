import { configureStore } from '@reduxjs/toolkit';
import wizardReducer from '../components/UI/Wizard/wizardSlice';

export default configureStore({
    reducer: {
        wizard: wizardReducer,
    },
});
