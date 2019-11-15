import React,{useState} from 'react';
import PropTypes from 'prop-types';

const Search = ({searchUser,showClear,clearUsers,setAlert})=>{
    const[text,setText] = useState('')
   
   const onSubmit =(e)=>{
        e.preventDefault();
     if(text === '' ){
            setAlert("Please enter value","light")
     }
     else{
        searchUser(text);
       setText('')
     }
       
   }
   const onChange = (e) =>{
       setText(e.target.value)
   }
  
  
   
        return (
          <div>
              <form onSubmit={onSubmit} className="form">
            <input value={text} onChange={onChange} type="text" name="text" placeholder="Search User..." />
            <input type="submit" value="Search" className="btn btn-dark btn-block" />
              </form>
              {showClear && <input type="submit" value="Clear" onClick={clearUsers} className="btn btn-light btn-block" />}
              
          </div>
        )
  
}
Search.propTypes ={
    searchUser:PropTypes.func.isRequired,
    clearUsers:PropTypes.func.isRequired,
    showClear:PropTypes.bool.isRequired,
  setAlert:PropTypes.func.isRequired
}
export default Search;
