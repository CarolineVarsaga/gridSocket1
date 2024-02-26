import { io } from 'socket.io-client'; 
const socket = io('http://localhost:3001');

let sendMessage = document.getElementById('sendMessage');
let sendBtn = document.getElementById('sendBtn');
let chatList = document.getElementById('chatList'); 

sendBtn.addEventListener('click', () => {
  console.log('send chat', sendMessage.value);
  socket.emit('chat', sendMessage.value); 
})

socket.on('chat', (arg) => {
  console.log('socket', arg);
  updateChat(arg);
})

function updateChat(chat) {
  let li = document.createElement('li'); 
  li.innerText = chat; 
  chatList.appendChild(li); 
}