import { useNavigate,Form } from "react-router-dom";
import Formulario from '../components/Formulario';

export function action(){
  console.log('Submit al formulario...')
  return 0;
}

export default function NuevoCliente() {
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
        <Form method="post" >
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
