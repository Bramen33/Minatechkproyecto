import { db } from '../../../../lib/db'
import {NextResponse} from 'next/server'


export async function GET(req, {params}){
    
    const {id} = await params
    try {
        const balance = await db.balance.findUnique({
            where: {
              userId: parseInt(id), // Usa el campo ID del modelo
            },
            include: {
                transactions: {
                    orderBy: { createdAt: 'desc'}
                }
            }
        });
        // const users = await db.user.findMany()
        return NextResponse.json(balance)
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