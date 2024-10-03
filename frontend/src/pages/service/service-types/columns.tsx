import { ColumnDef } from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal } from "lucide-react"
import { ArrowUpDown } from "lucide-react"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type ServiceTypeDef = {
  service_id: string
  service_name: string
  is_active: 1 | 0
  service_parent: number
}
import { Checkbox } from "@/components/ui/checkbox"

import { DataTableColumnHeader } from "@/components/ui/column-header"
import { POSTDeleteServiceType } from "@/services/apiCalls"
import AddServiceType from "./add-service-type"

export const columns = (handleTableChange: () => void): ColumnDef<ServiceTypeDef>[] => [  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "service_id",
    header: ({ column }) => (
      <DataTableColumnHeader className="" column={column} title="Id" />
    ),
  },
  {
    accessorKey: "service_name",
    header: ({ column }) => (
      <DataTableColumnHeader className="" column={column} title="Service Type" />
    ),
  },
  {
    accessorKey: "is_active",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Is Active
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onSelect={(event) => event.preventDefault()} className="">
              <AddServiceType 
                heading='Edit' 
                defaultValue={row.original}
                handleTableChange={handleTableChange}
              />
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Button 
                onClick={() => {
                  POSTDeleteServiceType()
                }}
                variant="destructive" 
                className="w-full"
              >
                Delete
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
