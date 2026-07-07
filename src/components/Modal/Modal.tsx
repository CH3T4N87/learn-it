import { useRef } from "react";
import styles from "./Modal.module.scss";
import type { ModalProps } from "./Modal.types";

const Modal = ({ children, closeModal }: ModalProps) => {
    const modalRef = useRef<HTMLDivElement>(null);

    const onBackgroundClick = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        if(modalRef.current && !modalRef.current.contains(e.target as Node)){
            closeModal();
        };
    }

    return (
        <div  onClick={onBackgroundClick} className={styles.modalBackdrop}>
            <div ref={modalRef} className={styles.modal}>
                {children}
            </div>
        </div>
    )
}

export default Modal