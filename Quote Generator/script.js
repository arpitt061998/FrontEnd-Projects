// let apiQuotes = [];

const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const newQuoteBtn = document.getElementById('new-quote');
const twitterBtn = document.getElementById('twitter');
const loader = document.getElementById('loader');

//show loading
function loading () {
    loader.hidden = false;
    quoteContainer.hidden= true;
}

//hide loading
function complete () {
    loader.hidden = true;
    quoteContainer.hidden= false;
}

function newQuote() {
    const quote = localQuotes[Math.floor(Math.random() * localQuotes.length)]
    loading();
    if(!quote.author) {
        authorText.textContent = "Unknown";
    }
    else {
    authorText.textContent = quote.author;
    }
    if(quote.text.length>50){
        quoteText.classList.add('long-quote');
    }
    else {
        quoteText.classList.remove('long-quote');
    }
    quoteText.textContent = quote.text;
    complete();
}

// GET QUOTES FROM API
// async function getQuotes () {
//     const apiUrl = 'https://type.fit/api/quotes';
//     try{
//         const response = await fetch(apiUrl);
//         apiQuotes = await response.json();
//         newQuote();
//     } catch {

//     }
// }
//
// getQuotes();

//Tweet Quote
function tweetQuote () {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl,''); // '',allows to open url in new tab
}

newQuoteBtn.addEventListener('click',newQuote);
twitterBtn.addEventListener('click',tweetQuote);

newQuote();
