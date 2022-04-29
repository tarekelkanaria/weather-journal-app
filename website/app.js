/* Global Variables */
const baseURL = "https://api.openweathermap.org/data/2.5/weather?zip=";
const apiKey = "&appid=<your_api_key>&units=imperial";
const zipCode = document.getElementById("zip");
const generator = document.getElementById("generate");
// Create a new date instance dynamically with JS
let d = new Date();
// add 1 to get month() method bocause the return value between 0 and 11
let newDate = d.getMonth() + 1 + "." + d.getDate() + "." + d.getFullYear();

// get weather data by integrating open weather map API
const weatherDemo = async (baseURL, zip, key) => {
  const res = await fetch(baseURL + zip + key);
  try {
    const data = await res.json();
    return data;
  } catch (error) {
    console.log("error", error);
  }
};
// execute post route with async function
const postData = async (data = {}) => {
  const response = await fetch("/add", {
    method: "post",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  try {
    const newData = await response.json();
    console.log(newData);
    return newData;
  } catch (error) {
    console.log("error", error);
  }
};
// fetch the data from the app endpoint
const retrieveData = async () => {
  const request = await fetch("/all");
  try {
    // transform into JSON
    const allData = await request.json();
    // write updated data to DOM elements
    document.getElementById("temp").innerHTML =
      Math.round(allData.temp) + " degrees";
    document.getElementById("content").innerHTML = allData.feel;
    document.getElementById("date").innerHTML = allData.date;
    return allData;
  } catch (error) {
    console.log("error", error);
    // appropriately handle error
  }
};
// here add an event listner to html element button with varaible generator
generator.addEventListener("click", () => {
  const feelings = document.getElementById("feelings").value.trim();
  const zipCodeValue = zipCode.value.trim();
  // call the async functons when the button has clicked to update UI
  weatherDemo(baseURL, zipCodeValue, apiKey)
    .then((data) => {
        postData({ temp: data.main.temp, feel: feelings, date: newDate });
    })
    .then(() => retrieveData());
});
