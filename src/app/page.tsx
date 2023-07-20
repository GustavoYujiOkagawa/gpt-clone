"use client";

import { ChatArea } from "@/components/ChatArea";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { useEffect, useState, useRef } from "react";
import { Chat } from "@/types/Chat";
import { Footer } from "@/components/Footer";
import { v4 as uuidv4 } from "uuid";
import { SidebarChatButton } from "@/components/SidebarChatButton";
import { openai } from "@/utils/openai";




const Page = () => {
  const [SidebarOpened, setSidebarOpened] = useState(false);
  const [chatList, setChatList] = useState<Chat[]>([]);
  const [chatActiveId, setChatActiveId] = useState<String>('');
  const [chatActive, setChatActive] = useState<Chat>();

  const [AiLoading, setAiLoading] = useState(false);

  useEffect(() => {
    setChatActive(chatList.find((item) => item.id === chatActiveId));
  }, [chatActiveId, chatList]);

  useEffect(() => {
    if (AiLoading) getAIResponse();
  }, [AiLoading]);

  const openSidebar = () => setSidebarOpened(true);
  const closeSidebar = () => setSidebarOpened(false);

  const getAIResponse = async () => {
    let chatListClone = [...chatList];
    let chatIndex = chatListClone.findIndex((item) => item.id === chatActiveId);
    if (chatIndex > -1) {
      const response = await openai.generate(
        openai.translateMessages(chatListClone[chatIndex].messages)
      );

      if (response) {
        chatListClone[chatIndex].messages.push({
          id: uuidv4(),
          author: "ai",
          body: response
        });
      }
    }
    setChatList(chatListClone);
    setAiLoading(false);
  };

 

  const handClearConversations = () => {
    if (AiLoading) return;

    setChatActiveId("");
    setChatList([]);
  };

  const handleNewChat = () => {
    if (AiLoading) return;

    setChatActiveId("");
    closeSidebar();
  };

  const handdleSendMessage = (message: string) => {
    if (!chatActiveId) {
      // Create new chat
      let newChatId = uuidv4();
      setChatList([
        {
          id: newChatId,
          title: message,
          messages: [{ id: uuidv4(), author: "me", body: message }],
        },
        ...chatList,
      ]);

      setChatActiveId(newChatId);
    } else {
      //updating existing chat
      let chatListClone = [...chatList];
      let chatIndex = chatListClone.findIndex(
        (item) => item.id === chatActiveId
      );
      chatListClone[chatIndex].messages.push({
        id: uuidv4(),
        author: "me",
        body: message,
      });
      setChatList(chatListClone);
    }

    setAiLoading(true);
  };

  const handleSelectChat = (id: string) => {
    if (AiLoading) return;

    let item = chatList.find((item) => item.id === id);

    if (item) setChatActiveId(item.id);
    closeSidebar();
  };

  const handleDeleteChat = (id: string) => {
    let chatListClone = [...chatList];
    let chatIndex = chatListClone.findIndex((item) => item.id === id);
    chatListClone.splice(chatIndex, 1);
    setChatList(chatListClone);
    setChatActiveId("");
  };

  const handleEditChat = (id: string, newTitle: string) => {
    if (newTitle) {
      let chatListClone = [...chatList];
      let chatIndex = chatListClone.findIndex((item) => item.id === id);
      chatListClone[chatIndex].title = newTitle;
      setChatList(chatListClone);
    }
  };

  return (
    <main className="flex min-h-screen bg-gpt-gray">
      <Sidebar
        open={SidebarOpened}
        onClose={closeSidebar}
        onClear={handClearConversations}
        OnNewChat={handleNewChat}
      >
        {chatList.map((item) => (
          <SidebarChatButton
            key={item.id}
            chatItem={item}
            active={item.id === chatActiveId}
            onClick={handleSelectChat}
            onDelete={handleDeleteChat}
            onEdit={handleEditChat}
          />
        ))}
      </Sidebar>

      <section className="flex flex-col w-full">
        <Header
          openSideBarClick={openSidebar}
          title={chatActive ? chatActive.title : "Nova conversa"}
          newChatClick={handleNewChat}
        />

        <ChatArea chat={chatActive} loading={AiLoading} />

        <Footer onSendMessage={handdleSendMessage} disabled={AiLoading} />
      </section>
    </main>
  );
};

export default Page;
