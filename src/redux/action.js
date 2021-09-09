export const SHOW_MODAL_PHARMACY = 'SHOW_MODAL_PHARMACY'
export const FETCH_PHARMACY = 'FETCH_PHARMACY'
export const FETCH_PHARMACY_RECEIVED = 'FETCH_PHARMACY_RECEIVED'
export const SELECT_TARGET_PHARMACY = 'SELECT_TARGET_PHARMACY'
export const SET_FILTER = 'SET_FILTER'
export const RESET_FILTER = 'RESET_FILTER'
export const POST_COMMENT = 'POST_COMMENT'
export const POST_COMMENT_RECEIVED = 'POST_COMMENT_RECEIVED'
export const LOG_IN_FAILED = 'LOG_IN_FAILED'
export const SET_MODAL_MESSAGE = 'SET_MODAL_MESSAGE'
export const FETCH_REPORT = 'FETCH_REPORT'
export const FETCH_REPORT_RECEIVED = 'FETCH_REPORT_RECEIVED'
export const WRITE_SELECT_TABLE_ROW = 'WRITE_SELECT_TABLE_ROW'
export const FETCH_CHANGE_REPORT = 'FETCH_CHANGE_REPORT'
export const FETCH_CHANGE_REPORT_RECEIVED = 'FETCH_CHANGE_REPORT_RECEIVED'
export const LOCAL_UPDATE_STORE_ROW = 'LOCAL_UPDATE_STORE_ROW'
export const SELECT_WINDOW = 'SELECT_WINDOW'
export const POST_IN_FAILED = 'POST_IN_FAILED'
export const FETCH_GET_TRABLE = 'FETCH_GET_TRABLE'
export const FETCH_GET_TRABLE_RECEIVED = 'FETCH_GET_TRABLE_RECEIVED'
export const ADD_NEW_PROBLEM_COMMENT = 'ADD_NEW_PROBLEM_COMMENT'
export const ADD_NEW_PROBLEM_COMMENT_RECEIVED = 'ADD_NEW_PROBLEM_COMMENT_RECEIVED'
export const CLOSE_PROBLEM = 'CLOSE_PROBLEM'
export const CLOSE_PROBLEM_RECEIVED = 'CLOSE_PROBLEM_RECEIVED'
export const ADD_NEW_NUMBER = 'ADD_NEW_NUMBER'
export const GET_NEW_NUMBER = 'GET_NEW_NUMBER'
export const ADD_NEW_NUMBER_RECEIVED = 'ADD_NEW_NUMBER_RECEIVED'
export const SET_ICON_ON_OFF = 'SET_ICON_ON_OFF'
export const SET_ICON_GO = 'SET_ICON_GO'
export const OPEN_EXPORT_MENU = 'OPEN_EXPORT_MENU'
export const CLOSE_EXPORT_MENU = 'CLOSE_EXPORT_MENU'
export const RECEIVED_GET_GROUP_AX4 = 'RECEIVED_GET_GROUP_AX4'
export const GET_GROUP_AX4 = 'GET_GROUP_AX4'
export const SET_SELECT_GROUP_AX4 = 'SET_SELECT_GROUP_AX4'
export const SET_LOADER = 'SET_LOADER'
export const FILTER_TABLE_SITUATION = 'FILTER_TABLE_SITUATION'
export const FILTER_TABLE_PHARMACY = 'FILTER_TABLE_PHARMACY'


export const setFilterSituation = value => ({
    type: FILTER_TABLE_SITUATION, value
})
export const setFilterPharmacy = value => ({
    type: FILTER_TABLE_PHARMACY, value
})
export const localUpdateStoreRow = value => ({
    type: LOCAL_UPDATE_STORE_ROW, value
})
export const getGroupAx4 = value => ({
    type: GET_GROUP_AX4, value
})
export const setSelectGroupAx4 = value => ({
    type: SET_SELECT_GROUP_AX4, value
})
export const openExportMenu = () => ({
    type: OPEN_EXPORT_MENU
})
export const closeExportMenu = () => ({
    type: CLOSE_EXPORT_MENU
})
export const fetchPharmacy = () => ({
    type: FETCH_PHARMACY
})
export const fetchReport = value => ({
    type: FETCH_REPORT,value
})
export const fetchPutReport = value => ({
    type: FETCH_CHANGE_REPORT,value
})
export const fetchGetTrable = () => ({
    type: FETCH_GET_TRABLE
})
export const fetchError = value => ({
    type: LOG_IN_FAILED,value
})
export const postError = (value) => ({
    type: POST_IN_FAILED,value
})
export const postComment = (value) => ({
    type: POST_COMMENT,value
})
export const showModalPharmacy = (params) => ({
    type: SHOW_MODAL_PHARMACY, params
})
export const selectTargetPharmacy = (value) => ({
    type: SELECT_TARGET_PHARMACY, value
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
export const selectWindow = (window) => ({
    type: SELECT_WINDOW, window
})
export const addNewProblemComment = (value) => ({
    type: ADD_NEW_PROBLEM_COMMENT, value
})
export const closeProblem = (value) => ({
    type: CLOSE_PROBLEM, value
})
export const addNewNumber = (value) => ({
    type: ADD_NEW_NUMBER, value
})
export const getNewNumber = (value) => ({
    type: GET_NEW_NUMBER, value
})
export const setIconOnOff = (params) => ({
    type: SET_ICON_ON_OFF, params
})
export const setIconGo = (value) => ({
    type: SET_ICON_GO, value
})
export const setLoader = (value) => ({
    type: SET_LOADER, value
})