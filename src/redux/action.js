export const SHOW_APTEKS = 'SHOW_APTEKS'
export const CLOSE_APTEKS = 'CLOSE_APTEKS'
export const FETCH_APTEKS = 'FETCH_APTEKS'
export const APTEKS_RECEIVED = 'APTEKS_RECEIVED'
export const ENTER_APTEKA = 'ENTER_APTEKA'
export const ENTER_COMMENT = 'ENTER_COMMENT'
export const ENTER_TIME_ON = 'ENTER_TIME_ON'
export const ENTER_TIME_OFF = 'ENTER_TIME_OFF'
export const ENTER_TARGET_APTEKA = 'ENTER_TARGET_APTEKA'
export const SET_FILTER = 'SET_FILTER'
export const RESET_FILTER = 'RESET_FILTER'
export const POST_COMMENT = 'POST_COMMENT'
export const POST_COMMENT_RECEIVED = 'POST_COMMENT_RECEIVED'
export const LOG_IN_FAILED = 'LOG_IN_FAILED'
export const SET_MODAL_MESSAGE = 'SET_MODAL_MESSAGE'
export const FETCH_REPORT = 'FETCH_REPORT'
export const FETCH_REPORT_RECEIVED = 'FETCH_REPORT_RECEIVED'
export const REPORT_TIME_START = 'REPORT_TIME_START'
export const REPORT_TIME_END = 'REPORT_TIME_END'
export const WRITE_SELECT_TABLE_ROW = 'WRITE_SELECT_TABLE_ROW'
export const FETCH_CHANGE_REPORT = 'FETCH_CHANGE_REPORT'
export const FETCH_CHANGE_REPORT_RECEIVED = 'FETCH_CHANGE_REPORT_RECEIVED'
export const LOCAL_UPDATE_STORE_ROW = 'LOCALY_UPDATE_STORE_ROW'

export const localUpdateStoreRow = value => ({
    type: LOCAL_UPDATE_STORE_ROW, value
})
export const enterTimeStart = (value) => ({
    type: REPORT_TIME_START, value
})
export const enterWhatTimeEnd = (value) => ({
    type: REPORT_TIME_END, value
})
export const fetchApteks = () => ({
    type: FETCH_APTEKS
})
export const fetchReport = (value) => ({
    type: FETCH_REPORT,value
})
export const fetchPutReport = (value) => ({
    type: FETCH_CHANGE_REPORT,value
})
export const fetchError = (value) => ({
    type: LOG_IN_FAILED,value
})
export const postComment = (value) => ({
    type: POST_COMMENT,value
})
export const ShowApteks = () => ({
    type: SHOW_APTEKS
})
export const CloseApteks = () => ({
    type: CLOSE_APTEKS
})
export const enterApteks = (value) => ({
    type: ENTER_APTEKA, value
})
export const enterTextComment = (value) => ({
    type: ENTER_COMMENT, value
})
export const enterWhatTimeOn = (value) => ({
    type: ENTER_TIME_ON, value
})
export const enterWhatTimeOff = (value) => ({
    type: ENTER_TIME_OFF, value
})
export const selectTarget = (value) => ({
    type: ENTER_TARGET_APTEKA, value
})
export const setFilter = (value) => ({
    type: SET_FILTER, value
})
export const resetFilter = () => ({
    type: RESET_FILTER
})
export const setModalMessage = (message) => ({
    type: SET_MODAL_MESSAGE,message
})
export const writeSelectTableRow = (value) => ({
    type: WRITE_SELECT_TABLE_ROW,value
})