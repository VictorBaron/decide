import { useParams } from "react-router-dom";
import { ProposalDetailWidget } from "../modules/decision-proposals";
import * as styles from "./ProposalDetailPage.css";

export function ProposalDetailPage() {
  const { id } = useParams<{ id: string }>();

  return (
    <div className={styles.container}>
      <ProposalDetailWidget proposalId={id!} />
    </div>
  );
}
