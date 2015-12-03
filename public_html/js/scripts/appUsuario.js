var session = {

	setUsuario: function(user){      
       sessionStorage.setItem("usuario",user);       
    },

    /// Obtiene todos los Datos del Usuario
    getUsuario: function(){      
        return this.validarObjectLocal("usuario")? JSON.parse(sessionStorage.getItem("usuario")) :  null;       
    },

    getId: function(){
        var obj = JSON.parse(sessionStorage.getItem("usuario"));
        if (obj){            
            return obj.id;
        }
    },
    
    validarObjectLocal: function(string){        
        return sessionStorage.getItem(string) !== "" && sessionStorage.getItem(string) !== undefined && sessionStorage.getItem(string) !== null;        
    },

    cerrarSesion: function(){
        sessionStorage.setItem("usuario","");
        sessionStorage.removeItem("usuario");        
        location.href = "../public_sesion/#/iniciosesion";
    }, 

    //obtenemos el nombre de usuario
    getUser:function(){
        var obj = JSON.parse(sessionStorage.getItem("usuario"));
        if (obj){            
            return obj.login;
        }
    }, 

    //obtenemos el nombre y apellido del usuario
    getNomape:function(){
    	var obj = JSON.parse(sessionStorage.getItem("usuario"));
    	if (obj){            
            return obj.nombreape;
        }
    },

    getFechaNac:function(){
        var obj = JSON.parse(sessionStorage.getItem("usuario"));
        if (obj){            
            return obj.fechanacimiento;
        }
    },

    getTipo:function(){
        var obj = JSON.parse(sessionStorage.getItem("usuario"));
        if (obj){            
            return obj.tipo;
        }
    },

    getCelular:function(){
        var obj = JSON.parse(sessionStorage.getItem("usuario"));
        if (obj){            
            return obj.celular;
        }
    },

    getCorreo:function(){
        var obj = JSON.parse(sessionStorage.getItem("usuario"));
        if (obj){            
            return obj.correo;
        }
    },

    getRuta:function(){
        var obj = JSON.parse(sessionStorage.getItem("usuario"));
        if (obj){            
            return obj.ruta;
        }
    }

}