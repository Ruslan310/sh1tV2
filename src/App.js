import React, {useEffect} from "react"
import {BrowserRouter} from "react-router-dom"
import Comment from "./component/comment"
import {
    fetchApteks, fetchReport,
} from "./redux/action";
import {useDispatch} from "react-redux";


const App = () => {
    let nowDate = new Date().toISOString().substr(0, 10)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchApteks())
        dispatch(fetchReport({
            dateStart: nowDate,
            dateEnd: nowDate,
        }))
    }, [])// eslint-disable-line
    return (
        <BrowserRouter>
            <Comment/>
        </BrowserRouter>
    );
};

export default App;