app.controller('clienteController', function ($scope, clienteService) {

	$scope.title = 'Registrar Clientes';

	$scope.guardarcliente = function(){

		var nombres = document.getElementsByName('nombrescliente')[0].value;
		var apellidos = document.getElementsByName('apellidoscliente')[0].value;
		
		var object = {
			cedula: 			document.getElementsByName('cedulacliente')[0].value,
			nombreape: 			nombres.toUpperCase()+" "+apellidos.toUpperCase(),
			direccion: 			document.getElementsByName('direccioncliente')[0].value,
			telefono: 			document.getElementsByName('telefonocliente')[0].value,
			celular: 			document.getElementsByName('celularcliente')[0].value,
			fechanacimiento: 	document.getElementsByName('fechacliente')[0].value,
			login: 				document.getElementsByName('logincliente')[0].value,
			clave: 				document.getElementsByName('clavecliente')[0].value
		};

		var promisePost = clienteService.postcliente(object);

		promisePost.then(function (d) {

                alert(d.data.message);
                location.reload();
                
        }, function (err) {

                if(err.status == 401){
                    alert(err.data.message);
                    console.log(err.data.exception);

                }else{

                    alert("Error Al procesar Solicitud");

                }

                console.log("Some Error Occured "+ JSON.stringify(err));
        });

	}

});