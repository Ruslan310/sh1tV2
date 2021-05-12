import {
   FETCH_APTEKS,
   APTEKS_RECEIVED,
   POST_COMMENT,
   POST_COMMENT_RECEIVED,
   LOG_IN_FAILED,
   FETCH_REPORT,
   FETCH_REPORT_RECEIVED, FETCH_CHANGE_REPORT, FETCH_CHANGE_REPORT_RECEIVED
} from "../redux/action";

import {put, takeLatest, all} from 'redux-saga/effects';

/**saga getApteka */
function* fetchApteks() {
   let data = yield fetch(process.env.REACT_APP_SAGA_FETCH_APTECS)
      .then(response => response.json());
   let newList = []
   data[0].map(item => {
      let parsed = {}
      parsed.idApteka = item.id_apteka
      parsed.apteka = item.apteka
      parsed.isFilter = true
      newList.push(parsed)
      return null
   })
   yield put({type: APTEKS_RECEIVED, data: newList});
}

function* fetchApteksWatcher() {
   yield takeLatest(FETCH_APTEKS, fetchApteks)
}


/** saga postComment */
function* postComment(action) {
   let options = {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json',
      },
      body: JSON.stringify(action.value)
   }
   console.log('saga', action.value)

   try {
      const data = yield fetch(process.env.REACT_APP_SAGA_INPUT_COMMENT, options)
         .then(response => response.json());
      console.log('saga-data', data)
      yield put({type: POST_COMMENT_RECEIVED, data: data});
   } catch (error) {
      yield put({type: LOG_IN_FAILED, data: error.toString()});
   }
}

function* postCommentWatcher() {
   yield takeLatest(POST_COMMENT, postComment)
}

/**saga getReport */
function* fetchReport(action) {
   let options = {
      method: 'PUT',
      headers: {
         'Content-Type': 'application/json',
      },
      body: JSON.stringify(action.value)
   }
   console.log('saga', action.value)
   try {
      let data = yield fetch(process.env.REACT_APP_SAGA_FETCH_REPORT, options)
         .then(response => response.json());
      const format = (dateString) => {
            let time = dateString.split('T')[1].substring(0, 5)
            let arrDate = dateString.split('T')[0].split('-')
            let date = `${arrDate[2]}.${arrDate[1]}.${arrDate[0]}`
            return {date, time}
      }
      console.log(data)
      const formatGrafik = (dateString) => {
         if(!dateString){
            return '-'
         }
         let day1 = dateString.split('-')[0].substring(11, 16)
         let day2 = dateString.split('-')[1].substring(12, 17)
         if (day1 === '00:00'){
            return "круглосуточная"
         }
         return `${day1}-${day2}`
      }
      let newList =[]
      data.map(item => {
         let parsed = {}
         parsed.apteka = item.apteka
         parsed.dt_date = format(item.dt_date).date
         parsed.grafik = formatGrafik(item.grafik)
         parsed.dt_end = !item.dt_end ? item.dt_end : format(item.dt_end).time
         parsed.dt_begin = format(item.dt_begin).time
         parsed.comment = item.comment ==='null'? null : item.comment
         parsed.id = item.id
         newList.push(parsed)
      })
      console.log(newList)
      yield put({type: FETCH_REPORT_RECEIVED, data: newList});
   } catch (error) {
      yield put({type: LOG_IN_FAILED, data: error.toString()});
   }
}

function* fetchReportWatcher() {
   yield takeLatest(FETCH_REPORT, fetchReport)
}

/**saga getReport */
function* fetchPutReport(action) {
   let options = {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json',
      },
      body: JSON.stringify(action.value)
   }
   console.log('saga_cheng', action.value)
   try {
      let data = yield fetch('http://localhost:4000/changeDashbord', options)
         .then(response => response.json());
      console.log('saga_cheng-data', data)

      yield put({type: FETCH_CHANGE_REPORT_RECEIVED, data: data});
   } catch (error) {
      yield put({type: LOG_IN_FAILED, data: error.toString()});
   }
}

function* fetchPutReportWatcher() {
   yield takeLatest(FETCH_CHANGE_REPORT, fetchPutReport)
}

export default function* rootSaga() {
   yield all([
      fetchApteksWatcher(), postCommentWatcher(), fetchReportWatcher(),fetchPutReportWatcher()
   ])
}
  