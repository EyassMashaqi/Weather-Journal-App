const apiKey = "479a7df16bd282b5d0fa674163c74550"; 

const retrieveData = async () => {
  try {
    const request = await fetch("http://localhost:8000/all"); 
    if (!request.ok) throw new Error("Failed to retrieve data.");
    const allData = await request.json();
    console.log(allData);

    
    document.getElementById("temp").innerHTML =
      Math.round(allData.temp) + "°C";  
    document.getElementById("content").innerHTML = allData.feel;
    document.getElementById("date").innerHTML = allData.date;
  } catch (error) {
    console.error("Error retrieving data:", error);
    alert("Failed to retrieve data from the server.");
  }
};

const postData = async (url = "", data = {}) => {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  try {
    return await response.json();
  } catch (error) {
    console.error("Error posting data:", error);
  }
};


document.getElementById("generate").addEventListener("click", async () => {
  const zip = document.getElementById("zip").value;
  const feelings = document.getElementById("feelings").value;

  if (!zip) {
    alert("Please enter a zip code.");
    return;
  }

  const weatherURL = `https://api.openweathermap.org/data/2.5/weather?zip=${zip}&appid=${apiKey}`;
  try {
    const response = await fetch(weatherURL);
    if (!response.ok) {
      throw new Error("Failed to fetch weather data.");
    }

    const weatherData = await response.json();
    const temp = weatherData.main.temp; 
    const date = new Date().toLocaleDateString();

    await postData("http://localhost:8000/add", { temp, date, feel: feelings });
    retrieveData();
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
});