import { useEffect, useState } from "react";
import { ServiceTypeDef, columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import { GETServiceTypes } from "@/services/apiCalls";
import AddServiceType from "./add-service-type";


const ServiceTypes = () => {
  const [data, setData] = useState<ServiceTypeDef[]>([]);



  useEffect(() => {
    async function fetchData() {
      const res = await GETServiceTypes();
      setData(res.data)
    }
    fetchData()
  }, []);

   function handleTableChange () {
    async function fetchData() {
      const res = await GETServiceTypes();
      setData(res.data)
    }
    fetchData()
  }


  return (
    <div className="container mx-auto py-10">

      <DataTable
        columns={columns(handleTableChange)} 
        data={data}
        searchby={'service_name'}
        tableSize={100}
        addRowButton={() => <AddServiceType heading="Add"
          handleTableChange={handleTableChange} />}
      />

    </div>
  );
};


export default ServiceTypes;