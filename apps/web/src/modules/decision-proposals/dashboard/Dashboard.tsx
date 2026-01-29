import { Link } from "react-router-dom";
import { ROUTES } from "../../../pages/routes";
import { primaryButtonStyles } from "../../../styles";

export const Dashboard = () => {
  return (
    <div>
      <Link to={ROUTES.PROPOSALS} style={{ textDecoration: "none" }}>
        <button style={primaryButtonStyles}>View Decision Proposals</button>
      </Link>
    </div>
  );
};
