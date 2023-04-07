const form = document.getElementById("registerForm");

form.addEventListener('submit', e => {
    e.preventDefault();
    const data = new FormData(form);
    const obj = {};
    data.forEach((value, key) => obj[key] = value);
    fetch('../api/sessions/register',{
        method:'POST',
        body: JSON.stringify(obj),
        headers: {
            'Content-Type' : 'application/json'
        }
    }).then(result => // result.json()
        {
            console.log(result);
        if(result.status==200){
            alert("Usuario creado con exito");
            window.location.replace('/users/login');
        }
    }
    ).then(json => console.log(json));
});