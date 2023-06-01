import { io } from 'socket.io-client';
import { useUserStore } from 'src/stores/user-store';

const userStore = useUserStore();

const socket = io('http://localhost:3900', {
  query: { walletAddress: userStore.walletAddress }
});

socket.on('testPlease', (data) => {
  console.log(data)
})

socket.on('investment_notifications', (data) => {
  console.log(data)
})

