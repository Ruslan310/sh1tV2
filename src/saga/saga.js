import {
    FETCH_PHARMACY,
    FETCH_PHARMACY_RECEIVED,
    POST_COMMENT,
    POST_COMMENT_RECEIVED,
    LOG_IN_FAILED,
    FETCH_REPORT,
    FETCH_REPORT_RECEIVED,
    FETCH_CHANGE_REPORT,
    FETCH_CHANGE_REPORT_RECEIVED,
    POST_IN_FAILED,
    FETCH_GET_TRABLE,
    FETCH_GET_TRABLE_RECEIVED,
    ADD_NEW_PROBLEM_COMMENT,
    ADD_NEW_PROBLEM_COMMENT_RECEIVED,
    CLOSE_PROBLEM,
    CLOSE_PROBLEM_RECEIVED,
    ADD_NEW_NUMBER,
    ADD_NEW_NUMBER_RECEIVED,
    RECEIVED_GET_GROUP_AX4,
    GET_GROUP_AX4
} from "../redux/action";

import {put, takeLatest, all} from 'redux-saga/effects';

const format = (dateString) => {
    if (dateString) {
        let time = dateString.split('T')[1].substring(0, 5)
        let arrDate = dateString.split('T')[0].split('-')
        let date = `${arrDate[2]}.${arrDate[1]}.${arrDate[0]}`
        return {date, time}
    }
    return null
}

const formatGrafik = (dateString) => {
    if (!dateString) {
        return '-'
    }
    let day1 = dateString.split('-')[0].substring(0, 5)
    let day2 = dateString.split('-')[1].substring(1, 6)
    if (day2 === '23:59') {
        return "круглосуточная"
    }
    if (day2 === '00:00') {
        return "нет графика"
    }
    return `${day1}-${day2}`
}

const parsTableProblem = (array) =>{
    return array.map(item => {
        let parsed = {}
        parsed.id = item.id
        parsed.dt = format(item.dt).date
        parsed.time = format(item.dt).time
        parsed.comment = item.comment
        parsed.isDone = item.isDone
        parsed.timeDone = format(item.timeDone)
        return parsed;
    })
}

const currentTime = (firstTime, string) => {
    let getDate = (string) => new Date(0, 0,0, string.split(':')[0], string.split(':')[1])
    let dif = getDate(`${new Date().getHours()}:${new Date().getMinutes()}`) - getDate(firstTime)
    if(dif > 1800000 && string === 'title') {return true}
    if(dif > 7200000 && string === 'Coll')
    return false
}

const addPostLight = (array) =>{
    return array.map(post => {
        let pars = {}
        pars.apteka = post.apteka
        pars.diff = post.diff
        pars.category = post.category
        pars.dt_date = format(post.dt_ins)
        pars.date = post.dt_ins.substring(0, 10)
        pars.grafik = formatGrafik(post.grafik)
        pars.dt_end = format(post.dt_end)?.time
        pars.dt_begin = format(post.dt_begin)?.time
        pars.comment = post?.comment
        pars.id = post.id
        pars.CounselName = post.CounselName
        pars.kurPhone = post.kurPhone
        pars.phone = post.phone
        pars.situation = post.situation
        pars.teamAh4 = post.teamAh4 ? post.teamAh4 : '- не выбрана - '
        pars.isTurnOnOff = post.isTurnOnOff
        pars.isTurnGo = post.isTurnGo
        pars.isRedTitle = currentTime(format(post.dt_ins).time, 'title')
        pars.isCollCurs = currentTime(format(post.dt_ins).time, 'Coll')
        return pars
    })
}

/**saga getPharmacy */
function* fetchPharmacy() {
    let data = yield fetch(process.env.REACT_APP_SAGA+'getDatePharmacy')
        .then(response => response.json());
    let newList = []
    data.map(item => {
        let parsed = {}
        parsed.idPharmacy = item.ID_APTEKA
        parsed.pharmacy = item.APTEKA
        parsed.pharmacy_date_open = format(item.apteka_date_open)?.date
        parsed.phone = item.Phone
        parsed.town = item.TownRu
        parsed.days1 = item.days1
        parsed.days2 = item.days2
        parsed.isFilter = true
        return newList.push(parsed)
    })
    yield put({type: FETCH_PHARMACY_RECEIVED, data: newList});
}

function* fetchPharmacyWatcher() {
    yield takeLatest(FETCH_PHARMACY, fetchPharmacy)
}

/**  добавление поста   */

function* postComment(action) {
    let options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(action.value)
    }
    console.log('saga', action.value)
    try {
        let data = yield fetch(process.env.REACT_APP_SAGA+'inputDashboard', options)
            .then(response => response.json());
        data = addPostLight(data)
        console.log('beforeNewData', data)

        yield put({type: POST_COMMENT_RECEIVED, data: data});
    } catch (error) {
        yield put({type: POST_IN_FAILED, data: false});
    }
}

function* postCommentWatcher() {
    yield takeLatest(POST_COMMENT, postComment)
}

/**   saga getReport */

function* fetchReport(action) {
    let options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(action.value)
    }
    try {
        let data = yield fetch(process.env.REACT_APP_SAGA+'getDashboard', options)
            .then(response => response.json());
        data = addPostLight(data)
        yield put({type: FETCH_REPORT_RECEIVED, data: data});
    } catch (error) {
        yield put({type: LOG_IN_FAILED, data: error.toString()});
    }
}
function* fetchReportWatcher() {
    yield takeLatest(FETCH_REPORT, fetchReport)
}

/**saga changeReport */
function* fetchPutReport(action) {
    let options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(action.value)
    }
    try {
        let data = yield fetch(process.env.REACT_APP_SAGA+'changeDashboard', options)
            .then(response => response.json());
        data = addPostLight(data)
        yield put({type: FETCH_CHANGE_REPORT_RECEIVED, data: data});
    } catch (error) {
        yield put({type: LOG_IN_FAILED, data: error.toString()});
    }
}

function* fetchPutReportWatcher() {
    yield takeLatest(FETCH_CHANGE_REPORT, fetchPutReport)
}

/**saga getProblemInfo */
function* fetchGetTrable() {
    let options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    }
    try {
        let data = yield fetch(process.env.REACT_APP_SAGA+'getTrable', options)
            .then(response => response.json());
        data = parsTableProblem(data)
        yield put({type: FETCH_GET_TRABLE_RECEIVED, data: data});
    } catch (error) {
        yield put({type: LOG_IN_FAILED, data: error.toString()});
    }
}

function* fetchGetProblemWatcher() {
    yield takeLatest(FETCH_GET_TRABLE, fetchGetTrable)
}

/**  добавление нового поста проблемы  */
function* addNewProblemComment(action) {
    let options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(action.value)
    }
    console.log('saga', action.value)
    try {
        let data = yield fetch(process.env.REACT_APP_SAGA+'addNewTrable', options)
            .then(response => response.json());

        data = parsTableProblem(data)


        yield put({type: ADD_NEW_PROBLEM_COMMENT_RECEIVED, data: data});
    } catch (error) {
        yield put({type: POST_IN_FAILED, data: false});
    }
}

function* addNewProblemCommentWatcher() {
    yield takeLatest(ADD_NEW_PROBLEM_COMMENT, addNewProblemComment)
}


/**  апдейт поста в проблемах  */
function* closeProblem(action) {
    let options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(action.value)
    }
    console.log('sagaID', action.value)
    try {
        let data = yield fetch(process.env.REACT_APP_SAGA+'updateTrable', options)
            .then(response => response.json());

        data = parsTableProblem(data)

        yield put({type: CLOSE_PROBLEM_RECEIVED, data: data});
    } catch (error) {
        yield put({type: POST_IN_FAILED, data: false});
    }
}

function* updateNewProblemCommentWatcher() {
    yield takeLatest(CLOSE_PROBLEM, closeProblem)
}

/**  добавление нового номера  */
function* addNewNumber(action) {
    let options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(action.value)
    }
    console.log('saga', action.value)
    try {
        let data = yield fetch(process.env.REACT_APP_SAGA+'addNewNumber', options)
            .then(response => response.json());
let newNumber = []
        console.log(data)
        data.map(post => {
            let parsed = {}
            parsed.id = post.id
            parsed.comment = post.comment
            return newNumber.push(parsed)
        })

        yield put({type: ADD_NEW_NUMBER_RECEIVED, data: newNumber});
    } catch (error) {
        yield put({type: POST_IN_FAILED, data: false});
    }
}

function* addNewNumberWatcher() {
    yield takeLatest(ADD_NEW_NUMBER, addNewNumber)
}


/**  получение бригады АХЧ  */
function* getGroupAx4() {
    let options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    }
    try {
        let data = yield fetch(process.env.REACT_APP_SAGA+'groupAx4', options)
            .then(response => response.json());
        yield put({type: RECEIVED_GET_GROUP_AX4, data: data});
    } catch (error) {
        yield put({type: LOG_IN_FAILED, data: false});
    }
}

function* getGroupAx4Watcher() {
    yield takeLatest(GET_GROUP_AX4, getGroupAx4)
}


export default function* rootSaga() {
    yield all([
        fetchPharmacyWatcher(),
        postCommentWatcher(),
        fetchReportWatcher(),
        fetchPutReportWatcher(),
        fetchGetProblemWatcher(),
        updateNewProblemCommentWatcher,
        addNewProblemCommentWatcher(),
        getGroupAx4Watcher(),
        addNewNumberWatcher()
    ])
}
  