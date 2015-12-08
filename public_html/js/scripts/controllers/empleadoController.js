app.controller('empleadoController', function ($scope, empleadoService) {

	$scope.title = "Formulario de registro";

	$scope.guardarempleado = function(){
		var nombre = document.getElementsByName('nombres')[0].value;
		var apellido = document.getElementsByName('apellidos')[0].value;
		var cedula = document.getElementsByName('cedula')[0].value;
		var direccion = document.getElementsByName('direccion')[0].value;
		var telefono = document.getElementsByName('telefono')[0].value;
		var celular = document.getElementsByName('celular')[0].value;
		var placa = document.getElementsByName('placa')[0].value;
		var tipo = document.getElementsByName('tipo')[0].value;
		var fechanac = document.getElementsByName('fechanac')[0].value;
		var fechaing = document.getElementsByName('fechaingreso')[0].value;
		var login = document.getElementsByName('login')[0].value;	
		var clave = document.getElementsByName('clave')[0].value;
		var correo = document.getElementsByName('correo')[0].value;

		if(nombre =="" || apellido == "" || cedula =="" || direccion =="" || 
			celular =="" || tipo =="" || fechanac =="" || fechaing =="" ||
			 login =="" || clave ==""){
			alert('Los campos son obligatorios');
		}else{

			var object = {
				cedula: 			cedula,
				nombreape: 			nombre.toUpperCase() + " " + apellido.toUpperCase(),
				direccion: 			direccion.toUpperCase(),
				telefono: 			telefono,
				celular:  			celular,
				placamoto:  		placa.toUpperCase(),
				login:  			login,
				clave:  			clave,
				fechanacimiento: 	fechanac,
				fecharegistro: 		fechaing,
				tipo: 				tipo,
				correo: 			correo
			};

			var promisePost = empleadoService.postempleado(object);

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
	}

});