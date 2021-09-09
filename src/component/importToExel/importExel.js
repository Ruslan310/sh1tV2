import React, {useState} from 'react';
import {Button} from "react-bootstrap";
import {exportExelToDb, newTime} from "../../redux/helpFunction";


const XLSX = require('xlsx');

const ImportExel = (props) => {

    const [exportEx, setExportEx] = useState('')
    //Функция выгрузки масива обьектов в EXEL
    const exportEXCEL = () => {
        let result = props.tableReport.map(el => {
            let dt_begin = el.dt_begin ? el.dt_begin : ' '
            let dt_end = el.dt_end ? el.dt_end : ' '
            let comment = el.comment ? el.comment : ' '
            let obj = {}

                obj['Дата'] =  el.date
                obj['Аптека'] = el.apteka
                obj['График'] = el.grafik
                obj['Длительность'] = el.diff
                obj['Выкл'] = dt_begin
                obj['Вкл'] = dt_end
                obj['Коментарий'] = comment
            return  obj
        })
        const wb = XLSX.utils.book_new();   // создаём книгу
        const ws = XLSX.utils.json_to_sheet(result)   // создаём таблицу с массива
        ws['!cols'] = calcColumnWidth(result);    // высчитываем ширину столбцов
        XLSX.utils.book_append_sheet(wb, ws, "Report");   // подкидываем инфу в книгу
        XLSX.writeFile(wb, `Report ${newTime()}.xlsx`);    // запись (триггерит скачивание)
    }

    // Функция подсчёта ширины столбцов
    const calcColumnWidth = (array) => {
        let lengths = []
        for (let key in array[0]) {
            let length = key.toString().length
            for (let i = 0; i < array.length; i++) {
                let current = array[i][key].toString().length
                if (current > length) length = current
            }
            lengths.push({wch: length + 1})
        }
        return lengths
    }

    /// загрузка приоритета аптек
    const tableHandler =  (e) => {
        let file = e.target.files[0]
        setExportEx(file)
        let reader = new FileReader()
        reader.onload = async function (e) {
            let data = e.target.result;
            let rData = XLSX.read(data, {type: 'binary'});
            const wsName = rData.SheetNames[0];
            const ws = rData.Sheets[wsName];
            const dataParse = XLSX.utils.sheet_to_json(ws, {header: 2});
            props.setLoader(true)
            let exel = await exportExelToDb(dataParse)
            console.log(exel)
            if(exel.result) {
                props.setModalMessage(`${exel.message} \n \n Добавлено: ${exel.insert?.length} \n Обновлено: ${exel.update?.length} \n Ошибок: ${exel.error?.length}`)
            }
            else props.setModalMessage('произошло что-то плохое :(')
            props.setLoader(false)
        }
        reader.readAsBinaryString(file)
        setExportEx('')
    }

    return (
        <div className={props.menuExportExel ? 'export active' : 'export'}
             onClick={props.closeExportMenu}>
            <div className={props.menuExportExel ? 'export_content active' : 'export_content'}>
                <div onClick={e => e.stopPropagation()}>
                    <Button className='buttonExport' onClick={exportEXCEL}>exp</Button>
                    <div className='divExport'>
                        <Button className='importExport'>Выберите файл</Button>
                        <input className='exportFile' type="file" value={exportEx} onChange={tableHandler}/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ImportExel;