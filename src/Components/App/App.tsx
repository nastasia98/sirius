import './App.css';
import {FC} from "react";
import ChipsList from "../ChipsList/ChipsList";
import {state} from "../../State/state";

const App: FC = () => {

    return (
        <div className="app">
            <ChipsList list={state}/>
        </div>
    );
}
export default App;
