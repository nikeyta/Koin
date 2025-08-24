import { currentUser } from "@clerk/nextjs/server";
import Guest from "../../components/Guest";
import AddRecord from "../../components/AddRecordForm";
import AIInsights from "../../components/AIInsights";
import PrevTransactions from "../../components/PrevTransactions";



export default async function Home() {
  const user = await currentUser();
  if (!user) {
    return <Guest />;
  }

  return (
    <>
  
      <div className="bg-[#05241d] ">
        
        <div className="md:flex">
          <div>
            <AddRecord />
          </div>
          <div> </div>
        </div>
        <div>
          <AIInsights />
        </div>
        <div>
          <PrevTransactions />
        </div>
      </div>
    </>
  );
}
