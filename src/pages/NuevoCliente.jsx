import { useNavigate,Form,useActionData,redirect } from "react-router-dom";
import Formulario from '../components/Formulario';
import Error from '../components/Error';
import {agregarCliente} from '../data/clientes'
export async function action({request}) {
  const formData = await request.formData()
  const datos = Object.fromEntries(formData)
  const email = formData.get('email')

  // Validación
  const errores = []
  if(Object.values(datos).includes('')) {
      errores.push('Todos los campos son obligatorios')
  }

  let regex = new RegExp("([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])");
  if(!regex.test(email)) {
      errores.push('El Email no es válido')
  }

  // Retornar datos si hay errores
  if(Object.keys(errores).length) {
      return errores
  }
  await agregarCliente(datos)
  return redirect('/')
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
