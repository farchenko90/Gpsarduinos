app.controller('sessionController',function ($scope){

	$scope.usuario = session.getNomape();
	$scope.user = session.getUser();
	$scope.fechanac = session.getFechaNac();
	$scope.foto = session.getRuta();
	

});