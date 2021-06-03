import React, {useEffect, useState} from "react"
import {BrowserRouter} from "react-router-dom"
import Comment from "./component/comment"
import {
    fetchApteks, fetchReport,
} from "./redux/action";
import {useDispatch} from "react-redux";
import Loader from "./component/loader";


const App = () => {
    const [isAuth, setAuth] = useState(true)

    let nowDate = new Date().toISOString().substr(0, 10)
    const dispatch = useDispatch()
    useEffect(() => {
        // authCheck()
        //     .then(null)
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
                <Loader />
            </div>
        )
    }
};

export default App;