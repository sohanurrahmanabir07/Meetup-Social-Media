
import MultipleSelectChip from './Mult'
import { MultiSelect } from './MultiSelect'

export const Modal = ({ box,friends }) => {
    return (
        <div>
            <dialog id="my_modal_3" className="modal" ref={box} >
                <div className="modal-box  max-h-[90vh] overflow-y-auto">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={() => box.current.close()} >✕</button>

                     <div>

                        <MultiSelect friends={friends} ></MultiSelect>

                     </div>






                </div>



            </dialog>




        </div>
    )
}
