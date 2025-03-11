import { CustomIcon } from "@/components/CustomIcon";
import { CardSummaryProps } from "./CardSummary.types";
import { CustomTooltip } from "@/components/CustomTooltip";
import { cn } from "@/lib/utils";
import { MoveDownRight, MoveUpRight, TrendingUp } from "lucide-react";

export function CardSummary(props: CardSummaryProps) {
    const {  icon: Icon, title, tooltipText, total } = props

    return (
        <div className="shadow-sm bg-background rounded-lg p-5 py-3 hover:shadow-lg transition">
            <div className="flex justify-between">
                <div className="flex gap-2 items-center">
                    <CustomIcon icon={Icon} />
                    {title}
                </div>
                <CustomTooltip
                    content={tooltipText}
                />
            </div>
            <div className="flex gap-4 mt-2 md:mt-4">
                <p className="text-2xl">{total}</p>
               
                </div>
            </div>
        
    )
}
