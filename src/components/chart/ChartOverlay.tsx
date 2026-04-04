import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '@/utils/redux/appStore';

interface ChartOverlay {
    stringOne: string;
    chartTitle: string;
}

const ChartOverlay: React.FC<ChartOverlay> = ({
    stringOne,
    chartTitle
}) => {

    const themeMode = useSelector((store: RootState) => store.app.lightTheme);
    const navigate = useNavigate();

    return (
        <div className={`absolute inset-0 z-10 flex flex-col items-center justify-center backdrop-blur-xs ${themeMode ? "bg-white/70" : "bg-black/70"}`}>
            <div className="text-center">
                <div className="text-xl font-semibold mb-2">{chartTitle+" "}Chart</div>
                <div className="text-lg font-semibold mb-2">Upgrade Required</div>
                <div className="text-sm text-muted-foreground mb-4">This chart is available on {stringOne} plan and above</div>
                <button className="px-4 py-1 rounded bg-indigo-600 text-white text-sm hover:bg-indigo-700 transition" onClick={() => navigate("subscriptions")}>
                    Upgrade Plan
                </button>
            </div>
        </div>
    )
}

export default ChartOverlay