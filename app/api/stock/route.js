import mysql from 'mysql2/promise';
import {NextResponse, NextRequest}  from 'next/server';

 const config = require('@/config/db')


 export  async function POST (request){
   const dbconexion = await mysql.createConnection(config)
  try {
   const data = await request.json();
   const query = 'CALL alta_stock(?,?)'
   const values = [data.id_producto, data.nro_serie]
   const [result] = await dbconexion.execute({sql:query,values:values})
   console.log(result)
   return NextResponse.json({resultado: result[0]}, {status:200})
   
  } catch (error) {
   return NextResponse.json({ message: error.message }, { status: 400 });
  } 
 }