import IconMenu from "./icons/IconMenu";
import IconAdd from "./icons/iconAdd";

type Props = {
    openSideBarClick: () => void;
    title: string;
    newChatClick: () => void;
}

export const Header = ({ openSideBarClick, title, newChatClick }: Props) =>{
    return(
        <header className=" flex justify-between items-center w-full border-b border-b-gray-600 p-2 md:hidden">
            
            <div onClick={openSideBarClick}>
                <IconMenu width={24} height={24}/>
            </div>

            <div className="mx-2 truncate">{title}</div>

            <div onClick={newChatClick}>
                <IconAdd width={24} height={24}/>
            </div>
        </header>

    );
}