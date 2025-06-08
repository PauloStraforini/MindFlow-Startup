"use client"

import { Toast, ToastClose, ToastDescription, ToastTitle } from "@/components/toast/toast"
import { useToast } from "@/hooks/use-toast"
import { boolean } from "zod";

interface ToastType {
  id: string;
  title?: string;
  description?: string;
  variant?: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function Toaster() {
  const { toasts } = useToast()


  return (
    <div className="fixed top-0 z-[100] flex flex-col items-end gap-2 px-4 pt-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col-reverse sm:pb-4 md:pb-8">
      {toasts.map(({ id, title, description, variant, open, onOpenChange }) => (
        <Toast key={id} variant={variant}>
          <div className="grid gap-1">
            {title && <ToastTitle>{title}</ToastTitle>}
            {description && <ToastDescription>{description}</ToastDescription>}
          </div>
          <ToastClose />
        </Toast>
      ))}
    </div>
  )
}
