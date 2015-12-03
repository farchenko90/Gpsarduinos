app.service("inicioService", function ($http) {

	this.postautenticar = function (empleado) {
        var req = $http.post(uri+'/api/autenticarlogin', empleado);
        return req;       
    };

});