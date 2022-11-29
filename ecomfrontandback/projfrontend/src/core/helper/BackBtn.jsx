import { IoArrowBackCircleSharp } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';


export const BackBtn = ({path}) => {
    const navigate = useNavigate();
    // console.log(navigate);
    return(
        <button className='btn btn-sm btn-info mb-3 mt-3' onClick={()=>{path ? navigate(path) : navigate(-1)}} ><IoArrowBackCircleSharp/> Back </button>
    )
}

export default BackBtn;