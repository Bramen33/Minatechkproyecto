"use client"

import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'

import { SidebarItem } from '../SidebarItem'

import { dataGeneralSidebar, dataSupportSidebar, dataToolsSidebar, dataGeneralSidebarAdmin } from './SidebarRoutes.data'
import { useEffect } from 'react'

interface SidebarRoutesProps {
    role: number;
}

export const SidebarRoutes: React.FC<SidebarRoutesProps> = ({role}) => {
    const generalSidebar = role == 1? dataGeneralSidebarAdmin:dataGeneralSidebar
    useEffect(() => {
      console.log('role:', role);
      
    }, [])
    
    return (
        <div className='flex flex-col justify-between h-full'>
            <div>
                <div className='p-2 md:p-6'>
                    <p className='text-slate-500 mb-2'>GENERAL</p>
                    {generalSidebar.map((item) => (
                        <SidebarItem key={item.label} item={item} />
                    ))}
                </div>

                <Separator />

                <div className='p-2 md:p-6'>
                    <p className='text-slate-500 mb-2'>TOOLS</p>
                    {dataToolsSidebar.map((item) => (
                        <SidebarItem key={item.label} item={item} />
                    ))}
                </div>

                <Separator />

                {/* <div className='p-2 md:p-6'>
                    <p className='text-slate-500 mb-2'>SUPPORT</p>
                    {dataSupportSidebar.map((item) => (
                        <SidebarItem key={item.label} item={item} />
                    ))}
                </div> */}
            </div>

            <div>
                <div className='text-center p-6'>
                    <Button variant="outline" className='w-full'>
                        Upgrade Plan
                    </Button>
                </div>

                <Separator />

                <footer className='mt-3 p-3 text-center'>
                    2024. All rights reserved
                </footer>
            </div>
        </div>
    )
}
