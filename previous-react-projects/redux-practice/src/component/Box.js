import { useSelector } from "react-redux";
import GrandSonBox from './GrandSonBox';

const Box = () => {
    let count = useSelector(state => state.count)
    return (<div>
        <div>Box에서의 count: {count}</div>
        <div><GrandSonBox /></div>
    </div>);
}

export default Box