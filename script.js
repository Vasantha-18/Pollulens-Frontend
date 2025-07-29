document.getElementById("aqiForm").addEventListener("submit", async function(e) {
    e.preventDefault();

    let data = {
        pm25: parseFloat(document.getElementById("pm25").value),
        pm10: parseFloat(document.getElementById("pm10").value),
        no2: parseFloat(document.getElementById("no2").value),
        so2: parseFloat(document.getElementById("so2").value),
        co: parseFloat(document.getElementById("co").value),
        o3: parseFloat(document.getElementById("o3").value)
    };

    try {
        let response = await fetch("https://pollulens-backend-3.onrender.com/predict", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });

        let result = await response.json();

        document.getElementById("result").innerHTML = `
            <h3>Predicted AQI: ${result.predicted_aqi}</h3>
            <p>Status: ${result.status}</p>
            <p>Suggestion: ${result.suggestion}</p>
            <p>Recommended Clothes: ${result.clothes}</p>
        `;
    } catch (error) {
        document.getElementById("result").innerHTML = "❌ Error: " + error;
    }
});
