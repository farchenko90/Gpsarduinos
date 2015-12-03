<?php 
	
	Route::post('api/autenticarlogin','empleadoController@autenticar');

	Route::post('api/empleado/actualizarperfil','empleadoController@cambiarimagenperfil');

	Route::resource('api/empleado', 'empleadoController'); 