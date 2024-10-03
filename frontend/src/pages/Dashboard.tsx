
import { GETServiceTypes } from "@/services/apiCalls";
import { useEffect, useState } from "react";


const Dashboard = () => {

	const [data, setData] = useState(null)

	useEffect(() => {
		console.log('Dashboard rendered');
		const fetchData = async () => {
			try {
				const res = await GETServiceTypes();
				setData(res);
				console.log(res)
			} catch (error) {
				console.error('Error fetching service types:', error);
			}
		};

		fetchData();
	}, []);

	return (
		<>
			<div>
				{data}
			</div>
		</>
	);
};

export default Dashboard;