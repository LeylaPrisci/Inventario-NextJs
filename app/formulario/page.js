'use client'
import React, { useState} from 'react';
import { Button } from 'reactstrap';
import Link from 'next/link';
import style from '../estilos/home.module.css'

//Tabla correctamente envianda
const Formulario = () => {
  const [data, setData] = useState([]);
  const [form, setForm] = useState({
    id: '',
    producto: '',
    modelo: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const insertar = async () => {
    try {
      fetch('/api/inventario', {
        method: 'POST',
        body: JSON.stringify({
          producto: form.producto,
          modelo: form.modelo,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          setData(data.resultado);
          alert('Producto creado');
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
      producto: '',
      modelo: '',
    })
  }

  return(
    <>
      <h2 className={`${style.h2Formulario}`}>Formulario</h2>
      
      <button className={`${style.botones}`}>
        <Link href="/">Volver</Link>
      </button>

      <div className={`${style.divformulario}`}>
      <form>
        <div>
          <label htmlFor='producto'>Producto: </label>
          <input
            placeholder='Producto'
            name='producto'
            type='text'
            id='producto'
            className={`${style.formulario}`}
            onChange={handleChange}
            value={form.producto}
          />
        </div>
        <div>
          <label htmlFor='modelo'>Modelo: </label>
          <input
            placeholder='Modelo'
            name='modelo'
            type='text'
            id='modelo'
            className={`${style.formulario}`}
            onChange={handleChange}
            value={form.modelo}
          />
        </div>

        <Button className={`${style.botones}`} onClick={insertar}>
          Insertar
        </Button>
        <button className={`${style.botones}`} onChange={cancelarFormulario}>Cancelar
        </button>
      </form>
      </div>
    </>
  )
};
export default Formulario;