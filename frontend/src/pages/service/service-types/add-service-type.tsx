import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus } from "lucide-react"
import { toast } from "sonner"
import { useState } from "react"
import { POSTAddServiceType, POSTEditServiceType } from "@/services/apiCalls"

interface AddServiceTypeProps {
  heading: string
  defaultValue?: {
    is_active: number
    service_name: string
    service_id: string
    service_parent: number
  }
  handleTableChange: () => void
}

const AddServiceType: React.FC<AddServiceTypeProps> = ({ heading, defaultValue, handleTableChange }) => {
  const [is_active, setIs_active] = useState<number>(defaultValue?.is_active ?? 1)
  const [name, setName] = useState<string>(defaultValue?.service_name ?? '')

  // function Sonner() {
  //   const promise = () => new Promise((resolve, reject) => setTimeout(() => {
  //     if (false) {
  //       resolve({ name: 'Sonner' })
  //     } else {
  //       reject(new Error('Test error'))
  //     }
  //   }, 2000));

  //   toast.promise(promise, {
  //     loading: 'Loading...',
  //     success: (data) => {
  //       return `${data.name} toast has been added`;
  //     },
  //     error: (data) => {
  //       return `Error: ${data.message}`
  //     },
  //   });
  // }
  // make a function to handle submit which will send request to POSTAddServiceType({is_active, name}) and use the above approach to handle the sonner toast

  function handleSubmit() {
    console.log(is_active)
    if (heading == 'Add') {
      const promise = () => POSTAddServiceType({
        service_name: name,
        is_active: is_active
      });

      toast.promise(promise, {
        loading: 'Adding service type...',
        success: () => {
          handleTableChange()
          return `Service type has been added successfully`;
        },
        error: (error) => {
          return `Error: ${error.message || 'Failed to add service type'}`;
        },
      });
    } else {
      const promise = () => POSTEditServiceType({
        service_name: name,
        is_active: is_active,
        service_id: defaultValue?.service_id,
        service_parent: defaultValue?.service_parent
      });

      toast.promise(promise, {
        loading: 'Editing service type...',
        success: () => {
          handleTableChange()
          return `Service type has been edited successfully`;
        },
        error: (error) => {
          return `Error: ${error.message || 'Failed to edit service type'}`;
        },
      });
    }
  }


  function handleSelectChange(value: string) {
    if (value === '1') {
      setIs_active(1)
    } else {
      setIs_active(0)
    }
  }

  return (
    <div className="w-full">
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="default" className="w-full flex">
            {!defaultValue ? <Plus className="h-4 w-4 mr-2" /> : null}
            {heading}
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add or Edit Service Type</DialogTitle>
            <DialogDescription>
              Add or Edit new service types here.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                defaultValue={defaultValue?.service_name}
                onChange={(e) => setName(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Is Active
              </Label>
              <Select defaultValue={is_active.toString()} onValueChange={handleSelectChange}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a fruit" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Set status</SelectLabel>
                    <SelectItem value="1">1</SelectItem>
                    <SelectItem value="0">0</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <DialogTrigger asChild>
              <Button onClick={handleSubmit} variant="default">Edit Profile</Button>
            </DialogTrigger>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>

  )
}

export default AddServiceType