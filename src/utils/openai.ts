import { ChatMessage } from "@/types/ChatMessage";
import { Configuration, OpenAIApi, ChatCompletionRequestMessage } from "openai";

const config = new Configuration({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY
});

const api = new OpenAIApi(config);

export const openai = {
    generate: async (messages: ChatCompletionRequestMessage[]) => {
        try{
        const response = await api.createChatCompletion({
            model: 'gpt-3.5-turbo',
            temperature: 0.6,
            messages
        });
        
        return response.data.choices[0]?.message?.content;
    }catch(error){
        return undefined;
    }
    },
    translateMessages: (messages: ChatMessage[]) => {
        let reqMessage: ChatCompletionRequestMessage[] =[];

        for(let i in messages){
            reqMessage.push({
                role: messages[i].author === 'me' ? 'user' : 'assistant',
                content:messages[i].body
            })
        }

        return reqMessage;
    }
}
