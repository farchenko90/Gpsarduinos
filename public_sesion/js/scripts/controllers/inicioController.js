app.controller('inicioController', function ($scope, inicioService) {

	$scope.gps = "GPS";
	$scope.title = "Arduinos";

	$scope.ingresar = function(){

        if(document.getElementsByName('user')[0].value=="" || document.getElementsByName('pass')[0].value==""){

        }else{

            var object = {
                user:   document.getElementsByName('user')[0].value,
                clave:  document.getElementsByName('pass')[0].value
            };

            var promisePost = inicioService.postautenticar(object);

            promisePost.then(function (d) {

                    //alert(d.data.message);
                    if(d.data.message === '100'){
                        alert("Este usuario no esta registrado")
                    }else if(d.data.message === '200'){
                        alert("Clave incorrecta")
                    }else if(d.data.message === '300'){
                        alert("!Bienvenido a tu sesion");
                        sessionStorage.setItem("usuario","");
                        session.setUsuario(d.data.request);
                        location.href = "http://localhost/Gpsarduinos/public_html/index.html#/blanco";
                    }
                    
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