import { GET_TRANSACTIONS } from "../../graphql/queires/transaction.query";
import Card from "./Card";
import { useQuery } from "@apollo/client";

const Cards = () => {
	const {data, loading} = useQuery(GET_TRANSACTIONS)
	
	
	console.log(data)
	return (
		<div className='w-full px-10 min-h-[40vh]'>
			<p className='text-5xl font-bold text-center my-10'>History</p>
			<div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-start mb-20'>
			{!loading&&data.transactions.map((ele)=>(
				<Card key={ele._id} transaction={ele}/>
			))}
			</div>
			{
			!loading && data?.transactions?.length === 0 && (
				<p className="text-2xl font-bold text-center w-full">No transaction history found.</p>
			)
			}
		</div>
		
	);
};
export default Cards;