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
        return cliente::All();
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
        return cliente::find($id);
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

    /*
    *   autenticamos si el cliente y clave son correctas
    */
    public function autenticarcliente(Request $request){
        try{
            $data = $request->all();
            $user = cliente::select('id','cedula','nombreape','login','clave',
                                'telefono','fechanacimiento','correo')
                                ->where('login',$data['user'])
                                ->first();
            if (empty($user)){
                return JsonResponse::create(array('message' => "100", "request" =>json_encode('Cliente no esta en el Sistema')), 200);
            }   

            $clave =   Crypt::decrypt($user["clave"]);

            
            if($data['clave'] != $clave){
                return JsonResponse::create(array('message' => "200", "request" =>json_encode('Clave Incorrecta')), 200);
            }

            return JsonResponse::create($user);

        }catch(Exception $ex){
            return JsonResponse::create(array('message' => "No se puedo autenticar el usuario", "request" =>json_encode($data)), 401);
        }
    }

}
