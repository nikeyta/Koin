import { currentUser } from "@clerk/nextjs/server";
import Guest from "../../components/Guest";
import AddRecord from "../../components/AddRecordForm";
import AIInsights from "../../components/AIInsights";
import PrevTransactions from "../../components/PrevTransactions";

export default async function Home() {
  const user = await currentUser()
  if(!user){
    return <Guest />
  }
  return (
    <>
     <span>welcome back {user.firstName}</span>
     <div>
      <AddRecord />
      <AIInsights />
      <PrevTransactions />
     </div>
    </>
  );
}
