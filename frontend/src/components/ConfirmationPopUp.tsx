import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button, buttonVariants } from "./ui/button"
import React from "react"

interface ConfirmationPopUpProps {
  action: string
  actionHandler: () => void
  variant: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
}

const ConfirmationPopUp = React.forwardRef<HTMLButtonElement, ConfirmationPopUpProps>(
  ({ action, actionHandler, variant }, ref) => {
    return (
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button ref={ref} className="w-full" variant={variant}>{action}</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction className={buttonVariants({ variant })} autoFocus onClick={actionHandler}>
              {action}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  }
)

ConfirmationPopUp.displayName = 'ConfirmationPopUp'

export default ConfirmationPopUp