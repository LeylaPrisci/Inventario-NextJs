import mysql from 'mysql2/promise';
import { NextResponse } from 'next/server';

const config = require('@/config/db');

export async function DELETE(request, { params }) {

  const dbconexion = await mysql.createConnection(config);

 

  try {

    const query = "CALL DeleteInv(?)";

    const values = [params.id];

    const [result] = await dbconexion.execute({ sql: query, values: values });

 

    return NextResponse.json({ resultado: result[0] }, { status: 200 });

  } catch (error) {

    return NextResponse.json({ message: error.message }, { status: 400 });

  } finally {

    if (dbconexion) {

      await dbconexion.end();

    }

  }

}

 

//crear una funcion la cual llama a una funcion de mysql, la cual se encargar de hacer -1 a la cantidad de stock, necesito pasarle los datos para que la funcion en mysql funcione

 

export async function PUT(request, {params}){

  const dbconexion = await mysql.createConnection(config);

 

  try {

    const query = "CALL BajaInv(?)";

    const values = [params.id];

    const [result] = await dbconexion.execute({ sql: query, values: values });

 

    return NextResponse.json({ resultado: result[0] }, { status: 200 });

  } catch (error) {

    return NextResponse.json({ message: error.message }, { status: 400 });

  } finally {

    if (dbconexion) {

      await dbconexion.end();

    }

  }

 

}

/* export async function PUT(request) {

  const dbconexion = await mysql.createConnection(config);

 

  try {

    const data = await request.json();

    const { id } = data;

 

    const query = 'CALL UpdateInv(?)';

    const values = [id];

    const [result] = await dbconexion.execute({ sql: query, values: values });

 

    await dbconexion.end();

    return NextResponse.json({ resultado: result[0] }, { status: 200 });

  } catch (error) {

    return NextResponse.json({ message: error.message }, { status: 400 });

  }

} */