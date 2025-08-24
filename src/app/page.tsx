import { currentUser } from "@clerk/nextjs/server";
import Guest from "../../components/Guest";
import AddRecord from "../../components/AddRecordForm";
import AIInsights from "../../components/AIInsights";
import PrevTransactions from "../../components/PrevTransactions";
import Welcome from "../../components/Welcome";

export default async function Home() {
  const user = await currentUser();
  if (!user) {
    return <Guest />;
  }

  return (
    <div className="relative min-h-screen w-full 
      bg-gradient-to-br from-emerald-100 via-emerald-50 to-emerald-200 
      dark:from-[#031914] dark:via-[#05241d] dark:to-[#08372d] 
      overflow-hidden">
      
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-15 mix-blend-soft-light pointer-events-none"></div>

      <div className="relative z-10">
        <div className="md:flex md:items-center md:justify-center mt-15">
          <div className="md:-mr-10 ">
            <Welcome />
          </div>
          <div className="md:-ml-10">
            <AddRecord />
          </div>
        </div>

        <div>
          <AIInsights />
        </div>

        <div>
          <PrevTransactions />
        </div>
      </div>
    </div>
  );
}
