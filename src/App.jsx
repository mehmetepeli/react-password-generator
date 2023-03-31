import './App.css';
import {useState} from "react";

const App = () => {
    const [rangeSlide, setRangeSlide] = useState(12);
    const [uppercase, setUppercase] = useState(false);
    const [numbers, setNumbers] = useState(false);
    const [symbols, setSymbols] = useState(false);
    const [password, setPassword] = useState("");

    let characters = "abcdefghijklmnopqrstuvwxyz";
    let upperCharacters = "ABCDEFGHIJKLMNOPGRSTUVWXYZ";
    let symbol = "!@#$%^&*()_+~`|}{[]:;?><,./-=";

    const genCharacter = () => {
        let random = Math.floor(Math.random() * characters.length);
        return characters.slice(random, random + 1);
    }

    const genUpper = () => {
        let random = Math.floor(Math.random() * upperCharacters.length);
        return upperCharacters.slice(random, random + 1);
    }

    const genSymbol = () => {
        let number = Math.floor(Math.random() * symbol.length);
        return symbol.slice(number, number + 1);
    }

    const genNumber = () => { return Math.floor(Math.random() * 10); }

    const handleGenerate = (e) => {
        e.preventDefault();

        let tempPassword = '';

        for(var i = 0; i < rangeSlide; i++) {
            const methods = [
                genCharacter(),
                uppercase && genUpper(),
                symbols && genSymbol(),
                numbers && genNumber(),
            ].filter((method) => Boolean(method));

            let random = Math.floor(Math.random() * methods.length);
            tempPassword += methods[random];
        }

        setPassword(tempPassword);
    }

    const copyPassword = () => {
        navigator.clipboard.writeText(password);
        alert('Successfully copied');
    }

  return (
    <div id="calculator-total-box">
        <div className="header">
            <h1>React Password Generator</h1>
        </div>
      <form id="calculator-form">
        <div className="input-row">
            <input type="text" className="passwordText" id="newPassword" value={password} readOnly/>
            <svg id="clipboard" fill="#002B5B" className="icon" viewBox="0 0 384 512" width="12" title="clipboard" onClick={() => copyPassword()}>
                <path
                    d="M384 112v352c0 26.51-21.49 48-48 48H48c-26.51 0-48-21.49-48-48V112c0-26.51 21.49-48 48-48h80c0-35.29 28.71-64 64-64s64 28.71 64 64h80c26.51 0 48 21.49 48 48zM192 40c-13.255 0-24 10.745-24 24s10.745 24 24 24 24-10.745 24-24-10.745-24-24-24m96 114v-20a6 6 0 0 0-6-6H102a6 6 0 0 0-6 6v20a6 6 0 0 0 6 6h180a6 6 0 0 0 6-6z"/>
            </svg>
        </div>
        <div className="input-row lengthArea">
            <input className="range" type="range" min="8" max="36" value={rangeSlide} onChange={(e)=>setRangeSlide(e.target.value)}/>
            <span className="lengthText">Length: <span id="length">{rangeSlide}</span></span>
        </div>
        <div className="input-row">
            <span className="input-title">Include Uppercase</span>
            <span className="input-container"><input type="checkbox" className="toggleCheck" onChange={() => setUppercase(!uppercase)}/></span>
        </div>
        <div className="input-row">
            <span className="input-title">Include Numbers</span>
            <span className="input-container"><input type="checkbox" className="toggleCheck" onChange={() => setNumbers(!numbers)}/></span>
        </div>
        <div className="input-row">
            <span className="input-title">Include Symbols</span>
            <span className="input-container"><input type="checkbox" className="toggleCheck" onChange={() => setSymbols(!symbols)}/></span>
        </div>
        <button onClick={(e) => handleGenerate(e)}>GENERATE</button>
      </form>
    </div>
  );
}

export default App;
