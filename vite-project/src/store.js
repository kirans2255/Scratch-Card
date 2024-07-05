import { configureStore } from '@reduxjs/toolkit';
import rewardsReducer from '../src/rewards/rewardsSlice';

export const store = configureStore({
  reducer: {
    rewards: rewardsReducer,
    //  more reducers 
  },
});
