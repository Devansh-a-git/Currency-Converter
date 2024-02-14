const murl = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

let drops = document.querySelectorAll(".dropdown select");

let fromimg = document.querySelector("#fromimg")

let toimg = document.querySelector("#toimg")

let btn = document.querySelector("button")

let msg = document.querySelector(".disp p")






for(let x of drops){
    for(curr in countryList){

        let newoption = document.createElement("option");
        newoption.innerText = curr;
        newoption.value = curr;
        x.append(newoption);
        if(x.name=="from" && curr=="USD"){

            newoption.selected = "selected"

        }
        if(x.name=="to" && curr=="INR"){

            newoption.selected = "selected"

        }
    
    }

    x.addEventListener("change", (evt) => {
        flagcng(evt.target)
    })

}

const flagcng = (arg) => {

    msg.innerText = "..."
    let curr = arg.value
    let country = countryList[curr]

    let newsrc = `https://flagsapi.com/${country}/shiny/64.png`

    if(arg.name=="from"){

        fromimg.src = newsrc

    }
    else{

        toimg.src= newsrc

    }

      
}





btn.addEventListener("click" , async (evt) => {

    evt.preventDefault();

    let amtbox = document.querySelector(".inpbox input")
    let amt = amtbox.value

    if (amt === "" || amt <= 0) {
        amt = 1;
        amtbox.value = "1";
    }

    let fromselect = document.querySelector("#fromselect")

    let fromcurr = fromselect.value;

    let toselect = document.querySelector("#toselect")

    let tocurr = toselect.value;

    
    let newurl = `${murl}/${fromcurr.toLowerCase()}/${tocurr.toLowerCase()}.json`

  
    let response = await fetch(newurl)

    let data = await response.json();
    
    let rate = data[tocurr.toLowerCase()];

    let finalval = amt*rate


    msg.innerText = `${finalval} ${tocurr}`
  
})