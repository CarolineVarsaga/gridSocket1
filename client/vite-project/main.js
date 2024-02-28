import { io } from 'socket.io-client';
const socket = io('http://orca-app-rblx6.ondigitalocean.app');

let sendMessage = document.getElementById('sendMessage');
let sendBtn = document.getElementById('sendBtn');
let chatList = document.getElementById('chatList'); 
let myName = "User";


sendBtn.addEventListener('click', () => {
  let messageObject = { message: sendMessage.value, sender: myName }
  console.log('send chat', sendMessage.value);
  socket.emit('chat', messageObject.message); //skickar meddelande
  socket.emit
  updateChat(sendMessage.value, 'sent');
  sendMessage.value = '';
})

socket.on('chat', (arg) => {
  console.log('main.js - socket', arg);
  if (arg.sender !== myName) {
    updateChat(arg, 'received');
  }  
}) 
 
function updateChat(chat, sender) {
  let li = document.createElement('li'); 
  li.innerText = chat; 
  let div = document.createElement('div');
  //div.classList.add('li-container')
  if (sender === 'sent') {
    li.classList.add('sent')
    div.classList.add('sent-container')
  } else {
    li.classList.add('received')
    div.classList.add('received-container')
  }
  div.appendChild(li);
  chatList.appendChild(div)
} 