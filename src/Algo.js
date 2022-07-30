import axios from 'axios';
import { useEffect, useState } from 'react';
import { Navigate, useNavigate } from "react-router-dom"
import Dashboard from './Dashboard';

function App({url, setRepoRating, setUserRating, setResultRating}) {
  
  //////////////////// Urls ////////////////////
  var input = url;
  const navigate = useNavigate()
  // console.log(input);
  // setRepoRating(25)
  var arr = input.split("/");
  let name = arr[3];
  let repodum = arr[4].split(".");
  var repoName= repodum[0] 
  var contributors_url;
  var user_url= "https://api.github.com/users/"+name;
  var userRepos_url= "https://api.github.com/users/"+name+"/repos";
  var commits_url = "https://api.github.com/repos/"+ name +"/"+ repoName + "/commits";
  var subscribers_url= "https://api.github.com/repos/"+ name +"/"+ repoName + "/subscribers";
  var followers_url= "https://api.github.com/users/"+name+"/followers";
  var [user, setUser] = useState (0);
  


  /////////////// user profile info variables /////////
  var [userinfo, setUserInfo] = useState(0);
  var [userAuthenticationCheck, setuserAuthenticatonCheck]= useState(0);
  var [userName, setUserName]= useState(0);
  var [userRepoForkCount, setuserRepoForkCount]= useState(0);
  var [userRepoFollwersNumber, setuserRepoFollowersNumber]= useState(0);
  var [userRepoStar, setuserRepoStar]= useState(0);
  var [userRepoContributer, setuserRepoContributor]= useState(0);
  var [userRepoSubs, setuserRepoSubs]= useState(0);
  var [userRepoCommit, setuserRepoCommit]= useState(0);
  var [userRepoWatchers, setuserRepoWatchers]= useState(0);
  var [userRepoOpenIssues, setuserRepoOpenIssues]= useState(0);
  var [userEmail, setuserEmail]= useState('');


  /// Fetch user Repo data
  const fetchData = async () => {
  const response = await fetch(userRepos_url)
      if (!response.ok) {
        throw new Error('Data coud not be fetched!')
      } else {
        return response.json()
      }
    }
    useEffect(() => {
      fetchData()
        .then((res) => {
          setUser(res)
          // console.log(user)
        })
        .catch((e) => {
          console.log(e.message)
        })
  }, []);

  // repo variables
  var thisRepoForkCount = 0;
  var thisRepofollwersNumber = 0;
  var thisRepoStar = 0;
  var thisRepoContributer = 0;
  var thisRepoSubs = 0;
  var thisRepoCommit = 0;
  var thisRepoWatchers = 0;
  var thisRepoOpenIssues = 0;

  // fetch userinfo 
  const fetchUserInfo = async () => {
    const response = await fetch(user_url)
        if (!response.ok) {
          throw new Error('Data coud not be fetched!')
        } else {
          return response.json();
        }
  }
  // fetch  contributors
  const fetchContri = async () => {
    const response = await fetch(contributors_url)
        if (!response.ok) {
          throw new Error('Data coud not be fetched!')
        } else {
          return response.json();
        }
  }


  //  fetch commits
  const fetchCommit = async () => {
     const response = await fetch(commits_url)
         if (!response.ok) {
           throw new Error('Data coud not be fetched!')
         } else {
           return response.json();
         }
  }

  // fetch subscribers 
  const fetchSubs = async () => {
    const response = await fetch(subscribers_url)
        if (!response.ok) {
          throw new Error('Data coud not be fetched!')
        } else {
          return response.json();
        }
  }
  
   // fetch followers 
  const fetchFollowers = async () => {
    const response = await fetch(followers_url)
        if (!response.ok) {
          throw new Error('Data coud not be fetched!')
        } else {
          return response.json();
        }
  }

  var dash= false;
  var userRating=5;
  var repoRating=6;
  var resultRating= 7;
  function calculateRating(){
    dash =true;
  }

  return (
    <>
    { user.length 
        && 
         fetchUserInfo()
         .then((res) => {
           setuserEmail(res.email);
           setUserName(res.name)
          //  console.log(res)
           setuserRepoFollowersNumber(res.followers);
          //  console.log(userRepoFollwersNumber)
         })
         .catch((e) => {
           console.log(e.message)
         })
        &&
        Object.entries(user).forEach(([key, value]) => {
          ////////////////// User Profile Info//////////////////
          userRepoForkCount = Number(value.forks_count) + Number(userRepoForkCount);
          userRepoStar = Number(value.stargazers_count) + Number(userRepoStar);
          userRepoWatchers = Number(value.watchers) + Number(userRepoWatchers);
          userRepoOpenIssues = Number(value.open_issues_count) + Number(userRepoOpenIssues);
       
          if(value.clone_url === input){
            ///////////////// Repo Info ///////////////////
            contributors_url= value.contributors_url;
           
            thisRepoForkCount = value.forks_count;
            thisRepoStar = value.stargazers_count;
            thisRepoOpenIssues= value.open_issues_count;
            thisRepoSubs= value.subcribers_count;
            thisRepoWatchers= value.watchers_count;
            
            // fetchFollowers()
            // .then((res) => {
            //   // console.log(res.length)
            //   thisRepoSubs= res.length;
            // })
            // .catch((e) => {
            //   console.log(e.message)
            // })
          }
          
        })
        &&
        calculateRating().then(() =>{
          // console.log(dash)
        })
    
    }


    <div>
           {/* repo algo */}
        <div><h1>This repo info</h1></div>
        <p>fork({thisRepoForkCount})</p>
        <p>star({thisRepoStar})</p>
        <p>watchers({thisRepoWatchers})</p>
        <p>issue({thisRepoOpenIssues})</p>
        
        
        
        <Dashboard repoRating={repoRating} userRating={userRating} resultRating={resultRating}/>

        {/* user info algo */}
        <div><h1>User info algo</h1></div>
        <p>name({userName})</p>
        <p>fork({userRepoForkCount})</p>
        <p>star({userRepoStar})</p>
        <p>watchers({userRepoWatchers})</p>
        <p>issue({userRepoOpenIssues})</p>
        <p>email({userEmail})</p>
        </div>
    </>

  );
}

export default App;
