import React from 'react';
import {connect} from "react-redux";
import NumberTable from "./NumberTable";
import AddNumber from "./addNumber";
import TableProblem from "./TableProblem";
import AddProblem from "./addProblem";
import {addNewNumber, addNewProblemComment, closeProblem, getNewNumber, setModalMessage} from "../../redux/action";


const mapStateToProps = (state) => ({
    problemComment: state.comment.problemComment,
    modalMessage: state.comment.modalMessage,
    problemNumber: state.comment.problemNumber
})

const mapDispatchToProps = ({
    addNewProblemComment, closeProblem,setModalMessage,addNewNumber, getNewNumber
})

const $Problem = (props) => {
    return (
        <div className='wrapperProblemTable'>
            <div className='blockTableProblem'>
                <AddProblem
                    addNewProblemComment={props.addNewProblemComment}
                    setModalMessage={props.setModalMessage}
                />
                <TableProblem
                    problemComment={props.problemComment}
                    closeProblem={props.closeProblem}/>
            </div>
            <div  className='blockTableNumber'>
                <AddNumber
                    setModalMessage={props.setModalMessage}
                    addNewNumber={props.addNewNumber}
                />
                <NumberTable
                    problemNumber={props.problemNumber}
                    addNewNumber={props.addNewNumber}
                />
            </div>
        </div>
    );
};

const Problem = connect(mapStateToProps, mapDispatchToProps)($Problem)

export default Problem;