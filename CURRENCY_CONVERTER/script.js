let fromCurrency= document.getElementById("from");
let toCurrency= document.getElementById("to");
const amount= document.querySelector(".amount input");
const result= document.querySelector(".result");
const apiKey= "1037f225e41bebdf000dea3d";

//function to handle country flag

const handleImage= (dropdown) =>{
    const imgTag= dropdown.parentElement.querySelector("img");
    imgTag.src= `https://flagsapi.com/${
        country_codes[dropdown.value]
    }/shiny/64.png`;
};

//function to execute selected dropdown option
const onChange= (dropdown)=>{
    dropdown.addEventListener("change",()=>{
        handleImage(dropdown);
    });
};

//function to clear input
const clearData= () =>{
    console.log(amount.value);
    amount.value= null;
    result.innerText= "0";
};

//function to get exchange rate
const getRate= async() =>{
    amount.value= amount.value || 0;

    try{
        const response= await fetch(
            `https://v6.exchangerate-api.com/v6/1037f225e41bebdf000dea3d/latest/${fromCurrency.value}`
        );

        const exchangeResult= await response.json();
        const exchangeRate= exchangeResult.conversion_rates[toCurrency.value];

        //calculating exchange rates
        let totalExchangeRate= (amount.value * exchangeRate).toFixed(2);
        result.innerText= totalExchangeRate;
    } catch(error){
        alert('Something went wrong:(');
    }
};

//functon to interchange countries
const exchange= () =>{
    [fromCurrency.value, toCurrency.value]=[toCurrency.value,fromCurrency.value];

    [fromCurrency, toCurrency].forEach((dropdown) => handleImage(dropdown));
    getRate();
};

//creating a dropdown list
[fromCurrency, toCurrency].forEach((dropdown,index)=> {
    for(let country in country_codes){
        let selected= 
            (country==="INR" && index===0) || (country==="JPY" && index===1)
                ? "selected"
                : "";

        // creating option tag
        let optionTag= document.createElement("option");
        optionTag.value= country;
        optionTag.selected= selected;
        optionTag.innerText= country;

        //adding option tag to dropdown
        dropdown.appendChild(optionTag);
    }

    onChange(dropdown);
});
