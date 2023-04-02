const quoteContainer = document.getElementById('container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuotebtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

// Showing Loading
function loading(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}
// Hide Loading
function complete(){
    quoteContainer.hidden = false;
    loader.hidden = true;
}

let apiQuotes = [];
// Show New Quotes
function newQuotes(){
    loading();
    // Generate Random Quote from apiQuotes Arrays
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

    quoteText.textContent = quote.text;
    authorText.textContent = quote.author;

    // If author field is blank replace with unknown
    if(!quote.author){
        authorText.textContent = "Unknown";
    }else {
        authorText.textContent = quote.author;
    }
    // Check Quote length to determine styling
    if(quote.text.length > 120){
        quoteText.classList.add('long-quote');
    } else{
        quoteText.classList.remove('long-quote');
    }

    // Set Quote, Hide Loader
    quoteText.textContent = quote.text;
    complete();
    
    
};
// Get Quotes from API
async function getQuotes(){
    loading();
    const apiUrl = "https://type.fit/api/quotes";
    try{
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuotes();
    }catch(error){
        // Catch Error Here
    }
};


// Tweet Quote
function tweetQuote(){
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank')
}

// Eventlistener
newQuotebtn.addEventListener('click', newQuotes);
twitterBtn.addEventListener('click', tweetQuote);
// On Load
getQuotes();
