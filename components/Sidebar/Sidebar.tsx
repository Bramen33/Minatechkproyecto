import { Logo } from "@/components/Logo";

import { SidebarRoutes } from "../SidebarRoutes";

interface SideBarProps {
    role: number;
}

export const Sidebar: React.FC<SideBarProps> = ({role}) => {
    return (
        <div className="h-screen">
            <div className="flex flex-col h-full border-r">
                <Logo />
                <SidebarRoutes role={role}/>
            </div>
        </div>
    )
}
