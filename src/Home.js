import React, { useState,Component } from 'react'
import Algo from './Algo';
import "./home.css"
import { BrowserRouter as Router, Route, Link} from 'react-router-dom'
import Dashboard from './Dashboard';

function Home() {
    const[url,setUrl] = useState(null)
    const [value, setValue] = useState(null);
    const [result, setResult] = useState(false);

    var [repoRating, setRepoRating] = useState();
    var [userRating, setUserRating] = useState();
    var [resultRating, setResultRating] = useState();

    function geturl(val){
        setUrl(val.target.value);
    }

    function checkUrl(){
        var regex = /(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
        if(!regex .test(url)) {
            alert("Please enter valid URL.");
            return false;
        } 
        var arr = url.split("/");
        let name = arr[3];
        let repodum = arr[4].split(".");
        var repoName= repodum[0];
        var lastval = url.slice(-3);
        if(arr[2] !== "github.com" && arr[2] !== "api.github.com") {
            alert("It is not a valid github url");
            return false;
        }
        if(lastval!=="git") {
            alert("It is not a valid github url to download repos");
            return false;
        }
        else {
            setValue(url);
            setResult(true);   
        }
    }

    return (
        <>
        <div className='container header'>
            <h1 >Check Your Repositories here</h1>
            <div className='d-grid gap-2 d-md-flex col-6 justify-content-md-end'>
                <input className="form-control" type="text" placeholder="Enter the url"  onChange={geturl}/>
                <button className='btn btn-primary' onClick = {checkUrl} >Search</button>
            </div>
            {result && <Algo url={url} setRepoRating={setRepoRating} setUserRating={setUserRating} setResultRating={setResultRating} />}
        </div>
        
        </>
    )
}
export default Home;