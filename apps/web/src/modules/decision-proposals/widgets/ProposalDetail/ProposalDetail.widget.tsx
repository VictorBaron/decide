import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDecisionProposal } from "../../useDecisionProposal";
import { useDecisionByProposal } from "../../../decisions/useDecisionByProposal";
import { useMakeDecision } from "../../../decisions/useMakeDecision";
import { useAuth } from "../../../auth/useAuth";
import { ROUTES } from "../../../../pages/routes";
import { ProposalDetailView } from "./ProposalDetail.view";
import * as styles from "./ProposalDetail.css";

interface ProposalDetailWidgetProps {
  proposalId: string;
}

export function ProposalDetailWidget({ proposalId }: ProposalDetailWidgetProps) {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { proposal, loading, error, deleteProposal, addOption, removeOption } =
    useDecisionProposal(proposalId);
  const { decision } = useDecisionByProposal(proposalId);
  const { makeDecision } = useMakeDecision();

  const [deleting, setDeleting] = useState(false);
  const [newOption, setNewOption] = useState("");
  const [addingOption, setAddingOption] = useState(false);
  const [showDecisionModal, setShowDecisionModal] = useState(false);
  const [makingDecision, setMakingDecision] = useState(false);

  if (loading) {
    return <div className={styles.loadingState}>Loading proposal...</div>;
  }

  if (error || !proposal) {
    return <div className={styles.errorState}>{error || "Proposal not found"}</div>;
  }

  if (!user) {
    return <div className={styles.errorState}>Please log in to view this proposal</div>;
  }

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this proposal?")) return;
    setDeleting(true);
    try {
      await deleteProposal();
      navigate(ROUTES.PROPOSALS);
    } catch {
      setDeleting(false);
    }
  };

  const handleAddOption = async () => {
    if (!newOption.trim()) return;
    setAddingOption(true);
    try {
      await addOption({ text: newOption.trim() });
      setNewOption("");
    } finally {
      setAddingOption(false);
    }
  };

  const handleMakeDecision = async (data: {
    selectedOptionId: string;
    rationale?: string;
  }) => {
    setMakingDecision(true);
    try {
      await makeDecision({
        proposalId,
        selectedOptionId: data.selectedOptionId,
        rationale: data.rationale,
      });
      setShowDecisionModal(false);
    } finally {
      setMakingDecision(false);
    }
  };

  return (
    <ProposalDetailView
      proposal={proposal}
      currentUserId={user.id}
      decision={decision}
      deleting={deleting}
      newOption={newOption}
      addingOption={addingOption}
      showDecisionModal={showDecisionModal}
      makingDecision={makingDecision}
      onDelete={handleDelete}
      onNewOptionChange={setNewOption}
      onAddOption={handleAddOption}
      onRemoveOption={removeOption}
      onShowDecisionModal={() => setShowDecisionModal(true)}
      onCloseDecisionModal={() => setShowDecisionModal(false)}
      onMakeDecision={handleMakeDecision}
    />
  );
}
