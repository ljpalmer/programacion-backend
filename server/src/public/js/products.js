function fncCerrarSession(){    
    var opcion = confirm("¿Confirmar acción?");
    if (opcion == true) {
        fetch('../api/sessions/logout',{
            method:'POST',
            body: "",
            headers: {
                'Content-Type' : 'application/json'
            }
        }).then(result => {
            console.log("Probando");
            if(result.status==200){
                window.location.replace('users/login');
            }
        });
	}

}

