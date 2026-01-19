import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoginPage } from "./pages/LoginPage";
import { HomePage } from "./pages/HomePage";
import { ProposalsPage } from "./pages/ProposalsPage";
import { NewProposalPage } from "./pages/NewProposalPage";
import { ProposalDetailPage } from "./pages/ProposalDetailPage";
import { EditProposalPage } from "./pages/EditProposalPage";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { ROUTES } from "./pages/routes";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.LOGIN} element={<LoginPage />} />
        <Route
          path={ROUTES.HOME}
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route
          path={ROUTES.PROPOSALS}
          element={
            <ProtectedRoute>
              <ProposalsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path={ROUTES.PROPOSAL_NEW}
          element={
            <ProtectedRoute>
              <NewProposalPage />
            </ProtectedRoute>
          }
        />
        <Route
          path={ROUTES.PROPOSAL_DETAIL}
          element={
            <ProtectedRoute>
              <ProposalDetailPage />
            </ProtectedRoute>
          }
        />
        <Route
          path={ROUTES.PROPOSAL_EDIT}
          element={
            <ProtectedRoute>
              <EditProposalPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
