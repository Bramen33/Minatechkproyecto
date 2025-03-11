import { db } from '../../../../lib/db'
import {NextResponse} from 'next/server'


export async function GET(req, {params}){
    
    const {id} = await params
    try {
        const user = await db.user.findUnique({
            where: {
              clerkId: id, // Usa el campo ID del modelo
            },
            include: {
                balance: true
            }
        });
        // const users = await db.user.findMany()
        return NextResponse.json(user)
    } catch (error) {
        return NextResponse.json({message:error.message})
    }
}

//   switch (method) {
//     case 'POST':
      
//       break;

//     default:
//       res.setHeader('Allow', ['POST']);
//       res.status(405).end(`Método ${method} no permitido`);
//   }