<?php 

	Route::post('api/logincliente','clienteController@autenticarcliente');

	Route::resource('api/cliente', 'clienteController'); 