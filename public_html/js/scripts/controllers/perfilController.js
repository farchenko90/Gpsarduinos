app.controller('perfilController', function ($scope, perfilService) {

	$scope.fechanacimiento = session.getFechaNac();
	$scope.usuario = session.getUser();
	$scope.tipo = session.getTipo();
	$scope.celular = session.getCelular();
	$scope.correo = session.getCorreo();
	$scope.nombres = session.getNomape();
	$scope.iden = session.getId();
	$scope.ruta = session.getRuta();
	$scope.perfil = {}
	initialize()
	
	function initialize() {
		if($scope.ruta==""){
			document.getElementById("image").innerHTML = "<img class='profile-user-img img-responsive img-circle' src='../img/perfil/elsy.jpg' alt='User profile picture' style='width: 40%'>";
		}else{
			document.getElementById("image").innerHTML = "<img class='profile-user-img img-responsive img-circle' src='"+$scope.ruta+"' alt='User profile picture' style='width: 45%; height: 70%'>";
		}
		$scope.perfil = {
			foto:  ""
		}
	}

	$scope.cambiarfoto = function(){
		var formData = new FormData();
		formData.append('imagen',$scope.perfil.foto);
        formData.append('id', $scope.iden);
        //alert($scope.perfil.foto+" "+$scope.iden)
        //alert(formData)
        	
        	var promisePost = perfilService.postImagen(formData);
            promisePost.then(function (d) {
                
                alert(d.data.message);

            }, function (err) {
                
                if(err.status == 401){
                    alert(err.data.message);
                    console.log(err.data.exception);
                }else{
                    alert("Error Al procesar Solicitud");
                }

                console.log(err);
            });

	}

	$scope.actualizarempleado = function(){
		
		var usuario = document.getElementsByName('usuario')[0].value;
		var nombres = document.getElementsByName('nombres')[0].value;
		var correo = document.getElementsByName('correo')[0].value;
		var cel = document.getElementsByName('celular')[0].value;
		var fecha = document.getElementsByName('fechanac')[0].value;
		var ruta = document.getElementsByName('ruta')[0].value;
		
		var object = {
			login: 				usuario,
			nombreape:  		nombres.toUpperCase(),
			correo: 			correo,
			celular: 			cel,
			fechanacimiento: 	fecha,
			ruta: 				ruta
		}
		
		var promisePut = perfilService.putperfil($scope.iden,object);

		promisePut.then(function (d) {

                alert(d.data.message);

                var object1 = {
                	id:  				$scope.iden,
                	login: 				usuario,
					nombreape:  		nombres.toUpperCase(),
					correo: 			correo,
					celular: 		 	cel,
					fechanacimiento: 	fecha,
					ruta: 				ruta
                }

                sessionStorage.setItem("usuario","");
                session.setUsuario(JSON.stringify(object1));

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