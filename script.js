const FAVORITES_CURRENCIES = ['RUB', 'USD', 'EUR', 'GBP']

const leftSelect = document.querySelector(".ihave select")
const rightSelect = document.querySelector(".iwant select")

function btnclick(activebtnL) {
    activebtnL.classList.add('active');
}

let loaderTimer = null;

const showLoader = () => {
    loaderTimer = setTimeout(() => {
        document.querySelector(".overlay").classList.remove("hidden");
        loaderTimer = null;
    }, 500);
};
const hideLoader = () => {
    if (loaderTimer !== null) {
        clearTimeout(loaderTimer);
        loaderTimer = null;
    }
    document.querySelector(".overlay").classList.add("hidden");
};



const getAvailableCurrencies = async () => {
    const response = await fetch('https://api.exchangerate.host/symbols')
    const data = await response.json()
    return Object.keys(data.symbols)
}

const getRates = async (base, symbols) => {
    const response = await fetch(`https://api.exchangerate.host/latest?base=${base}&symbols=${symbols}`)
    const data = await response.json()

    const responseReversed = await fetch(`https://api.exchangerate.host/latest?base=${symbols}&symbols=${base}`)
    const dataReversed = await responseReversed.json()

    return [data.rates[symbols], dataReversed.rates[base]]
}


getAvailableCurrencies()
    .then((listOfCurrencies) => {
        listOfCurrencies.forEach((currency) => {
            if (FAVORITES_CURRENCIES.indexOf(currency) !== -1) {
                return
            }
            const optionLeft = document.createElement('option')
            const optionRight = document.createElement('option')
            optionLeft.innerText = currency
            optionLeft.value = currency
            optionRight.innerText = currency
            optionRight.value = currency
            leftSelect.append(optionLeft)
            rightSelect.append(optionRight)
        })
    })
const iHaveButtons = document.querySelectorAll(".ihave button") 
const iWantButtons = document.querySelectorAll(".iwant button") 

let leftCurrency = 'RUB'
let rightCurrency = 'USD'

function clearSelection(buttons) {
    buttons.forEach((button) => {
        button.classList.remove('active')
    })

}

iHaveButtons.forEach((button) => {
    button.addEventListener('click', () => {
        leftCurrency = button.innerText
        makeSomeShit()

    })
})
iWantButtons.forEach((button) => {
    button.addEventListener('click', () => {
        rightCurrency = button.innerText
        makeSomeShit()
    })
})
leftSelect.addEventListener('change', (e) => {
    leftCurrency = e.target.value
    makeSomeShit()
})
rightSelect.addEventListener('change', (e) => {
    rightCurrency = e.target.value
    makeSomeShit()
})
const changeButton = document.querySelector(".changeimage")
changeButton.addEventListener('click', () => {
    let bubble = rightCurrency
    rightCurrency = leftCurrency
    leftCurrency = bubble

    makeSomeShit()
})

let rateR;
let rateL;

function makeSomeShit () {  
    showLoader()
    const newActiveBtnL = document.querySelector(`#left-${leftCurrency}`)
    const newActiveBtnR = document.querySelector(`#right-${rightCurrency}`)






    clearSelection(iWantButtons)
    clearSelection(iHaveButtons)
    clearSelectionzz(leftSelect)
    clearSelectionzz(rightSelect)






    if (newActiveBtnL) {
        btnclick(newActiveBtnL)
    } else {
        btnclick(leftSelect)
    }

    if (newActiveBtnR) {
        btnclick(newActiveBtnR)
    } else {
        btnclick(rightSelect)
    }

    getRates(leftCurrency, rightCurrency)
        .then((rate) => {
            console.log(leftCurrency, rightCurrency)
            console.log(rate)
            rateR = rate[0]
            rateL = rate[1]
            onlyoneh.innerText = `1 ${leftCurrency} = ${rate[0]} ${rightCurrency}`
            onlyonew.innerText = `1 ${rightCurrency} = ${rate[1]} ${leftCurrency}`
            inputihave.value = 1;
            rateChanges()
            hideLoader()
        })    
}

const onlyoneh = document.querySelector('.onlyoneh')
const onlyonew = document.querySelector('.onlyonew')
makeSomeShit()

inputihave = document.querySelector('.inputihave')
inputiwant = document.querySelector('.inputiwant')

function rateChanges () {
        inputiwant.value = (inputihave.value*rateR).toFixed(4)
}
inputihave.addEventListener('input', () => {
    rateChanges()
})


function reverseRateChanges () {
        inputihave.value = (inputiwant.value*rateL).toFixed(4)
}
inputiwant.addEventListener('input', () => {
    reverseRateChanges()
})






// const iHaveSelect = document.querySelector('.ihave select')
// const iWantSelect = document.querySelector('.iwant select')

function clearSelectionzz(butt) {
    butt.classList.remove('active')
}