import '../Chips/chips.css'
import {createPortal} from "react-dom";
import HiddenChips from "../HiddenChips/HiddenChips";
import {IChips} from "../../Interfaces/IChips";
import {FC} from "react";

interface PopupProps{
    hiddenChips: IChips[];
    isOpen: boolean;
    togglePopup: () => void
}
const Popup: FC<PopupProps> = ({togglePopup, hiddenChips, isOpen}) => {

    const appNode = document.querySelector('.app')

    return(
        <>
            <button className='btn__item' style={{'width': '50px'}} onClick={() => togglePopup()}>
                ...
            </button>
            {
                isOpen && appNode
                ? createPortal(<HiddenChips hiddenChips={hiddenChips} />, appNode)
                : null
            }
        </>
    )
}
export default Popup