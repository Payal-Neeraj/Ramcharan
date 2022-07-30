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
  var userRating = 0;
  var repoRating = 0;
  var resultRating= (userRating + repoRating)/2;
  // function calculateRating(){
  //   dash =true;
  // }

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
          if(userRepoForkCount >= 0 && userRepoForkCount <= 10){
            userRating = 20;
          }
          else if(userRepoForkCount >= 10 && userRepoForkCount <= 20){
            userRating = 40;
          }
          else if(userRepoForkCount >= 20 && userRepoForkCount <= 50){
            userRating = 60;
          }
          else if(userRepoForkCount > 50){
            userRating = 80;
          }
          //////////////////////////////////////
          if(userRepoStar >= 0 && userRepoStar <= 5){
            userRating += 40;
          }
          else if(userRepoStar >= 5 && userRepoStar <= 9){
            userRating += 70;
          }
          else if(userRepoStar >= 10 && userRepoStar <= 19){
            userRating += 80;
          }
          else if(userRepoStar > 20){
            userRating += 100;
          }
          ///////////////////////////////
          if(userRepoWatchers >= 0 && userRepoWatchers <= 4){
            userRating += 30;
          }
          else if(userRepoWatchers >= 5 && userRepoWatchers <= 10){
            userRating += 70;
          }
          else if(userRepoWatchers >= 10 && userRepoWatchers <= 19){
            userRating += 90;
          }
          else if(userRepoWatchers > 20){
            userRating += 100;
          }
          /////////////////////////////////
          userRating /= 3;

          ///////////////////////////////// This repo rating

          if(thisRepoStar >= 0 && thisRepoStar <= 2){
            repoRating = 10;
          }
          else if(thisRepoStar >= 3 && thisRepoStar <= 5){
            repoRating = 30;
          }
          else if(thisRepoStar >= 6 && thisRepoStar <= 10){
            repoRating = 70;
          }
          else if(thisRepoStar > 10){
            repoRating = 80;
          }
          //////////////////////////////////////
          if(thisRepoForkCount >= 0 && thisRepoForkCount <= 2){
            repoRating += 30;
          }
          else if(thisRepoForkCount >= 3 && thisRepoForkCount <= 5){
            repoRating += 70;
          }
          else if(thisRepoForkCount >= 6 && thisRepoForkCount <= 10){
            repoRating += 80;
          }
          else if(thisRepoForkCount > 10){
            repoRating += 100;
          }
          ///////////////////////////////
          if(thisRepoWatchers >= 0 && thisRepoWatchers <= 4){
            repoRating += 40;
          }
          else if(thisRepoWatchers >= 5 && thisRepoWatchers <= 10){
            repoRating += 80;
          }
          else if(thisRepoWatchers >= 10 && thisRepoWatchers <= 19){
            repoRating += 90;
          }
          else if(thisRepoWatchers > 20){
            repoRating += 100;
          }
          /////////////////////////////////
          repoRating /= 3;
      
          resultRating= (userRating + repoRating)/2;
        })

    }


    <div>
           {/* repo algo */}
        {/* <div><h1>This repo info</h1></div>
        <p>fork({thisRepoForkCount})</p>
        <p>star({thisRepoStar})</p>
        <p>watchers({thisRepoWatchers})</p>
        <p>issue({thisRepoOpenIssues})</p>
         */}
        <Dashboard repoRating={repoRating} userRating={userRating} resultRating={resultRating}/>

        {/* user info algo */}
        {/* <div><h1>User info algo</h1></div>
        <p>name({userName})</p>
        <p>fork({userRepoForkCount})</p>
        <p>star({userRepoStar})</p>
        <p>watchers({userRepoWatchers})</p>
        <p>issue({userRepoOpenIssues})</p>
        <p>email({userEmail})</p>
         */}
        </div>
    </>

  );
}

export default App;
