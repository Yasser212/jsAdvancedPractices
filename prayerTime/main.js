// Set default date to today
document.getElementById("date").valueAsDate = new Date();

// Add event listener to the button
document.getElementById("getPrayerButton").addEventListener("click", function () {
    const cityValue = document.getElementById("city").value;
    const countryValue = document.getElementById("country").value;
    const dateValue = document.getElementById("date").value;

    if (cityValue && countryValue && dateValue) {
        getPrayerTime(dateValue, cityValue, countryValue);
    } else {
        alert("Please fill all fields");
    }
});

function getPrayerTime(date, city, country) {
    // Format date as DD-MM-YYYY for API
    const formattedDate = date.split('-').reverse().join('-');

    const baseUrl = `https://api.aladhan.com/v1/timingsByCity/${formattedDate}?city=${city}&country=${country}&method=3&shafaq=general&tune=5%2C3%2C5%2C7%2C9%2C-1%2C0%2C8%2C-6`;

    const timeList = document.getElementById("timeList");
    // Clear previous results
    timeList.innerHTML = '';

    axios.get(baseUrl)
        .then((response) => {
            const timings = response.data.data.timings;

            // Prayer names in English and corresponding Arabic names
            const prayerNames = [
                { english: 'Fajr', arabic: 'الفجر' },
                { english: 'Sunrise', arabic: 'الشروق' },
                { english: 'Dhuhr', arabic: 'الظهر' },
                { english: 'Asr', arabic: 'العصر' },
                { english: 'Maghrib', arabic: 'المغرب' },
                { english: 'Isha', arabic: 'العشاء' }
            ];

            // Get times for wanted prayers
            prayerNames.forEach(prayer => {
                const time = timings[prayer.english];
                const li = document.createElement("li");
                li.className = "list_item flex justify-between items-center border-b border-white pb-2";
                li.innerHTML = `
                     <span class="text-xl">${prayer.arabic}</span>
                     <span class="text-xl">${time}</span>`;
                timeList.appendChild(li);
            });
        })
        .catch(error => {
            console.error("Error fetching prayer times:", error);
            timeList.innerHTML = '<li class="text-red-500">خطأ في جلب البيانات، يرجى التأكد من المدخلات</li>';
        });
}