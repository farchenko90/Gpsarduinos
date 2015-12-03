app.service("empleadoService", function ($http) {

	this.postempleado = function (empleado) {
        var req = $http.post(uri+'/api/empleado', empleado);
        return req;       
    };

});