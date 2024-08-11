import React from 'react'

type Props = {
    color: string;
    onClick?: (color: string) => void;
    brandColor?: string;
    selected?: boolean;
    setSelected?: (selected: boolean) => void;
}

const ColorPicker = ({ color, onClick, brandColor, selected, setSelected }: Props) => {
    const isSelected = color === brandColor;
    return (
        <div className={`w-[30px] h-[30px] bg-white rounded-[100px] ${!selected && isSelected ? 'border border-gray-500' : ''} flex items-center justify-center`}>
            <div
                className={`w-[24px] h-[24px] hover:scale-105 cursor-pointer rounded-[100px] ${color}`}
                onClick={() => {
                    onClick(color)
                    setSelected(false)
                }}
            />
        </div>
    )
}

export default ColorPicker