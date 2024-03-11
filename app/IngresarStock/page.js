'use client'
import React, { useState} from 'react';
import { Button } from 'reactstrap';
import Link from 'next/link';
import style from '../estilos/home.module.css'

const FormularioStock = () => {

  const [data, setData] = useState([]);
  const [form, setForm] = useState({
    id: '',
    producto: '',
    serie: '',
    stock: 0,
  });
 

  const handleChange = (e) => {
setForm({ ...form, [e.target.name]: e.target.value });
}; 

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && form.serie) {
      const existingItem = data.find((item) => item.serie === form.serie);
      if (existingItem) {
        setForm({ ...form, stock: existingItem.stock + 1 });
      } else {
        setForm({ ...form, stock: form.stock + 1 });
        setData([...data, form]);
      }
      e.preventDefault();
    }
  };

  const insertar = async () => {
    try {
      fetch('/api/stock', {
        method: 'POST',
        body: JSON.stringify({
          serie: form.serie,
          stock: form.stock,

        }),
      })
        .then((res) => res.json())
        .then((data) => {
          setData(data.resultado);
          alert('Dato creado');
        });

    } catch (error) {
      console.error(
        'Error al insertar datos:',
        error.response ? error.response.data : error.message
      );
    }
  };

  const cancelarFormulario = ()=>{
    setForm({
      serie: '',
      stock: '',

    })
  }
  return (

    <>

      <h2>Formulario</h2>
      <button className={`${style.botones}`}>
        <Link href="/">Volver</Link>
      </button>

      <form>
      <div>
            <label htmlFor='serie'>Serie: </label>
            <textarea  placeholder='Ingrese el código'
                name='serie'
                rows={2}cols={18}
                id='serie'
                className={`${style.formulario}`}
                value={form.serie}
                onChange={handleChange}
                onKeyUpCapture={handleKeyPress}
            ></textarea>
       </div>
       <div>
            <label htmlFor='stock'>Stock: </label>
            <input
                name='stock'
                type='text'
                id='stock'
                className={`${style.formulario}`}
                onChange={handleChange}
                value={form.stock}
            />
        </div>
        <Button className={`${style.botones}`} onClick={insertar}>
          Insertar
        </Button>
        <button className={`${style.botones}`} onChange={cancelarFormulario}>Cancelar
        </button>
      </form>
    </>
  );
};
export default FormularioStock;