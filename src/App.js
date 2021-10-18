import './App.scss';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter } from '@fortawesome/free-brands-svg-icons'
import { faQuoteLeft } from '@fortawesome/free-solid-svg-icons'


let quotesDBUrl = 'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json';

let colorsArray = ["c77dff", "ffd166", "f48498", "99d98c", "ffa033", "62bfed", "3590f3", "ff686b"];

const useFetch = url => {
  const [quotesArray, setQuotesArray] = useState(null);

  async function fetchQuotes() {
    const response = await fetch(url);
    const parsedJSON = await response.json();
    setQuotesArray(parsedJSON.quotes);
  }

  useEffect(() => { fetchQuotes() }, [url]);
  return quotesArray;
};

function App() {
  const quotesArray = useFetch(quotesDBUrl);
  const [quote, setQuote] = useState({ quote: "", author: "" });
  const [color, setColor] = useState('000000');

  useEffect(() => {
    if (quotesArray) {
      changeQuote()
    }
  }, [quotesArray])

  const getRandomItem = (array) => {
    let randomInteger = Math.floor(array.length * Math.random());
    return array[randomInteger];
  }

  const changeQuote = () => {
    setQuote(getRandomItem(quotesArray));
    setColor(getRandomItem(colorsArray));
  }

  return (
    <div className="App">
      <header className="App-header transition" style={{ backgroundColor: `#${color}` }}>
        <div id="quote-box" className="transition" style={{ color: `#${color}` }}>
          <p id="text"><FontAwesomeIcon icon={faQuoteLeft} /> {quote.quote}</p>
          <p id="author">— {quote.author}</p>
          <div id="buttons">
            <a id="tweet-quote" className="transition" style={{ backgroundColor: `#${color}` }} href={encodeURI(`http://www.twitter.com/intent/tweet?text="${quote.quote}" -${quote.author}`)} target="_blank" rel="noreferrer" >
              <FontAwesomeIcon icon={faTwitter} />
            </a>
            <button id="new-quote" className="transition" style={{ backgroundColor: `#${color}` }} onClick={() => changeQuote()}>New Quote</button>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
