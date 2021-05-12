import React, {useRef} from 'react';
import {Button, FormControl} from "react-bootstrap";

const ModalSelectTable = (props) => {

   const recordChangesReport=()=>{
      props.fetchPutReport({
         id: props.selectTableComment.id,
         dt_begin: props.selectTableComment.dt_begin,
         dt_End: props.selectTableComment.dt_end ? props.selectTableComment.dt_end : inputTimeOn.current?.value,
         CommentTable: props.selectTableComment.comment ? props.selectTableComment.comment : inputComment.current?.value,
         dt_date: props.selectTableComment.dt_date
      })
      // clearInput() --- зависает!!?:???
      props.setActive(false)
   }

   const clearInput = () => {
      if(!props.selectTableComment?.dt_end){
         inputTimeOn.current.value = ''
      }
      if(!props.selectTableComment?.comment){
         inputComment.current.value = ''
      }
      props.setActive(false)
   }

   const inputTimeOn = useRef()
   const inputComment = useRef()
   return (
      <div className={props.active ? 'services active' : 'services'}
           onMouseDown={clearInput}>
         <div className={props.active ? 'services_content active' : 'services_content'}
              onMouseDown={e => e.stopPropagation()}>
            <div className='services_text'>
               <h3 className='text-center'>{props.selectTableComment?.apteka}</h3>
               <h5 className='text-center'>График: {props.selectTableComment?.grafik}</h5>
               <hr width="250" size="5"/>
               <h5 className='w-100'>Время выключения : {props.selectTableComment?.dt_begin}</h5>
               <div className='w-100 d-flex align-items-center'>
                  <h5 className='mr-4'>Время включения :</h5>
                  <h5>{props.selectTableComment?.dt_end ? props.selectTableComment?.dt_end :
                     <FormControl
                        type='time'
                        ref={inputTimeOn}
                        // onChange={handlerTimeOn}
                        placeholder='не указано'
                     />
                  }</h5>
               </div>
               <h5>Коментарий : </h5>
               <hr width="270" size="5"/>
               <p className='commentText'>{props.selectTableComment?.comment ?
                  props.selectTableComment?.comment :
                  <FormControl
                     // onChange={handlerCommentText}
                     ref={inputComment}
                     as="textarea" rows={1}
                     placeholder='  не указан'
                  />
               }</p>
               <hr width="270" size="5"/>
               <Button className="buttonTable" variant="success"
               onClick={recordChangesReport}
               >Сохранить изменения</Button>
            </div>
         </div>
      </div>
   )
};

export default ModalSelectTable;