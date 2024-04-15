'use client'
import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import style from '../../estilos/home.module.css';
import { Button, Container, Label} from 'reactstrap';
import Link from 'next/link';
import swal from 'sweetalert2'



Modal.setAppElement('body');

const TablaSerie = ({params}) => {
  const paramas_id = params.id
  const [buscar, setBuscar] = useState('');
  const [data, setData1] = useState([]); //inventario
  const [data2, setData2] = useState([]);//stock
  const [form, setForm] = useState({
    id:'',
    id_producto: '',
    nro_serie: '',
    producto: '',
    modelo:''


  });
  
  useEffect(() => {
   const fetchData2 = async () => {
      try {
        const response2 = await fetch(`/api/stock/${paramas_id}`);
        const data2 = await response2.json();
        console.log(data2)
        setData2(data2.stock);
        setData1(data2.producto);
      } catch (error) {
        console.error('Error al obtener datos de la segunda tabla:', error);
      }
    };

    fetchData2();
  
  }, []);
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };


  async function DarBaja (id){
    try {
      const respuesta = await fetch(`/api/stock/${id}`, {method: 'PUT'});
      const data = await respuesta.json();
      setData2(data.stock);
    } catch (error) {
      console.error('Error al querer dar de baja el numero de serie:', error);
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

  const confirmarDarBaja = (id) => {
    swal.fire({
      title: '¿Está seguro?',
      text: '¿Está seguro de que desea dar de baja este número de serie?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, dar de baja',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        DarBaja(id);
      }
    });
  };

  return (
    <>
      <Container>
        <div className={`${style.table}`}>
          <input type='text' placeholder='Buscar' onChange={handleBuscar} value={buscar} className={`${style.inputBuscar}`}></input>
          <button onClick={filtarHandle} className={`${style.botones}`}>Buscar</button>
        </div>

        <div>
          <button className={`${style.botones}`}>
            <Link href='/'>Volver Principal</Link>
          </button>
        </div>

        <div>
          {data.map((dato, id) => (
            <div  key={id}>
              <label>Producto: </label>
              {dato.producto}<br></br>
              <label>Modelo: </label>
              {dato.modelo}
            </div>
          ))}
        </div>

        <div>
          <table className={`${style.table}`}>
            <thead>
              <tr className={`${style.tr}`}>
                <th className={`${style.th}`}>Identificador </th>
                <th className={`${style.th}`}>Serie </th>
                <th className={`${style.th}`}>Stock</th>
                <th className={`${style.th}`}>Acción</th>
              </tr>
            </thead>
            <tbody>
              {data2 && data2.map((dato, id) => (
                <tr key={id} className={`${style.tr}`}>
                  <td className={`${style.td}`}>{dato.id}</td>
                  <td className={`${style.td}`}>{dato.nro_serie}</td>
                  <td className={`${style.td}`}>{dato.estado}</td>
                  <td className={`${style.td}`}>
                    <button
                      className={`${style.botones}`}
                      onClick={() => confirmarDarBaja(dato.id)}
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
    </>
  );
};

export default TablaSerie;