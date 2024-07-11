import { ApolloProvider } from "@apollo/client";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import client from "../graphql/client";
import { HomePage } from "../pages/Home";
import { RepositoryPage } from "../pages/RepoDetail";
import { Header } from "../shared/components/Header";
import { store } from "./store/store";

export const App = () => {
  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <BrowserRouter>
          <Header />
          <div className="container">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route
                path="/repository/:owner/:name"
                element={<RepositoryPage />}
              />
            </Routes>
          </div>
        </BrowserRouter>
      </Provider>
    </ApolloProvider>
  );
};