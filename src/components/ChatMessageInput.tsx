import { useEffect, useRef, useState } from "react";
import IconBxSend from "./icons/IconSend"

type Props ={
    disabled: boolean;
    onSend: (message:string) => void
}

export const ChatMessageInput = ({ disabled,onSend }: Props) =>{

    const [text, setText] = useState('');
    const textEl = useRef<HTMLTextAreaElement>(null);

    useEffect(() =>{
        if(textEl.current){
            textEl.current.style.height = '0px';
            let scrollHeight = textEl.current.scrollHeight;
            textEl.current.style.height = scrollHeight + 'px';
        }
    }, [text, textEl]);

    const handdleTextKeyUp = (event: KeyboardEvent<HTMLTextAreaElement>) => {
        if(event.code.toLowerCase() === 'enter' && !event.shiftKey){
            event.preventDefault();
            handdleSendMessage();
        }
    }

    const handdleSendMessage = () => {
        if(!disabled && text.trim() !== ''){
            onSend(text);
            setText('');
        }
    }

    return (
        <div className={`
        flex border border-gray-800/50 bg-gpt-lightgray p-2 rounded-md
        ${disabled && 'opacity-50'}
        `}>

            <textarea
            ref={textEl}
            className="flex-1 border-0 bg-transparent resize-none outline-none
            h-7 max-h-48 overflow-y-auto"
            placeholder="Digite uma menssagem"
            value={text}
            onChange={e => setText(e.target.value)}
            onKeyUp={handdleTextKeyUp}
            disabled={disabled}
            ></textarea>
            <div onClick={handdleSendMessage}  className={`
            self-end p-1 cursor-pointer rounded
            ${text.length ? 'opacity-100 hover:bg-black/20' : 'opacity-20'}
            `}>
                <IconBxSend width={14} height={14}/>
            </div>

        </div>
    )
}