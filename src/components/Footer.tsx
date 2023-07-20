import { ChatMessageInput } from "./ChatMessageInput";

type Props ={
    disabled: boolean;
    onSendMessage: (message:string) => void;
}

export const Footer = ({ onSendMessage, disabled }: Props) =>{
    return (
        <footer className="w-full border-t border-t-gray-600 p-2">
            <div className="max-w-4xl m-auto"> 
                <ChatMessageInput 
                disabled={disabled}
                    onSend={onSendMessage}
                />

                <div className="pt-3 text-center text-sm text-gray-300">
                    Desenvolvido por Gustavo Yuji Okagawa. Permitida a cópia e uso para qualquer fim.<br/>
                    <a href="https://github.com/GustavoYujiOkagawa" className="underline">Veja meu GitHub</a>
                </div>
            </div>
        </footer>
    );
}