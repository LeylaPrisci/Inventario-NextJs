import mysql from 'mysql2/promise';

import {NextResponse, NextRequest}  from 'next/server';

const config = require('@/config/db');
 export async function GET(request, res){
    const dbconexion = await mysql.createConnection(config)
    try {
       const query = 'CALL SelectStk'
       const values = []
       const [result] = await dbconexion.execute({sql:query,values:values})
       return NextResponse.json({resultado: result[0]}, {status:200})
    } catch (error) {
        return NextResponse.json({messege: error.messege},{status:400})
    }
}


export  async function POST (request){
    const dbconexion = await mysql.createConnection(config)
   try {
    const data = await request.json();
    const query = 'CALL InsertStk(?,?,?)'
    const values = [data.idProducto, data.serie, data.stock]
    const [result] = await dbconexion.execute({sql:query,values:values})
    return NextResponse.json({ resultado: result[0]}, { status: 200 });
   } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 400 });
   }
}