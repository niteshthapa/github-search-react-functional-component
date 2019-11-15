import React,{Fragment} from 'react';
import spinner from './spinner.gif';


const Spinner = ()=>{
   
    return (
        <Fragment>
            <img alt="Spinner" src={spinner} style={{width:"200px",margin:"auto",display:"block"}} />        </Fragment>
    )


}
export default Spinner;