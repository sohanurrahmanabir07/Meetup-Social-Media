


export const Modal = ({ box,friends,Component}) => {
    return (
        <div>
            <dialog id="my_modal_3" className="modal" ref={box} >
                <div className="modal-box  max-h-[90vh] overflow-y-auto">
                    <button className="btn btn-md btn-circle btn-ghost absolute right-2 top-2" onClick={() => box.current.close()} >✕</button>

                     <div>


                        {Component}

                     </div>






                </div>



            </dialog>




        </div>
    )
}
