import { db } from '../../../lib/db'
import {NextResponse} from 'next/server'

export async function POST(request) {
    
    try {
        const body = await request.json()
        console.log(body);
        const { name, email, roleId } = body;

        // Validar los datos
        if (!name || !email || !roleId) {
          return NextResponse.json({ success: false, message: 'Faltan datos requeridos' });
        }

        // Crear el usuario con Prisma
        const newUser = await db.user.create({
          data: {
            name,
            email,
            role: {
              connect: { id: roleId }, // Relación con la tabla Role
            },
            balance: {
              create: {
                amount: 0.0, // Balance inicial predeterminado
              },
            },
          },
        });

        return NextResponse.json({ success: true, data: newUser })
      } catch (error) {
        console.error(error);
        if (error.code === 'P2002') {
            // Prisma error code for unique constraint violation
            return NextResponse.json({ success: false, message: 'El email ya está registrado' });
        }
        else return NextResponse.json({ success: false, message: 'Error al crear el usuario'});
      }
    
  }

export async function GET(){
    try {
        const users = await db.user.findMany({
          include: {
            balance: true
          }
        })
        return NextResponse.json(users)
    } catch (error) {
        
    }
}

//   switch (method) {
//     case 'POST':
      
//       break;

//     default:
//       res.setHeader('Allow', ['POST']);
//       res.status(405).end(`Método ${method} no permitido`);
//   }