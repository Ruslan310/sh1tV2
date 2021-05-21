import React from 'react'
import ReactExport from "react-export-excel";
import {Button} from "react-bootstrap";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const Excel = (props) => {
    return (
        <ExcelFile element={<Button
            variant="info"
        >Выгрузить в Excel
        </Button>}
                   filename="Отчет. Выключение света на ТТ">
            <ExcelSheet data={props.tableReport} name="Employees">
                <ExcelColumn label="Дата" value="dt_date"/>
                <ExcelColumn label="Аптека" value="apteka"/>
                <ExcelColumn label="График" value="grafik"/>
                <ExcelColumn label="Выключили" value="dt_begin"/>
                <ExcelColumn label="Включили" value="dt_end"/>
                <ExcelColumn label="Коментарий" value="comment"/>
            </ExcelSheet>
        </ExcelFile>
    )
}
export default Excel