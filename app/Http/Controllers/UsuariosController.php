<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

use App\Http\Controllers\Controller;
use App\Usuarios;

class UsuariosController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Usuarios::All();
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
            $user = new Usuarios();
            $user->usuario = $data["usuario"];
            $user->fecha = $data["fecha"];
            $user->login = $data["login"];
            $user->clave = Crypt::encrypt($data["clave"]);
            $user->telefono = $data["telefono"];
            $user->cedula = $data["cedula"];

            $user->save();

        return JsonResponse::create(array('message' => "Usuario Guardado Correctamente", "request" =>json_encode($data)), 200);
            
        } catch (Exception $exc) {
            return JsonResponse::create(array('message' => "No se pudo guardar el Usuario", "exception"=>$exc->getMessage(), "request" =>json_encode($data)), 401);
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
        return Usuarios::find($id);
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
        try{

            $data = $request->all();
                
            $user = Usuarios::find($id);

            $user->nombres = $data['nombres'];
            $user->fecha = $data['fecha'];
            $user->login = $data['login'];
            $user->clave = $data['clave'];

            $user->save();
            
            return JsonResponse::create(array('message' => "País Modificado Correctamente", "request" =>json_encode($data)), 200);
            
        } catch (Exception $exc) {
            return JsonResponse::create(array('message' => "No se pudo Modificar el país", "exception"=>$exc->getMessage(), "request" =>json_encode($data)), 401);
        }
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
