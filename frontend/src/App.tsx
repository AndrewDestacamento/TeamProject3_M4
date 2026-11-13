import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "@/components/Layout";
import { ChatProvider } from "@/lib/chat";
import Today from "@/pages/Today";
import Spending from "@/pages/Spending";
import PlanPage from "@/pages/Plan";
import Accounts from "@/pages/Accounts";
import Examples from "@/pages/Examples";
import Setup from "@/pages/Setup";

export default function App() {
  return (
    <ChatProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Today />} />
          <Route path="spending" element={<Spending />} />
          <Route path="plan" element={<PlanPage />} />
          <Route path="goals" element={<Navigate to="/plan" replace />} />
          <Route path="ask" element={<Navigate to="/" replace />} />
          <Route path="accounts" element={<Accounts />} />
          <Route path="examples" element={<Examples />} />
          <Route path="setup" element={<Setup />} />
          <Route path="*" element={<Today />} />
        </Route>
      </Routes>
    </ChatProvider>
  );
}
