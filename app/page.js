'use client'
import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import style from './estilos/home.module.css'
import { Button, Container} from 'reactstrap';
import Link from 'next/link';
import swal from 'sweetalert2'



Modal.setAppElement('body');

const App = () => {
  const [estado, setEstado] = useState(1);
  const [buscar, setBuscar] = useState('');
  const [data, setData] = useState([]);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [form, setForm] = useState({
    id:'',
    producto: '',
    modelo: '',
    nro_serie: '',
    id_producto:'',
    stock: '',
  });



  useEffect(() => {
    const fetchData1 = async () => {
      try {
        const response1 = await fetch('/api/producto');
        const data = await response1.json();
        setData(data.resultado);
      } catch (error) {
        console.error('Error al obtener datos de la primera tabla:', error);
      }
    };
    fetchData1();
  
  }, []);


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  //insert items corregido
  const insertar = async () => {
    try {
      const serieExistente = data.some(dato => dato.id_producto === form.id && dato.nro_serie === form.nro_serie);
      
      if (serieExistente) {
        swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'El número de serie ya ha sido ingresado para este producto',
        });
        return;
      }

      await fetch(`/api/stock`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id_producto: form.id,
          nro_serie: form.nro_serie,
        }),
      });

      swal.fire({
        icon: 'success',
        title: '¡Éxito!',
        text: 'Número de serie ingresado correctamente',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, ingresar otro número de serie',
        cancelButtonText: 'No, finalizar',
      }).then((result) => {
        if (result.isConfirmed) {
          setForm({ ...form, nro_serie: '' });
        } else {
          window.location.reload();
        }
      });
    } catch (error) {
      console.error(
        'Error al insertar datos:',
        error.response ? error.response.data : error.message
      );
    }
  };


  const mostrarModalActualizar = (dato) => {
    setForm({
      id: dato.id,
      nro_serie: dato.nro_serie
  
    });
    setUpdateModalOpen(true);
    //setSelectedItem(dato);
  };

  const cerrarModalActualizar = () => {
    setUpdateModalOpen(false);
  };

  /*const actualizar = async () => {
    try {
      fetch('/api/inventario', { method: 'PUT', body: JSON.stringify(form) })
        .then((res) => res.json())
        .then((data) => {
          setData(data.resultado);
          alert('Dato actualizado');
        });
    } catch (error) {
      console.error('Error al insertar datos:', error.response ? error.response.data : error.message);
    }
  };*/
  const darBajaProducto = (id) => {
    swal.fire({
      title: '¿Estás seguro?',
      text: 'Una vez dado de baja, no podrás recuperar este producto',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, dar de baja',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        DarBaja(id);
      }
    });
  };
  async function DarBaja (id){
    try {
      const respuesta = await fetch(`/api/producto/${id}`, {method: 'PUT'});
      const data2 = await respuesta.json();
      console.log(data2)
    } catch (error) {
      console.error('Error al querer dar de baja el producto:', error);
    }
  }

  const handleBuscar = (e) => {
    setBuscar(e.target.value);
  };

  const filtarHandle = () => {
    const filtar = data.filter((dato) =>
      Object.values(dato).some((value) =>
        String(value).toLowerCase().includes(buscar.toLocaleLowerCase())
      )
    );
    setData(filtar);
  };

  

  return (
    <>
      <Container>

      <div className={`${style.table}`}>
      
        <input type='search' placeholder='Buscar' onChange={handleBuscar} value={buscar} className={`${style.inputBuscar}`}></input>
        <button onClick={filtarHandle} className={`${style.botones}`}>Buscar</button>
        </div>
        <div>
        <button className={`${style.botones}`}>
            <Link href='/formulario'>Crear Producto</Link>
          </button>
        </div>
        <div>
        </div>
        <div  className={`${style.container}`}>
          <table className={`${style.table}`}>
            <thead className={`${style.thead}`}>
              <tr className={`${style.tr}`}>
                <th className={`${style.th}`}>Identificador </th>
                <th className={`${style.th}`}>Producto </th>
                <th className={`${style.th}`}>Modelo </th>
                <th className={`${style.th}`}>Stock</th>
                <th className={`${style.th}`}>Acción</th>
              </tr>
            </thead>
            <tbody>
            {data && data.map((dato, id) => (
                <tr key={id} className={`${style.tr}`}>
                  <td className={`${style.td}`}>{dato.id}</td>
                  <td className={`${style.td}`}>{dato.producto}</td>
                  <td className={`${style.td}`}>{dato.modelo}</td>
                  <td className={`${style.td}`}>{dato.stock}</td>
                   <td>
                   <button
                      data-modal-target='medium-modal'
                      data-modal-toggle='medium-modal'
                      className={`${style.botones}`}
                      onClick={() => mostrarModalActualizar(dato)}
                      disabled={dato.stock === 0}
                    >
                      Agregar Items
                    </button>
                      <button className={`${style.botones}`}>
                        <Link href={`/tablaSerie/${dato.id}`}>Ver</Link>
                      </button>
                      <button
                      className={`${style.botones}`}
                      onClick={() => darBajaProducto(dato.id)}
                      disabled={dato.stock === 0}
                    >
                      Dar de Baja
                    </button>

                   </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </Container>
      <Modal className={`${style.modal}`} isOpen={updateModalOpen}>
        <h3 className={`${style.h3}`}>Agregar Serie</h3>
        <div>
          <label>ID: </label>
          <input
            name='id'
            type='text'
            id='id'
            className={`${style.formulario}`}
            onChange={handleChange}
            value={form.id}
            disabled={true}
          />
        </div>
        <div>
          <label htmlFor='nro_serie'>Serie: </label>
          <input
            placeholder='Serie'
            name='nro_serie'
            type='text'
            id='nro_serie'
            className={`${style.formulario}`}
            onChange={handleChange}
            value={form.nro_serie}
          />
        </div>
        <div className={`${style.divModal}`}>
          <button className={`${style.botones}`} onClick={insertar}>
            Insertar
          </button>
          <button className={`${style.botones}`} onClick={cerrarModalActualizar}>
            Cancelar
          </button>
        </div>
      </Modal>
      
    </>
  );
};

export default App;