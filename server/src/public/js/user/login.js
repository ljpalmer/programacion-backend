let button = document.querySelector('#btn')
button.addEventListener('click', (event)=> {
    //event.preventDefault();
    //location.href = 'http://localhost:9090/products';
})
// const form = document.getElementById("loginForm");
//
// form.addEventListener('submit', e => {
//     e.preventDefault();
//     const data = new FormData(form);
//     const obj = {};
//     data.forEach((value, key) => obj[key] = value);
//     fetch('../api/jwt/login', {
//         method: 'POST',
//         body: JSON.stringify(obj),
//         headers: {
//             'Content-Type': 'application/json'
//         }
//     }).then(result => {
//         if (result.status == 200) {
//             result.json()
//                 .then(json => {
//                     console.log(json);
//                     localStorage.setItem('authToken', json.jwt);
//                     window.location.replace('/products');
//                 });
//         } else if (result.status == 401) {
//             console.log(result);
//             alert("Login Invalido revisa tus credenciales!");
//         };
//     });
// });