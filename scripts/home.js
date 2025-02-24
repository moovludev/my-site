// Query Statuscafe and write html
fetch("https://status.cafe/users/moovlu/status.json")
	.then((response) => response.json())
	.then((data) => {
		const statusUsername = document.getElementById("statuscafe-username");
		const statusContent = document.getElementById("statuscafe-content");

		if (statusUsername && statusContent) {
		statusUsername.innerHTML = `
			<div class="status-container">
			<img src="/images/status_avatar_placeholder.png" class="status-image" alt="User Avatar">
			<span>
				<a href="https://status.cafe/users/moovlu" target="_blank" rel="noopener noreferrer">
				<p>${data.author}</p>
				</a>
				${data.face}
				<p class="subtext">${data.timeAgo}</p>
			</span>
			</div>`;

		statusContent.innerHTML = `<p>${data.content}</p>`;
		}
	})
	.catch((error) => {
		console.error("Error fetching status:", error);
	});

// Load a random tip
const tip_list = ["bacon tastes nice", "i have no tips for you :("];

let random_tip_index = Math.floor(Math.random() * tip_list.length);
let selected_tip = tip_list[random_tip_index];

function writeTip(text) {
document.getElementById("tip").innerHTML = text;
}

// Write in text slowly
for (let i = 0; i <= selected_tip.length; i++) {
	setTimeout(() => {
		writeTip(selected_tip.slice(0, i));
	}, 100 * i);
}

// Check for smaller screens
let screenWidth = window.innerWidth;

if (screenWidth < 960) {
	alert("Your screen is too small. It's recommended you use a desktop to view this site.")
}