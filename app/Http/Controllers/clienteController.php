<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Crypt;
use App\cliente;

class clienteController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        try{
            $data = $request->all();
            $cliente = new cliente();
            $cliente->cedula = $data['cedula'];
            $cliente->nombreape = $data['nombreape'];
            $cliente->direccion = $data['direccion'];
            $cliente->celular = $data['celular'];
            $cliente->telefono = $data['telefono'];
            $cliente->fechanacimiento = $data['fechanacimiento'];
            $cliente->login = $data['login'];
            $cliente->clave = Crypt::encrypt($data['clave']);
            $cliente->save();
            return JsonResponse::create(array('message' => "Cliente Guardado Correctamente", "request" =>json_encode($data)), 200);
        }catch (Exception $exc){
            return JsonResponse::create(array('message' => "No se pudo guardar el cliente", "exception"=>$exc->getMessage(), "request" =>json_encode($data)), 401);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
