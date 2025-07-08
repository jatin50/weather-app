console.log("hello")
let userlocation = ""
let form = document.querySelector(".form")  
let submit = document.querySelector(".submitbtn")
// form.addEventListener('submit', loc())
        form.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            const input = document.querySelector('input[type="text"]');
     userlocation = input.value;
        }
    });
submit.addEventListener('click', loc()) 
async function getweather(userlocation) {
try {
  const response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=1986480656ec490d950204923202611&q=${userlocation}` ,
    {
      mode: 'cors',
    }
  )
  const mydata = await response.json();
  console.log(mydata); 
  const newdata = processdata(mydata)
  displaydata(newdata)
  
} catch (error) {
  console.log("API Error",error)
  
}
}
  function processdata(mydata){
    const data = {
condition: mydata.current.condition.text,
feelslike: {
  c:Math.round(mydata.current.feelslike_c),
  temp_f:Math.round(mydata.current.feelslike_f),
  },
currenttemp: {
currenttemp_c: Math.round(mydata.current.temp_c),
currenttemp_f: Math.round(mydata.current.temp_f),
},
humidity: mydata.current.humidity,
location: mydata.location.country,
region: mydata.location.region,
} 
return data
}
   function displaydata(newdata){
    document.querySelector(".condition").textContent = ` ${newdata.condition}`
    document.querySelector(".location").textContent = `  Region : ${userlocation}, ${newdata.region} ,${newdata.location}`
  document.querySelector(".current-temp").textContent = ` Current Temperature : ${newdata.currenttemp.currenttemp_c}°C`
  document.querySelector(".feels-like").textContent = ` feelslike : ${newdata.feelslike.c}°C`
  }
  function loc(){
    if(userlocation===""){
      userlocation = "New delhi"
    }
    else{
     const input = document.querySelector('input[type="text"]');
     userlocation = input.value;
   }
   getweather(userlocation);
  }
  