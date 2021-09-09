export const newTime = ()=>{
    let nowDate = new Date().toISOString().split('T')
    return nowDate[0]+' '+nowDate[1].substr(0,8)
}
export const formatTime = (dateString) => {
    if (!dateString) return null
    let allDate = dateString.split('T')
    let time = allDate[1].substring(0, 5)
    let date = allDate[0].split('-')
    return `${time} ${date[2]}.${date[1]}.${date[0]}`
}

/** свитч верхний, спустя пол часа название аптеки красным, если не нажата */
export const addTurnOnOff = async (action) => {
    let options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(action)
    }
    try {
        let result = fetch(process.env.REACT_APP_SAGA+'addTurnOnOff', options)
            .then(response => response.json())
        return new Promise(resolve => resolve(result))
    } catch (error) {
        console.log('error', error)
    }
}

/** свитч нижний,спустя 2 часа строка аптеки желтым (на борде ахч), если нажата*/
export const addTurnGO = async (action) => {
    let options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(action)
    }
    try {
        let result = fetch(process.env.REACT_APP_SAGA+'addTurnGO', options)
            .then(response => response.json());
        return new Promise(resolve => resolve(result))
    } catch (error) {
        console.log('error', error)
    }
}



/**  добавление файла с категориями аптек  */
export const exportExelToDb = async (action) => {
    let options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(action)
    }
    try {
        let response = await fetch(process.env.REACT_APP_SAGA+'excelFile', options)
        console.log(response.status)
        if (response.status === 200) return response.json()
        else return false
    } catch (error) {
        console.log('error', error)
    }
}

/** получение списка номеров в борде проблем*/
export const getTrableNumber = async () => {
    let options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    }
    try {
        let response = await fetch(process.env.REACT_APP_SAGA+'getNumber', options)
        let result = response.json()
        if (response.status === 200) return result
    } catch (error) {
        console.log('error', error)
    }
}
