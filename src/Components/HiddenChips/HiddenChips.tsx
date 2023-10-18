import Chips from "../Chips/Chips";
import './hiddenChips.css'
import '../ChipsList/chipsList.css'
import {FC} from "react";
import {IChips} from "../../Interfaces/IChips";

interface ChipsListProps {
    hiddenChips: IChips[]
}
const HiddenChips: FC<ChipsListProps> = ({hiddenChips}) => {
    return(
        <div className='popup'>
            <ul className='list list--hidden'>
                {hiddenChips.map(el =>
                    <li key={el.id} className='list__item' >
                        <Chips title={el.title} />
                    </li>
                )}
            </ul>
        </div>
    )
}
export default HiddenChips