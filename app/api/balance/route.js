import { db } from '../../../lib/db'
import {NextResponse} from 'next/server'

export async function PUT(request) {
    console.log('request', request);
    try {
        const body = await request.json()
        console.log('body',body);
        const { id, balance, amount, type } = body;

        // Validar los datos
        if (!balance) {
          return NextResponse.json({ success: false, message: 'Faltan datos requeridos' });
        }

        //depositar=0, retirar=1

        // Crear el usuario con Prisma
        const res = await db.balance.update({
            where:{
                id: id
            },
            data: {
                amount: balance,
                transactions: {
                    create: [
                        {
                            amount: amount,
                            type: type
                        }
                    ]
                }
            },
        });

        return NextResponse.json({ success: true, data: res })
      } catch (error) {
        console.error(error);
        if (error.code === 'P2002') {
            // Prisma error code for unique constraint violation
            return NextResponse.json({ success: false, message: 'El email ya está registrado' });
        }
        else return NextResponse.json({ success: false, message: error});
      }
    
  }