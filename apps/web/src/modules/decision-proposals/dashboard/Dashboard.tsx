import { Link } from "react-router-dom";
import { ROUTES } from "../../../pages/routes";

export const Dashboard = () => {
  return (
    <div style={{ marginTop: "24px" }}>
      <Link
        to={ROUTES.PROPOSALS}
        style={{
          display: "inline-block",
          padding: "12px 24px",
          backgroundColor: "#3b82f6",
          color: "#fff",
          borderRadius: "6px",
          textDecoration: "none",
          fontSize: "16px",
        }}
      >
        View Decision Proposals
      </Link>
    </div>
  );
};
