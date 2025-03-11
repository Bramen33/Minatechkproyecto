import { db } from '../../../../lib/db'
import {NextResponse} from 'next/server'

export async function POST(request) {
  console.log(request);
    
    try {
        const body = await request.json()

        const { first_name, last_name } = body.data;
        const email = body.data.email_addresses[0].email_address
        const name = `${first_name} ${last_name}`
        const roleId = 2
        const clerkId = body.data.id
        // Validar los datos
        if (!name || !email || !roleId) {
          return NextResponse.json({ success: false, message: 'Faltan datos requeridos' });
        }

        // Crear el usuario con Prisma
        const newUser = await db.user.create({
          data: {
            name,
            email,
            clerkId,
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
