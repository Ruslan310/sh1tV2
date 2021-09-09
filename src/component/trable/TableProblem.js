import React from 'react';
import '../../style/trable.css'
import {Button} from "react-bootstrap";

const TableProblem = (props) => {

    const selectProblem = (post) => {
        console.log(post)
        props.closeProblem({
            id: post.id
        })
    }

    return (
        <div className='tableContainer'>
            <table className='wrapperProblem'>
                <thead>
                <tr>
                    <th className='colCell'>Дата</th>
                    <th className='colCell'>Время</th>
                    <th className="colCell">Проблема на ТТ</th>
                    <th className="colCell"> </th>
                </tr>
                </thead>
                <tbody>
                {props.problemComment && props.problemComment.map(post => {
                        return (
                            <tr key={post.id}>
                                <td className='colProblemDt'>{post.dt}</td>
                                <td className="colProblemTime">{post.time}</td>
                                <td className="colTimeProblem">{post.comment}</td>
                                <td className="colIsProblem">{
                                    !post.timeDone ?
                                        <Button variant="info"
                                                onClick={() => selectProblem(post)}
                                        >Проблема решена</Button>
                                        :
                                        <>
                                            <span className='colTimeDone'>{post.timeDone.time}</span>
                                            <span>{post.timeDone.date}</span>
                                        </>
                                }</td>
                            </tr>
                        )
                    }
                )}
                </tbody>
            </table>
        </div>
    );
};

export default TableProblem;