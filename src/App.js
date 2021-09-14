import React, {useEffect, useState} from "react"
import {fetchPharmacy, fetchReport, getGroupAx4, getNewNumber,} from "./redux/action";
import {useDispatch} from "react-redux";
import Loader from "./component/loader";
import Comment from "./component/Comment";
import {getTrableNumber} from "./redux/helpFunction";


const App = () => {
    const [isAuth, setAuth] = useState(false)
    const authCheck = async () => {
        let userToken = localStorage.getItem('currentUserToken');
        let options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': userToken,
            }
        }
        if (userToken) {
            let result = await fetch(`${process.env.REACT_APP_USER_API}/checkRight/${process.env.REACT_APP_ID}`, options)
                .then( res => {
                    if (res.status !== 200) return false
                    return res.json()
                } )
            if (!result) {
                localStorage.clear()
                window.location.href = process.env.REACT_APP_TMC
                return null
            }
            setAuth(true)
        } else {
            localStorage.clear()
            window.location.href = process.env.REACT_APP_TMC
        }
    }
    let nowDate = new Date().toISOString().substr(0, 10)
    const dispatch = useDispatch()
    const onLoad = async () => dispatch(getNewNumber( await getTrableNumber() ))
    useEffect(() => {
        authCheck()
            .then(null)
        onLoad().then(null)
        dispatch(fetchPharmacy())
        dispatch(getGroupAx4())
        dispatch(fetchReport({
            dateStart: nowDate,
            dateEnd: nowDate,
        }))
    }, [])// eslint-disable-line

    if (isAuth) return <Comment/>
    else return <Loader />
}

export default App;