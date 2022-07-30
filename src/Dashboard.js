import React, { useState } from 'react'
import "./home.css"

function Dashboard({repoRating, userRating, resultRating}) {

    

    // const userRating = "80";
    // const repoRating = "60";
    // const faltuRating = "50";

    const Progress = ({done}) => {
        const [style, setStyle] = React.useState({});
        
        setTimeout(() => {
            const newStyle = {
                opacity: 1,
                width: `${done}%`
            }
            
            setStyle(newStyle);
        }, 100);
        
        return (
            <div className="progress">
                <div className="progress-done" style={style}>
                    {done}%
                </div>
            </div>
        )
    }
  return (
    <div className='results '>
        <h2>Result</h2>
        <div className='d-grid gap-2 d-md-flex'>
            <p className='lables'>User Rating</p>
            <Progress done = {userRating}/>
        </div>
        <div className='d-grid gap-2 d-md-flex'>
            <h4 className='lables'>Repo Rating</h4>
            <Progress done = {repoRating}/>
        </div>
        <div className='d-grid gap-2 d-md-flex'>
            <h4 className='lables'>Overall Rating</h4>
            <Progress done = {resultRating}/>
        </div>
        {
            resultRating == 0 ?
            <div className='d-grid gap-2 d-md-flex col-6'>
            <h4 className='final_no'>No rating found</h4>
            </div> :
            ((resultRating >= 30) ?
            <div className='d-grid gap-2 d-md-flex col-6'>
            <h4 className='final_good'>Good To Install</h4>
            </div> :
            <div className='d-grid gap-2 d-md-flex col-6'>
            <h4 className='final_bad'>Bad To Install</h4>
            </div> )

        }
        
    </div>
  )
}

export default Dashboard