import { Route, Routes } from "react-router-dom";
import Layout from "@/components/Layout";
import { ChatProvider } from "@/lib/chat";
import Today from "@/pages/Today";
import Spending from "@/pages/Spending";
import PlanPage from "@/pages/Plan";
import Ask from "@/pages/Ask";
import Accounts from "@/pages/Accounts";
import Setup from "@/pages/Setup";
import Goals from "@/pages/Goals";

export default function App() {
  return (
    <ChatProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Today />} />
          <Route path="spending" element={<Spending />} />
          <Route path="plan" element={<PlanPage />} />
          <Route path="goals" element={<Goals />} />
          <Route path="ask" element={<Ask />} />
          <Route path="accounts" element={<Accounts />} />
          <Route path="setup" element={<Setup />} />
          <Route path="*" element={<Today />} />
        </Route>
      </Routes>
    </ChatProvider>
  );
}
