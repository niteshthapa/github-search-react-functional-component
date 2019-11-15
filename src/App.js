import React,{useState,Fragment} from 'react';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Alert from './components/layout/Alert';
import About from './components/pages/About';

//import UserItem from './components/users/Usersitem';
import Users from './components/users/Users';
import Search from './components/users/Search';
import User from './components/users/User';

import axios from 'axios';
import './App.css';

const App = ()=>{
  const [users,setUsers]=useState([]);
  const [user,setUser]=useState({});
  const [repos,setRepos]=useState([]);
  const [loading,setLoading]=useState(false);
  const [alert,setAlert]=useState(null);
  // state ={
  //   users:[],
  //   user:{},
  //   loading:false,
  //   alert:null,
  //   repos:[]
  // }
 //async componentDidUpdate(){
  //  this.setState({
  //    loading:true
  //  })
    // const res = await axios.get("https://api.github.com/users")
    // .then(res=>{
    //   console.log(res.data)
    //   this.setState({
    //     users:res.data,
    //     loading:false
    //   })
    // })
    // .catch(err=>{
    //   console.log(err)
    // })
    
  //}
  //Single user
  const getUser = async(username)=>{
    setLoading(true)
    // this.setState({
    //       loading:true
    //     })
    await axios.get(`https://api.github.com/users/${username}`)
    .then(res=>{
      //console.log(res.data)
      // this.setState({
      //   user:res.data,
      //   loading:false
      // })
      setUser(res.data)
      setLoading(false)

    })
    .catch(err=>{
      console.log(err)
    })
  }
//User repo
const getUserRepos = async(username)=>{
  setLoading(true)

  // this.setState({
  //       loading:true
  //     })
  await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc`)
  .then(res=>{

    setRepos(res.data)
    setLoading(false)

    //console.log(res.data)
    // this.setState({
    //   repos:res.data,
    //   loading:false
    // },()=>{
    //   console.log(this.state.repos)
    // })
  })
  .catch(err=>{
    console.log(err)
  })
}
 const clearUsers =()=>{
    setUser([])
    setLoading(false)
    // this.setState({
    //   users:[],
    //   loading:false
    // }
      //)
  }
  const showAlert =(msg,type)=>{
    setAlert({msg,type})
    // this.setState({
    //   alert:{msg,type}
    // })
    setTimeout(()=>{
      setAlert(null)
      // this.setState({
      //   alert:null
      // })
    },1000)
  }
  //Search githhub user
  const searchUser = async(text)=>{
    setLoading(true)
    // this.setState({
    //       loading:true
    //     })
    await axios.get(`https://api.github.com/search/users?q=${text}`)
    .then(res=>{
      setUsers(res.data.items)
      setLoading(false)
      // this.setState({
      //   users:res.data.items,
      //   loading:false
      // })
    })
    .catch(err=>{
      console.log(err)
    })
  }
 
 
   
  return (
    <Router>
    <div className="App">
 
   <Navbar title="Github Finder" icon="fab fa-github" />
   <div className="container">
   <Alert alert={alert}/>
   <Switch>
    <Route exact path="/" render={props=>
(
      <Fragment>
<Search
 setAlert={showAlert}
 searchUser={searchUser}
 clearUsers={clearUsers}
 showClear={users.length > 0 ?true:false} />
      <Users loading={loading} users={users} />
      </Fragment>
  )  

    } />
    <Route exact path="/about" component={About} />
    <Route exact path="/user/:login" render={props=>(
      <User
      {...props}
      getUser={getUser}
      getUserRepos={getUserRepos}
      user={user}
      repos={repos}
      loading={loading}
      />
    )} />
   </Switch>
   </div>
  </div>
  </Router>
  );
 
 
}

export default App;
