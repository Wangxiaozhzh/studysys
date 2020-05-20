import React from 'react';
import '../../Static/Css/home.css'
import Snapshot from './snapshot';
import RecentInterview from './recentInterview';
import StudentArea from './student';
import Course from './course';

function Home(){
    return(
        <div>
            <Snapshot />
            <RecentInterview />
            <StudentArea />
            <Course />
        </div>
    )
}
export default Home;