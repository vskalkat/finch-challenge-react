"use client";

import { useEffect, useRef, ReactNode } from "react";
import { createPortal } from "react-dom";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
    title?: string;
}

export const Modal = ({ isOpen, onClose, children, title }: ModalProps) => {
    const modalRef = useRef<HTMLDivElement>(null);
    const previousActiveElement = useRef<HTMLElement | null>(null);

    useEffect(() => {
        if (isOpen) {
            // Store the previously focused element
            previousActiveElement.current = document.activeElement as HTMLElement;

            // Prevent body scroll when modal is open
            document.body.style.overflow = "hidden";

            // Focus the modal when it opens
            if (modalRef.current) {
                modalRef.current.focus();
            }
        } else {
            // Restore body scroll
            document.body.style.overflow = "";

            // Restore focus to the previously focused element
            if (previousActiveElement.current) {
                previousActiveElement.current.focus();
            }
        }

        // Cleanup on unmount
        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape" && isOpen) {
                onClose();
            }
        };

        document.addEventListener("keydown", handleEscape);
        return () => {
            document.removeEventListener("keydown", handleEscape);
        };
    }, [isOpen, onClose]);

    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        // Only close if clicking the backdrop itself, not the modal content
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    if (!isOpen) return null;

    const modalContent = (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
            onClick={handleBackdropClick}
            role="dialog"
            aria-modal="true"
            aria-labelledby={title ? "modal-title" : undefined}
        >
            <div
                ref={modalRef}
                className="relative w-full max-w-2xl max-h-[90vh] mx-4 bg-white dark:bg-zinc-900 rounded-lg shadow-xl overflow-hidden flex flex-col"
                onClick={(e) => e.stopPropagation()}
                tabIndex={-1}
            >
                {title && (
                    <div className="px-6 py-4 border-b border-gray-200 dark:border-zinc-800">
                        <h2 id="modal-title" className="text-xl font-semibold text-gray-900 dark:text-white">
                            {title}
                        </h2>
                    </div>
                )}
                <div className="px-6 py-4 overflow-y-auto flex-1">{children}</div>
            </div>
        </div>
    );

    // Use portal to render modal at the root level
    return createPortal(modalContent, document.body);
};
