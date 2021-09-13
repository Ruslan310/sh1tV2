import {
    FETCH_PHARMACY,
    FETCH_PHARMACY_RECEIVED,
    SELECT_TARGET_PHARMACY,
    SET_FILTER,
    RESET_FILTER,
    POST_COMMENT,
    POST_COMMENT_RECEIVED,
    LOG_IN_FAILED,
    SET_MODAL_MESSAGE,
    FETCH_REPORT,
    FETCH_REPORT_RECEIVED,
    WRITE_SELECT_TABLE_ROW,
    FETCH_CHANGE_REPORT,
    FETCH_CHANGE_REPORT_RECEIVED,
    LOCAL_UPDATE_STORE_ROW,
    SELECT_WINDOW,
    POST_IN_FAILED,
    FETCH_GET_TRABLE,
    FETCH_GET_TRABLE_RECEIVED,
    ADD_NEW_PROBLEM_COMMENT,
    ADD_NEW_PROBLEM_COMMENT_RECEIVED,
    CLOSE_PROBLEM,
    CLOSE_PROBLEM_RECEIVED,
    ADD_NEW_NUMBER,
    ADD_NEW_NUMBER_RECEIVED,
    GET_NEW_NUMBER,
    SET_ICON_ON_OFF,
    SET_ICON_GO,
    OPEN_EXPORT_MENU,
    CLOSE_EXPORT_MENU,
    RECEIVED_GET_GROUP_AX4,
    SET_SELECT_GROUP_AX4,
    SET_LOADER,
    FILTER_TABLE_SITUATION,
    FILTER_TABLE_PHARMACY,
    FILTER_TABLE_GROUP,
} from "../action";

let message
const initialState = {
    pharmacyList: null,
    textPharmacy: '',
    isLoader: false,
    modalMessage: '',
    error: null,
    errorPost: null,
    tableReport: null,
    selectTableComment: null,
    isChangeReport: null,
    window: 'component',
    problemComment: null,
    problemNumber: null,
    menuExportExel: false,
    groupAx4: [],
    arraySituation: [
        'Выключение света',
        'Реклама',
        'Канализация',
        'Потолок / стены / пол',
        'Ролет / дверь',
        'Пожар',
        'Иныее'
    ],
    selectGroupAx4: false,
    filterSituation: 'Все',
    filterPharmacy: 'Все',
    filterGroupAx4: 'Все',
}

export const commentReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_ICON_ON_OFF:
            let array = state.tableReport.slice()
            for (let i = 0; i < array.length; i++) {
                if (array[i].id === action.params[0].id)
                    array[i].isTurnOnOff = action.params[0].isTurnOnOff
            }
            return {...state, tableReport: array}
        case RECEIVED_GET_GROUP_AX4:
            return {...state, groupAx4: action.data, modalMessage: message}
        case SET_LOADER:
            return {...state, isLoader: action.value}
        case SET_SELECT_GROUP_AX4:
            return {...state, selectGroupAx4: action.value}
        case OPEN_EXPORT_MENU:
            return {...state, menuExportExel: true}
        case CLOSE_EXPORT_MENU:
            return {...state, menuExportExel: false}
        case SET_ICON_GO:
            let arr = state.tableReport.slice()
            for (let i = 0; i < arr.length; i++) {
                if (arr[i].id === action.value[0].id) {
                    arr[i].isTurnGo = action.value[0].isTurnGo
                }
            }
            // let arr1 = []
            // let arr2 = []
            // arr.map( (item) => {
            //     if (item.dt_end) arr1.push(item)
            //     else arr2.push(item)
            // } )
            // arr1.sort( (a, b) => {
            //     if (!a.isTurnGo) return 1
            //     else return -1
            // })
            // arr2.sort( (a, b) => {
            //     if (a.isTurnGo) return 1
            //     else return -1
            // })
            // let result = arr2.concat(arr1)
            return {...state, tableReport: arr}
        case LOCAL_UPDATE_STORE_ROW:
            if (action.value.isChange) {
                let newTableReport = state.tableReport.map(row => {
                    if (row.id === action.value.id) Object.assign(row, action.value)
                    return row;
                })
                return {...state, tableReport: newTableReport}
            }
            return state
        case FETCH_PHARMACY:
            return state
        case FETCH_REPORT:
            return {...state, isLoader: true}
        case FETCH_CHANGE_REPORT:
            return {...state, isLoader: true}
        case FETCH_CHANGE_REPORT_RECEIVED:
            if (action.data) message = 'Изменения внесены'
            else message = 'Не удалось внести изменения'
            return {...state, tableReport: action.data, modalMessage: message, isLoader: false}
        case FETCH_GET_TRABLE:
            return {...state, isLoader: true}
        case FETCH_GET_TRABLE_RECEIVED:
            return {...state, problemComment: action.data, isLoader: false}
        case ADD_NEW_PROBLEM_COMMENT:
            return {...state}
        case ADD_NEW_PROBLEM_COMMENT_RECEIVED:
            if (!action.data) message = 'Не удалось создать новую запись'
            else message = 'Запись успешно добавлена'
            return {...state, problemComment: action.data, modalMessage: message}
        case FETCH_PHARMACY_RECEIVED:
            return {...state, pharmacyList: action.data}
        case FETCH_REPORT_RECEIVED:
            if (action.data.length < 1) message = 'нет записей в талице'
            else message = ''
            return {...state, tableReport: action.data, isLoader: false, modalMessage: message}
        case LOG_IN_FAILED:
            return {...state, error: action.data, modalMessage: 'Нет связи с сервером', isLoader: false}
        case POST_IN_FAILED:
            return {...state, errorPost: action.data, modalMessage: 'Возникла ошибка', isLoader: false}
        case POST_COMMENT:
            return {...state, isLoader: true}
        case POST_COMMENT_RECEIVED:
            if (action.data) message = 'Коментарий успешно записан'
            else message = 'Коментарий неудалось записать'
            return {...state, tableReport: action.data, isLoader: false, modalMessage: message}
        case SELECT_TARGET_PHARMACY:
            return {...state, textPharmacy: action.value}
        case SET_FILTER:
            let stText = action.value
            let stOnline = state.pharmacyList.slice()

            for (let i = 0; i < stOnline.length; i++) {
                let result = false
                stOnline[i].isFilter = false
                if (stOnline[i].pharmacy.toLowerCase().includes(stText.toLowerCase())) result = true
                if (result) stOnline[i].isFilter = true
            }
            return {...state, pharmacyList: stOnline}
        case RESET_FILTER:
            let filterList = state.pharmacyList.slice()
            for (let i = 0; i < filterList.length; i++) filterList[i].isFilter = true
            return {...state, pharmacyList: filterList}
        case SET_MODAL_MESSAGE:
            return {...state, modalMessage: action.message}
        case WRITE_SELECT_TABLE_ROW:
            return {...state, selectTableComment: action.value}
        case SELECT_WINDOW:
            return {...state, window: action.window}
        case CLOSE_PROBLEM:
            return {...state}
        case CLOSE_PROBLEM_RECEIVED:
            if (!action.data) message = 'Не удалось создать новую запись'
            else message = ''
            return {...state, problemComment: action.data, modalMessage: message}
        case ADD_NEW_NUMBER:
            return {...state}
        case FILTER_TABLE_SITUATION:
            return {...state, filterSituation: action.value}
        case FILTER_TABLE_PHARMACY:
            return {...state, filterPharmacy: action.value}
        case FILTER_TABLE_GROUP:
            return {...state, filterGroupAx4: action.value}
        case ADD_NEW_NUMBER_RECEIVED:
            if (!action.data) message = 'С номерами что-то не так :('
            else message = ''
            return {...state, problemNumber: action.data, modalMessage: message}
        case GET_NEW_NUMBER:
            return {...state, problemNumber: action.value}
        default:
            return state
    }
}