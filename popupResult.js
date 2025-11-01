// popup.js — Universal popup for all test result pages

// Function to show test result popup
function showResultPopup(testName, score, result) {
  let popup = document.getElementById("resultPopup");

  // If popup HTML doesn't exist in the page yet, create it dynamically
  if (!popup) {
    const popupHTML = `
      <div id="resultPopup" class="popup">
        <div class="popup-content">
          <h3 id="popupTitle">Test Result</h3>
          <p id="popupMessage"></p>
          <button id="closePopup">OK</button>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML("beforeend", popupHTML);
    popup = document.getElementById("resultPopup");
  }

  // Fill popup with dynamic data
  document.getElementById("popupTitle").innerHTML = `🧠 ${testName}`;
  document.getElementById("popupMessage").innerHTML = `
    <strong>Score:</strong> ${score}<br>
    <strong>Result:</strong> ${result}<br>
    <small>Date: ${new Date().toLocaleDateString()}</small>
  `;

  // Show popup
  popup.style.display = "flex";

  // Close logic
  const closeBtn = document.getElementById("closePopup");
  closeBtn.onclick = () => popup.style.display = "none";
  popup.onclick = (e) => { if (e.target === popup) popup.style.display = "none"; };
}
