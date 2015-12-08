app.service("clienteService", function ($http) {

	this.postcliente = function (cliente) {
        var req = $http.post(uri+'/api/cliente', cliente);
        return req;       
    };

});