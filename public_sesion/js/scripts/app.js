var uri = "../public";
var gl_resultado = {};
var app;
(function(){
    app = angular.module("sesion", ['ngRoute','ng-currency','ui.keypress','ks.ngScrollRepeat']);
    
    app.config(['$routeProvider', '$locationProvider', function AppConfig($routeProvider, $locationProvider){
            
            
            $routeProvider
                .when('/iniciosesion', {
                    templateUrl: 'pages/iniciarsesion.html'
                })
                .otherwise({
                    redirectTo:"iniciosesion"
                });
                    
            
    }]);

})();
