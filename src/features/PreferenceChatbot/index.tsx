"use client";
import { Divider } from "@mantine/core";

import PreferenceChatbotArea from "./components/PreferenceChatbotArea";

type Props = {};

const PreferenceChatbot = (props: Props) => {
  return (
    <section className="px-2">
      <Divider className="hidden md:flex" my="sm" />
      <h1 className="text-[25px] font-bold text-[#11142D]">
        Technical Chatbot
      </h1>

      {/* the chatbot Area */}
      <PreferenceChatbotArea />
    </section>
  );
};

export default PreferenceChatbot;
