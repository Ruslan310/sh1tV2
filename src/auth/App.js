import React, {useEffect, useState} from "react"
import {BrowserRouter} from "react-router-dom"
import Comment from "./component/comment"
import {
    fetchApteks, fetchReport,
} from "./redux/action";
import {useDispatch} from "react-redux";
import Loader from "./component/loader";


const App = () => {
    const [isAuth, setAuth] = useState(false)

    const authCheck = async () => {
        let userToken = localStorage.getItem('currentUserToken');
        let userID = localStorage.getItem('currentUserID')?.replace(/"/gi, '');
        if (userToken && userID) {
            let checkCredentials = await fetch(`${process.env.REACT_APP_USER_API}/usersAuthCheck:${userID}:${userToken}`)
                .then(res => res.json())
            let checkRights = await fetch(`${process.env.REACT_APP_USER_API}/hasRights:${userID}:${process.env.REACT_APP_ID}`)
                .then(res => res.json())
            if (!checkCredentials || !checkRights) {
                window.location.href = "https://tmc.lll.org.ua/"
            } else {
                setAuth(true)
            }
        } else {
            window.location.href = "https://tmc.lll.org.ua/"
        }
    }
    let nowDate = new Date().toISOString().substr(0, 10)
    const dispatch = useDispatch()
    useEffect(() => {
        authCheck()
            .then(null)
        dispatch(fetchApteks())
        dispatch(fetchReport({
            dateStart: nowDate,
            dateEnd: nowDate,
        }))
        setInterval(() =>
            dispatch(fetchReport({
                dateStart: nowDate,
                dateEnd: nowDate,
            })), 10 *60 * 1000)

        // dispatch(fetchReport({
        //     dateStart: nowDate,
        //     dateEnd: nowDate,
        // }))
    }, [])// eslint-disable-line

    if (isAuth) {
        return (
            <BrowserRouter>
                <Comment/>
            </BrowserRouter>
        );
    } else {
        return (
            <div>
                <Loader/>
            </div>
        )
    }
};

export default App;