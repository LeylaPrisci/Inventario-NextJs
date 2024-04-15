import mysql from 'mysql2/promise';
import { NextResponse, NextRequest } from 'next/server';

const config = require('@/config/db')
//LLAMDA DE LA LISTA STOCK
export async function GET(request, {params}){
    
  const dbconexion = await mysql.createConnection(config)
  try {
     const query = 'CALL lista_stock(?)'
     const values = [params.id]
     const [result] = await dbconexion.execute({sql:query,values:values})
     console.log(result)
     return NextResponse.json({producto: result[0],stock:result[1]}, {status:200})
  } catch (error) {
      return NextResponse.json({messege: error.messege},{status:400})
  }
}
  //corriendo sin problemas
export async function PUT(request, {params}){
  const dbconexion = await mysql.createConnection(config);

  try {
    const query = "CALL baja_stock(?)";
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