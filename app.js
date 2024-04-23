async function fetchNamazTimings(city) {
  const response = await fetch(`https://api.aladhan.com/v1/timingsByCity/20-04-2024?city=${city}&country=Pakistan&method=8`);
  const data = await response.json();
  return data.data.timings;
}

async function displaySelectedNamazTimings(city) {
  const timingsDiv = document.getElementById("timings");
  timingsDiv.innerHTML = "<p>Loading...</p>";

  try {
    const namazTimings = await fetchNamazTimings(city);
    timingsDiv.innerHTML = ""; // Clear loading message

    const selectedTimings = {
      Fajr: namazTimings.Fajr,
      Dhuhr: namazTimings.Dhuhr,
      Asr: namazTimings.Asr,
      Maghrib: namazTimings.Maghrib,
      Isha: namazTimings.Isha,
    };

    Object.entries(selectedTimings).forEach(([key, value]) => {
      timingsDiv.innerHTML += `<p>${key}: ${value}</p>`;
    });
  } catch (error) {
    timingsDiv.innerHTML = `<p>Failed to fetch Namaz timings for ${city}. Please try again later.</p>`;
    console.error(`Error fetching Namaz timings for ${city}:`, error);
  }
}

document
  .getElementById("cityForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const city = document.getElementById("cityInput").value;
    displaySelectedNamazTimings(city);
  });
