import {FC, useEffect, useLayoutEffect, useRef, useState} from "react";
import Chips from "../Chips/Chips";
import './chipsList.css'
import Popup from "../Popup/Popup";
import {IChips} from "../../Interfaces/IChips";

interface ChipsListProps {
    list: IChips[]
}
const ChipsList: FC<ChipsListProps> = ({list}) => {

    const [isOpen, setIsOpen] = useState(false)
    const [hiddenChips, setHiddenChips] = useState<IChips[]>([])
    const [containerWidth, setContainerWidth] = useState(0);

    const containerRef = useRef<HTMLUListElement>(null)

    const observer = new ResizeObserver(entries => {
        const entry = entries[0];
        if (containerWidth !== entry.contentRect.width){
            setContainerWidth(entry.contentRect.width);
            setHiddenChips([]);
        }
    })

    useLayoutEffect(() => {
        const containerElement = containerRef.current
        const containerChildren = containerElement?.children;
        if (!containerChildren) return

        //calc sum widths of elements

        const chipsWidths: number[] = [];

        for (let i = 0, l = containerChildren.length; i < l; i++) {
            const chips = containerChildren[i];
            const chipsWidth = chips.getBoundingClientRect().width;
            const totalWidth = i > 0 ? 10 + chipsWidth : chipsWidth;
            chipsWidths.push(totalWidth);
        }

        //find hidden items

        const hiddenItems: IChips[] = [];
        let freiWidth = containerWidth - 60;

        list.forEach((chips, idx) => {
            const chipsWidth = chipsWidths[idx];
            chipsWidth <= freiWidth
                ? freiWidth -= chipsWidth
                : hiddenItems.push({id: chips.id, title: chips.title})
        });

        setHiddenChips(hiddenItems);

    }, [list, containerWidth]);

    useEffect(() => {
        const containerElement = containerRef.current
        if(containerElement){
            observer.observe(containerElement)
        }

        return () => observer.disconnect();
    }, [observer, containerWidth])
    const togglePopup = () => setIsOpen(!isOpen)

    return (
        <ul className='list' ref={containerRef}>
            {list.map((chips) => {
                let res = hiddenChips.filter((chip) => chip.id === chips.id)
                if (res.length) {
                    return null;
                }
                return (
                    <li key={chips.id} className='list__item'>
                        <Chips title={chips.title}/>
                    </li>
                )})
            }
            {Object.keys(hiddenChips).length > 0 &&
                <Popup
                    togglePopup={togglePopup}
                    hiddenChips={hiddenChips}
                    isOpen={isOpen}
                />
            }
        </ul>
    )
}
export default ChipsList