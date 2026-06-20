const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyrOiVZ69q9a2irSWszN3m03Qn_MCybexK6AkvqF6gntAWEnpsl2XsphttDTWt5P-CHIQ/exec";

async function testOrder() {
  try {
    const response = await fetch(SCRIPT_URL, {
      method: "POST",
      body: JSON.stringify({
        name: "Website Test",
        phone: "9999999999",
        apartment: "Test Apartment",
        flat: "A101",
        order: "1 Sunday Combo",
        total: 179
      })
    });

    alert("Request sent!");
    console.log(await response.text());

  } catch (err) {
    console.error(err);
    alert("Error sending request");
  }
}
