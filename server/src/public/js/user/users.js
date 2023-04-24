function llamarAPI() {
    fetch('api/jwt/current', {
        method: 'GET',
        headers : {
            'Content-Type' : 'application/json',
            'Authorization' : `Bearer ${localStorage.getItem('authToken')}`
        }
    }).then( result => {
        if(result.status==200){
            result.json()
            .then( json => {
                console.log(json);
                // localStorage.setItem('authToke', json.jwt);
            })
        }else if( result.status==401){
            console.log(result);
            alert("Login invalido revisa tus credenciales!");
        };
    });
};

llamarAPI();