// saveTest.js
function saveTestResult(testName, totalScore, interpretation) {
  const userId = localStorage.getItem("userId");

  if (!userId) {
    alert("⚠️ Please log in to save your test results!");
    window.location.href = "LoginPage.html";
    return;
  }

  fetch("http://localhost:3000/api/test/save-test", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userId,
      testName,
      score: totalScore,
      result: interpretation
    })
  })
    .then(res => res.json())
    .then(data => {
      console.log(`✅ ${testName} saved successfully:`, data);
    })
    .catch(err => console.error("❌ Error saving test:", err));
}
