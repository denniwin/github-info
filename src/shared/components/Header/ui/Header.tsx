import { useLocation, useNavigate } from "react-router-dom";

import "../styles/Header.scss";

export const Header = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const isRepositoryPage = pathname.split("/")[1] === "repository";

  return (
    <header className="header">
      {!isRepositoryPage && <h2>GitHub</h2>}
      {isRepositoryPage && (
        <div className="container">
          <div className="header__repository-details">
            <button type="button" onClick={() => navigate(-1)}>
              {"< "}back
            </button>
            <span>Repository Details</span>
          </div>
        </div>
      )}
    </header>
  );
};
