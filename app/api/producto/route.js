import mysql from 'mysql2/promise';
import {NextResponse, NextRequest}  from 'next/server';

//lista producto

 const config = require('@/config/db')

 export async function GET(request, res){
    //llama correctamente
    const dbconexion = await mysql.createConnection(config)
    try {
       const query = 'CALL lista_producto'
       const values = []
       const [result] = await dbconexion.execute({sql:query,values:values})
       console.log(result)
       return NextResponse.json({resultado: result[0]}, {status:200})
    } catch (error) {
        return NextResponse.json({messege: error.messege},{status:400})
    }
 }

//funciona 
export  async function POST (request){
   const dbconexion = await mysql.createConnection(config)
  try {
   const data = await request.json();
   const query = 'CALL alta_productos(?,?)'
   const values = [data.producto, data.modelo]
   const [result] = await dbconexion.execute({sql:query,values:values})
   console.log(result)
   return NextResponse.json({resultado: result[0]}, {status:200})
   
  } catch (error) {
   return NextResponse.json({ message: error.message }, { status: 400 });
  } 
 }