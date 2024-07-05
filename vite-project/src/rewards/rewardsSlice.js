import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  rewards: [
    { id: 1, description: 'Red Bus 100% Offer', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Redbus_logo.jpg/1200px-Redbus_logo.jpg', revealed: false },
    { id: 2, description: 'Pizza Hut Free Pizza', image: 'https://play-lh.googleusercontent.com/aVcnk6c53Z3KKRTi0ivDYucToT1SEfPrOUaLr3b7HVeVC6nXtVDaPCqI3U7_d94IYjQ', revealed: false },
    { id: 3, description: 'Flat 100% offer Max', image: 'https://yt3.googleusercontent.com/UfRF50WJy1JoKiz-gISyLXqkMHQQb4edJShU2a6TmV7RGL5LA-qgbw7Lo0a94Av_Cf3ysa9nC0Q=s900-c-k-c0x00ffffff-no-rj', revealed: false },
    { id: 4, description: 'Flat ₹200 off from Minimalist spend of ₹499', image: 'https://vanitywagon.in/cdn/shop/products/Minimalist_2_Salicylic_Acid_LHA_Cleanser-1-1_1080x1080.jpg?v=1663153028', revealed: false },
    { id: 5, description: '2 months Audible Membership', image: 'https://m.media-amazon.com/images/I/51iKw5dFQoL.png', revealed: false },
    { id: 6, description: 'Flat ₹6001 off on SkullCandy Ear Buds', image: 'https://i.pinimg.com/originals/32/93/ad/3293ada6e2b3c00d72f5d8176bb9bb7f.jpg', revealed: false },
    { id: 7, description: 'Free ₹5000 Bonus Cash on 1st deposit on My11Circle', image: 'https://play-lh.googleusercontent.com/naDwq4gUQOP4WMMint3ceslLabjby9L_k6swuvw0QRMGFmulXKMtQN4dD5veZluZWCQ', revealed: false },
    { id: 8, description: '₹5-₹10 cashback on Merchant payement',  revealed: false },
  ],
};

const rewardsSlice = createSlice({
  name: 'rewards',
  initialState,
  reducers: {
    updateRewardState: (state, action) => {
      const { id, revealed } = action.payload;
      const rewardToUpdate = state.rewards.find(reward => reward.id === id);
      if (rewardToUpdate) {
        rewardToUpdate.revealed = revealed;
      }
    },
  },
});

export const { updateRewardState } = rewardsSlice.actions;
export const selectRewards = state => state.rewards.rewards;

export default rewardsSlice.reducer;
