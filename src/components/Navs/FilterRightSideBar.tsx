import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Slider } from '../ui/slider';
import { useSelector } from 'react-redux';
import CommonButton from '../common/CommonButton';
import { RootState } from '@/utils/redux/appStore';
import { Checkbox } from '../ui/checkbox';

interface FilterRightSideBarProps {
    onClose: () => void;
}

const FilterRightSideBar: React.FC<FilterRightSideBarProps> = ({ onClose }) => {

    const [range, setRange] = useState<number>(500);
    const [slotFlowTrusted, setSlotFlowTrusted] = useState<boolean>(false);
    const filterSideBarOpen: boolean = useSelector((store: RootState) => store.app.filterSideBarOpen);

    const handleChangeRange = (value: number[]) => {
        setRange(value[0]);
    }

    return (
        <div className={` ${filterSideBarOpen ? 'w-[20%]' : 'w-[0%]'} overflow-y-scroll no-scrollbar border-l-2 transition-all duration-300 flex flex-col absolute right-0 top-0 bg-[var(--background)] h-full border-t-2`}>
            <div className='p-4 mt-2'>
                <div className="flex justify-between items-center mb-4">
                    <button onClick={onClose} className="cursor-pointer">
                        <X className="w-5 h-5 text-gray-500" />
                    </button>
                    <CommonButton text='Apply Filter' />
                </div>

                <div className="p-2">
                    <div className='flex justify-between'>
                        <h4>Price Range</h4>
                        <h4> ₹ {range}</h4>
                    </div>
                    <Slider
                        value={[range]}
                        onValueChange={handleChangeRange}
                        max={30000}
                        step={1}
                        className='mt-4'
                    />
                </div>
                <div className="p-2 mt-2">
                    <div className='flex justify-between items-center'>
                        <h4>Slotflow Trusted</h4>
                        <Checkbox
                            checked={slotFlowTrusted}
                            onCheckedChange={(checked) => {
                                setSlotFlowTrusted(!!checked);
                            }}
                            className='ml-4 cursor-pointer'
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FilterRightSideBar;
