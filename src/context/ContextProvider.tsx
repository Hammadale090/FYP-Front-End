import React from "react";
import { FeedContextProvider } from "./FeedContext";
import { MessageContextProvider } from "./MessageContext";
import { AuthContextProvider } from "./AuthContext";
import { ProfSettingsContextProvider } from "./ProfSettingsContext";
import { ListingContextProvider } from "./ListingContext";
import { PreferencesContextProvider } from "./PreferencesContext";

type Props = {
  children: any;
};

const ContextProvider = (props: Props) => {
  return (
    <AuthContextProvider>
      <PreferencesContextProvider>
        <FeedContextProvider>
          <MessageContextProvider>
            <ProfSettingsContextProvider>
              <ListingContextProvider>{props.children}</ListingContextProvider>
            </ProfSettingsContextProvider>
          </MessageContextProvider>
        </FeedContextProvider>
      </PreferencesContextProvider>
    </AuthContextProvider>
  );
};

export default ContextProvider;
