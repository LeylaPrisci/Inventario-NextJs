import mysql from 'mysql2/promise';

import {NextResponse, NextRequest}  from 'next/server';

const config = require('@/config/db');
 export async function GET(request, res){
    const dbconexion = await mysql.createConnection(config)

    try {

       const query = 'CALL SelectInv'

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

  const query = 'CALL InsertInv(?,?)'

  const values = [data.marca, data.modelo]

  const [result] = await dbconexion.execute({sql:query,values:values})

  return NextResponse.json({resultado: result[0]}, {status:200})
 } catch (error) {

  return NextResponse.json({ message: error.message }, { status: 400 });
 }
}

 

 

export async function PUT(request) {

   const dbconexion = await mysql.createConnection(config);

   

   try {

       const data = await request.json();

       const { id, serie, marca, modelo, stock } = data;

 

       const query = 'CALL UpdateInv(?,?,?,?,?)';

       const values = [id, serie, marca, modelo, stock];

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

 

 

 

 export async function handerBuscar(req, res){

   

    const dbconexion = await mysql.createConnection(config)

     const {id, q} = req.query;

 

     if(id){

        const item = dbconexion.finde((item)=> item.id === +id);

        return res.status(200).json(item);

     }

 

 

 

     if(q){

        const results = dbconexion.filter((product)=>{

            const {title} = product;

            return title.toLowerCase().include(q.toLowerCase());

        });

        return res.status(200).json(results)

     }

 

     res.status(400).json()

 }