import { useNavigate,Form,useActionData } from "react-router-dom";
import Formulario from '../components/Formulario';
import Error from '../components/Error';
export async function action({request}){
  const formData = await request.formData();
  const datos = Object.fromEntries(formData);

  //Validacion
  const error = [];
  if(Object.values(datos).includes('')){
    error.push('Todos los campos son obligatorios');
  }
  let regex = new RegExp("([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])");

  if(!regex.test(email)){
    error.push('El mail no es valido')
  }

  if(Object.keys(error).length){
    return error;
  }



  return 0;
}

export default function NuevoCliente() {
  const error = useActionData();
  const navigate = useNavigate();

  return (
    <>
      <p className="font-black text-4xl text-blue-900">Nuevo Cliente</p>
      <p className="mt-3">
        Llena todos los campos para registrar un nuevo cliente
      </p>
      <div className="flex justify-end">
        <button className="bg-blue-800 text-white px-3 py-1 font-bold uppercase"
            onClick={()=>navigate(-1)}
        >
          Volver
        </button>
      </div>
      <div className="bg-white shadow rounded-md md:w-3/4 mx-auto px-5 py-10">
        {error?.length && error.map((errores,i)=><Error key={i}>{errores}</Error>)}
        <Form method="post" noValidate>
        <Formulario/>
        <input
          type="submit"
          value='Registrar Cliente'
          className="mt-5 w-full bg-blue-800 p-3 uppercase font-bold text-white text-lg mt-20"
        />
        </Form>
      </div>
    </>
  );
}
