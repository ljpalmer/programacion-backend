const socket = io();

let user;
const chatBoxCoder = document.querySelector('#chatBoxCoder');

Swal.fire({
  title: 'Acceder al chat',
  text: 'Ingresa tu nombre',
  input: 'text',
  icon: 'question',
  inputValidator: (value) => {
    return !value && 'Escribe tu nombre para empezar a chatear';
  },
  allowOutsideClick: false,
}).then((result) => {
  user = result.value;
  console.log({ user });
  socket.emit('new_user', { user });
});

socket.on('user_connected', (data) => {
  let timerInterval;
  Swal.fire({
    title: 'Nuevo usuario conectado',
    text: `${data.user} se acaba de conectar`,
    timer: 2000,
    timerProgressBar: true,
    didOpen: () => {
        Swal.showLoading()
        const b = Swal.getHtmlContainer().querySelector('b')
        timerInterval = setInterval(() => {
          b.textContent = Swal.getTimerLeft()
        }, 100)
      },
    willClose: () => {
        clearInterval(timerInterval)
      },
    toast: true,
    position: 'top-right',
  }).then((result) => {    
    if (result.dismiss === Swal.DismissReason.timer) {    
    }
  });
});

socket.on('messageLogs', (data) => {
    const log = document.querySelector('#messageLogs');
    const messages = data
      .map((message) => `<p>${message.user} dice: ${message.message}<p>`)
      .join('');
    log.innerHTML = messages;
  });
  
chatBoxCoder.addEventListener('keyup', (event) => {
  if (event.key === 'Enter') {
    if (chatBoxCoder.value.trim().length > 0) {
      socket.emit('message', {
        user: user,
        message: chatBoxCoder.value,
      });
      chatBoxCoder.value = '';
    }
  }
});