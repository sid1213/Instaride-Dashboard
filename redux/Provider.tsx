"use client";
import React, { ReactNode } from "react";
import { persistor, store } from "../redux";
import { PersistGate } from "redux-persist/integration/react";

import { Provider } from "react-redux";

interface ProviderType {
  children: ReactNode;
}

const Providers: React.FC<ProviderType> = ({ children }) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
};

export default Providers;
