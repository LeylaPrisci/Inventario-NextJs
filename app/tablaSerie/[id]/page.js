'use client'
import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import style from '../../estilos/home.module.css';
import { Button, Container, Label} from 'reactstrap';
import Link from 'next/link';

Modal.setAppElement('body');

const TablaSerie = () => {
  const [buscar, setBuscar] = useState('');
  const [data, setData1] = useState([]); //inventario
  const [data2, setData2] = useState([]);//stock
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [form, setForm] = useState({
    id:'',
    id_producto: '',
    nro_serie: '',
    producto: '',
    modelo: '',
    stock:0,

  });

  /*const [selectedItem, setSelectedItem] = useState(null);
  const [filtarSerie, setFiltrarSerie] = useState(data);
  const [datosDuplicadosModalOpen, setDatosDuplicadosModalOpen] = useState(false);
  const [datosDuplicadoss, setDatosDuplicados] = useState([]);*/

  useEffect(() => {
    const fetchData1 = async () => {
      try {
        const response1 = await fetch('/api/inventario');
        const  data = await response1.json();
        setData1(data.resultado);
      } catch (error) {
        console.error('Error al obtener datos de la primera tabla:', error);
      }
    };

   const fetchData2 = async () => {
      try {
        const response2 = await fetch('/api/inventario/stock');
        const data2 = await response2.json();
        setData2(data2.resultado.stock);
      } catch (error) {
        console.error('Error al obtener datos de la segunda tabla:', error);
      }
    };

    fetchData2();

    fetchData1();
  
  }, []);
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  /*const mostrarModalActualizar = (dato) => {
    setForm({
      id: dato.id,
      marca: dato.marca,
      modelo: dato.modelo,
    });
    setUpdateModalOpen(true);
    setSelectedItem(dato);
  };

  const cerrarModalActualizar = () => {
    setUpdateModalOpen(false);
  };

  const actualizar = async () => {
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

  const DarBaja = async (id) => {
    const item = data.find((dato) => dato.id === id);

    if (item && item.stock === 0) {
      console.log('No hay stock para dar de baja el producto');
    } else {
      try {
        if (id !== undefined && id !== null && id !== '') {
          await fetch(`/api/inventario/stock/${id}`, {
            method: 'PUT',
            body: JSON.stringify({
              id: item.id,
             
            }),
          });
          setData((prevData) =>
            prevData.map((dato) =>
              dato.id === item.id ? { ...dato, stock: dato.stock - 1 } : dato
            )
          );
        } else {
          console.warn('ID es undefined o null.');
        }
      } catch (error) {
        console.error('Error data:', error);
      }
    }
  };

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

 /* const dividirYOrdenar = (serie) => {
    // Dividir la serie por espacios y ordenar las partes
    const partesOrdenadas = serie.split(' ').sort();
    return partesOrdenadas.join('\n');
  };
  
  
  const datosDuplicados = (serie) => {
    const duplicados = data.filter((item) => item.serie === serie);
    setDatosDuplicados(duplicados);
    setDatosDuplicadosModalOpen(true);
  };

  const mostrarDatosNoDuplicados = (serie) => {
    // Filtrar y obtener partes únicas de la serie
    const partesUnicas = Array.from(new Set(serie.split(' ')));
    return partesUnicas.join('\n');
  };
  const mostrarModalDatosDuplicados = () => {
    return (
      <Modal className={`${style.modal}`} isOpen={datosDuplicadosModalOpen}>
        <h3 className={`${style.h3}`}>Datos Duplicados</h3>
        {datosDuplicadoss.map((dato, index) => (
          <div key={index} className={`${style.divModal}`}>
            <label>ID:</label>
            {dato.id}
            <label>SERIE:</label>
            
            <pre>{dividirYOrdenar(dato.serie)}</pre>
          </div>
        ))}
        <button className={`${style.botones}`} onClick={() => setDatosDuplicadosModalOpen(false)}>
          Cerrar
        </button>
      </Modal>
    );
  };*/
  /*
   <td className={`${style.td}`}>
  <pre>{mostrarDatosNoDuplicados(dato.serie)}</pre>
</td>
   */
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
              <label>Producto:</label>
              {dato.producto}
              <label>Modelo:</label>
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
          {data2.map((dato, id) => (
                <tr key={id} className={`${style.tr}`}>
                  <td className={`${style.td}`}>{dato.id}</td>
                  <td className={`${style.td}`}>{dato.nro_serie}</td>
                  <td className={`${style.td}`}>{dato.stock}</td>
                  <td className={`${style.td}`}>
                  <button
                        className={`${style.botones}`}
                        onClick={() => DarBaja(dato.id)}
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
/*
<td>
<button className={`${style.botones}`}>
  <Link href='/formularioSerie'>Crear Stock</Link>
</button>
  <button
    data-modal-target='medium-modal'
    data-modal-toggle='medium-modal'
    className={`${style.botones}`}
    onClick={() => mostrarModalActualizar(dato)}
  >
    Actualizar
  </button>
  <button
    className={`${style.botones}`}
    onClick={() => DarBaja(dato.id)}
    disabled={dato.stock === 0}
  >
    Dar de Baja
  </button>
  <button className={`${style.botones}`} onClick={() => datosDuplicados(dato.serie)}>
    Ver Duplicados
  </button>
</td>
*/