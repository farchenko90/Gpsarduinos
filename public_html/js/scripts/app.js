var uri = "../public";
var gl_resultado = {};
var app;
(function(){
    app = angular.module("Gps", ['ngRoute','ng-currency','ui.keypress','ks.ngScrollRepeat']);
    
    app.config(['$routeProvider', '$locationProvider', function AppConfig($routeProvider, $locationProvider){
            
            
            $routeProvider
                .when('/configuracion/clientes', {
                    templateUrl: 'pages/configuracion/cliente.html'
                })
                .when('/configuracion/perfil', {
                    templateUrl: 'pages/configuracion/perfil.html'
                })
                .when('/configuracion/empleados', {
                    templateUrl: 'pages/configuracion/empleados.html'
                })  
                .when('/blanco', {
                    templateUrl: 'pages/blanco.html'
                })
                .otherwise({
                    redirectTo:"blanco"
                });
                    
            
    }]);

    app.directive('ngEnter', function () {
        return function (scope, elements, attrs) {
            elements.bind('keydown keypress', function (event) {
                if (event.which === 13) {
                    scope.$apply(function () {
                        scope.$eval(attrs.ngEnter);
                    });
                    event.preventDefault();
                }
            });
        };
    });
    
    app.filter('ifEmpty', function() {
        return function(input, defaultValue) {
            if (angular.isUndefined(input) || input === null || input === '') {
                return defaultValue;
            }

            return input;
        };
    });
    
    app.filter('sumByKey', function () {
        return function (data, key) {
            if (typeof (data) === 'undefined' || typeof (key) === 'undefined') {
                return 0;
            }

            var sum = 0;
            for (var i = data.length - 1; i >= 0; i--) {
                sum += parseInt(data[i][key]);
            }

            return sum;
        };
    });
    
    app.directive('uploaderModel',['$parse',function($parse){
        return{
            restrict: 'A',
            link: function(scope,iElement,iAttrs){
                iElement.on('change',function(e)
                {
                    $parse(iAttrs.uploaderModel).assign(scope,iElement[0].files[0]);
                });
            }
        };

    }]);
    
    app.config(['$provide', function($provide) {
        $provide.decorator('$locale', ['$delegate', function($delegate) {
          if($delegate.id == 'en-us') {
            $delegate.NUMBER_FORMATS.PATTERNS[1].negPre = '-\u00A4';
            $delegate.NUMBER_FORMATS.PATTERNS[1].negSuf = '';
          }
          return $delegate;
        }]);
     }]);   

})();
