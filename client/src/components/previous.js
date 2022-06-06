import { Link } from "react-router-dom";
import '../styles/link.css';

const Previous = (props) => {
    return (
        <Link className='link-btn-prev' to={`/${props.point}`}> Previous </Link>
    )
}
export default Previous;