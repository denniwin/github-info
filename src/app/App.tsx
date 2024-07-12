import { client } from "@/graphql";
import { Header } from "@/shared/components/Header";
import { LoadingSpinner } from "@/shared/components/Spinner";
import { ApolloProvider } from "@apollo/client";
import { Suspense } from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HomePage, RepositoryPage } from "./routes";
import { store } from "./store";

export const App = () => {
  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <BrowserRouter>
          <Header />
          <div className="container">
            <Suspense fallback={<LoadingSpinner />}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route
                  path="/repository/:owner/:name"
                  element={<RepositoryPage />}
                />
              </Routes>
            </Suspense>
          </div>
        </BrowserRouter>
      </Provider>
    </ApolloProvider>
  );
};
