'use client'

import { FaEraser } from "react-icons/fa";


export const EraseShelvedButton = ({id}: { id: number }) => {

    const eraseShelved = async () => {
        try {
            const response = await fetch('/api/shelved', {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({id}),
            });
            if (!response.ok) {
                console.error("Failed to erase shelved books");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const showModal = () => {
        const modal = document.getElementById('my_modal_1') as HTMLDialogElement | null;
        if (modal) {
            modal.showModal();
        } else {
            console.error("Modal element not found");
        }
    };

    return (
        <div>
            {/* Open the modal using document.getElementById('ID').showModal() method */}
            <button className="btn w-64 rounded-full btn-outline" onClick={showModal}>
                <FaEraser />
                Erase shelved books
            </button>
            <dialog id="my_modal_1" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">WARNING!</h3>
                    <p className="py-4">Do you really want to erase all shelved books ?</p>
                    <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn w-fit rounded-full btn-outline">No</button>
                            <button className="btn w-fit rounded-full btn-outline" onClick={() => eraseShelved()}>yes
                            </button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>)
};

export default EraseShelvedButton;