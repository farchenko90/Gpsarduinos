app.service("perfilService", function ($http) {

	this.putperfil = function (id,empleado) {
        var req = $http.put(uri+'/api/empleado/' + id, empleado);
        return req;       
    };

    this.postImagen = function (formData) {
        var req = $http.post(uri+'/api/empleado/actualizarperfil', formData,{transformRequest: angular.identity, 
            headers: {'Content-Type': undefined}});
        	console.log(req)
        return req;
    };

});