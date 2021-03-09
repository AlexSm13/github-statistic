import {useRef, useState} from "react";
import UserInfo from "../UserInfo/UserInfo";

function Search() {
    const [login, setLogin] = useState("")
    let inputRef = useRef<HTMLInputElement | null>(null)

    function handleChange(e: any) {
        e.preventDefault();
        setLogin(inputRef.current?.value || '');
    }

    return (
        <div>
            <h2>Введите логин Github</h2>
            <form>
                <input ref={inputRef} type="text"/>
                <button onClick={handleChange}>Искать</button>
            </form>

            <div>
                <UserInfo login={login}/>
            </div>
        </div>
    );
}

export default Search;
