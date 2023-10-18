import {FC} from "react";
import  './chips.css'

interface ChipsProps{
    title: string
}
const Chips: FC<ChipsProps> = ({title}) => {
    return (
        <button className='btn__item'>
            {title}
        </button>
    )
}
export default Chips