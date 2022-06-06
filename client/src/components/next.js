import { Link } from "react-router-dom";
import '../styles/link.css';

const Next = (props) => {
    return (
        <Link className='link-btn' to={`/${props.point}`}> Next </Link>
    )
}
export default Next;