const USER = "admin";
const PASS = "admin";

function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const alertMessage = document.getElementById("login-alert");

    if (username === USER && password === PASS) {
        document.getElementById("login-section").style.display = "none";
        document.getElementById("converter-section").style.display = "block";
        alertMessage.textContent = "";
    } else {
        alertMessage.textContent = "Incorrect username or password.";
    }
}

async function convertCurrency() {
    const amount = parseFloat(document.getElementById("amount").value);
    const fromCurrency = document.getElementById("fromCurrency").value;
    const toCurrency = document.getElementById("toCurrency").value;
    const resultDisplay = document.getElementById("conversion-result");

    if (isNaN(amount) || amount <= 0) {
        resultDisplay.textContent = "Please enter a valid amount.";
        return;
    }

    try {
        const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);
        if (!response.ok) throw new Error("Exchange rate data unavailable.");

        const data = await response.json();
        const conversionRate = data.rates[toCurrency];

        if (!conversionRate) {
            resultDisplay.textContent = `Rate for ${toCurrency} not available.`;
            return;
        }

        const convertedAmount = amount * conversionRate;
        resultDisplay.textContent = `${amount} ${fromCurrency} = ${convertedAmount.toFixed(2)} ${toCurrency}`;
    } catch (error) {
        resultDisplay.textContent = "An error occurred. Try again later.";
        console.error("Error:", error);
    }
}
