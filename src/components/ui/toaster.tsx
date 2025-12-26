"use client"

import { useToast } from "@/hooks/use-toast"
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
  InsufficientFundsToast
} from "@/components/ui/toast"

export function Toaster() {
  const { toasts } = useToast()

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, variant, ...props }) {
        
        if (variant === 'insufficient_funds') {
           return (
             <Toast key={id} {...props} variant="destructive" className="border-red-500/50 bg-[#242424] text-[#E5E7EB] border-b-2 border-b-red-500 p-4">
                <InsufficientFundsToast />
                <ToastClose />
             </Toast>
           )
        }

        return (
          <Toast key={id} {...props}>
            <div className="grid gap-1">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
            </div>
            {action}
            <ToastClose />
          </Toast>
        )
      })}
      <ToastViewport />
    </ToastProvider>
  )
}
