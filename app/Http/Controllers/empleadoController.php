<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

use Crypt;
use App\Http\Controllers\Controller;
use App\empleado;

class empleadoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return empleado::All();
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
            $user = new empleado();
            $user->cedula = $data["cedula"];
            $user->nombreape = $data["nombreape"];
            $user->direccion = $data["direccion"];
            $user->telefono =  $data["telefono"];
            $user->celular = $data["celular"];
            $user->placamoto = $data["placamoto"];
            $user->login = $data["login"];
            $user->clave = Crypt::encrypt($data["clave"]);
            $user->fechanacimiento = $data["fechanacimiento"];
            $user->fecharegistro = $data["fecharegistro"];
            $user->tipo = $data["tipo"];
            $user->correo = $data["correo"];

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
        return empleado::find($id);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        
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
            $empleado = empleado::find($id);
            $empleado->login = $data["login"];
            $empleado->nombreape = $data["nombreape"];
            $empleado->correo = $data["correo"];
            $empleado->celular = $data["celular"];
            $empleado->fechanacimiento = $data["fechanacimiento"];
            $empleado->ruta = $data["ruta"];
            $empleado->save();

        return JsonResponse::create(array('message' => "Actualizado Correctamente", "request" =>json_encode($data)), 200);
            
        } catch (Exception $exc) {
            return JsonResponse::create(array('message' => "No se pudo actualizado el Usuario", "exception"=>$exc->getMessage(), "request" =>json_encode($data)), 401);
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

    /*
    * actualizar imagen del perfil
    */
    public function cambiarimagenperfil(Request $request){
        try {
            $data = $request->all();
            
            $id = $data['id'];
            
            $empleado = empleado::find($id);
            $empleado->ruta = "http://".$_SERVER['HTTP_HOST'].'/Gpsarduinos/img/perfil/'.$id.".jpg";
            $empleado->save();
            
            
            if ($request->hasFile('imagen')) {
                $request->file('imagen')->move("../img/perfil/", $id.".jpg");
                return JsonResponse::create(array('message' => "Imagen Guardada Correctamente","request"=>  json_encode($data)), 200);
            }
            return JsonResponse::create(array('message' => "Error al Guardar imagen","request"=>  json_encode($data)), 200);
        } catch (Exception $exc) {
            return JsonResponse::create(array('message' => "No se pudo guardar La imagen", "exception"=>$exc->getMessage()), 401);
        }
    }


    /*
    *   autenticamos si el usuario y clave son correctas
    */
    public function autenticar(Request $request){
        try{
            $data = $request->all();
            $user = empleado::select('id','cedula','nombreape','placamoto','login','clave',
                                'celular','tipo','fechanacimiento','correo','ruta')
                                ->where('login',$data['user'])
                                ->first();
            if (empty($user)){
                return JsonResponse::create(array('message' => "100", "request" =>json_encode('Usuario no existe en el Sistema')), 200);
            }   

            $clave =   Crypt::decrypt($user["clave"]);

            
            if($data['clave'] != $clave){
                return JsonResponse::create(array('message' => "200", "request" =>json_encode('Clave Incorrecta')), 200);
            }

            return JsonResponse::create(array('message' => "300", "request" =>json_encode($user)), 200);

        }catch(Exception $ex){
            return JsonResponse::create(array('message' => "No se puedo autenticar el usuario", "request" =>json_encode($data)), 401);
        }
    }
    
    

}
