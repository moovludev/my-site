// Query Statuscafe and write html
fetch("https://status.cafe/users/moovlu/status.json")
	.then((response) => response.json())
	.then((data) => {
		const statusUsername = document.getElementById("statuscafe-username");
		const statusContent = document.getElementById("statuscafe-content");

		if (statusUsername && statusContent) {
			statusUsername.innerHTML = `
			<div class="status-container">
			<img src="./images/status_avatar_placeholder.png" class="status-image" alt="User Avatar">
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

// Get a relative date
function timeAgo(dateString) {
	const now = new Date();
	const past = new Date(dateString);
	const seconds = Math.floor((now - past) / 1000);

	const intervals = [
		{ label: "year", seconds: 31536000 },
		{ label: "month", seconds: 2592000 },
		{ label: "day", seconds: 86400 },
		{ label: "hour", seconds: 3600 },
		{ label: "minute", seconds: 60 },
		{ label: "second", seconds: 1 }
	];

	for (const interval of intervals) {
		const count = Math.floor(seconds / interval.seconds);
		if (count >= 1) {
			return `${count} ${interval.label}${count > 1 ? "s" : ""} ago`;
		}
	}
	return "just now";
}

async function getReleaseId(recordingId) {
	const res = await fetch(
		`https://musicbrainz.org/ws/2/recording/${recordingId}?inc=releases&fmt=json`
	);
	const data = await res.json();
	return data.releases?.[0]?.id;
}

// Query listenbrains for music feed
const feedUrl = "https://listenbrainz.org/syndication-feed/user/Moovlu/listens?minutes=10080";

async function loadNowPlaying() {
	// Fetch data to string
	const res = await fetch(feedUrl);
	const xmlText = await res.text();
	const parser = new DOMParser();
	const xml = parser.parseFromString(xmlText, "text/xml");

	// Get first entry or return nothing
	const entry = xml.querySelector("entry");
	if (!entry) {
		document.getElementById("music-feed").innerHTML = "<p>No music data found</p>";
		return;
	}

	// Get basic information
	const title = entry.querySelector("title")?.textContent;
	const updated = entry.querySelector("updated")?.textContent;

	// Get links
	const contentHTML = entry.querySelector("content")?.textContent;
	const contentDoc = new DOMParser().parseFromString(contentHTML, "text/html");
  	const links = contentDoc.querySelectorAll("a");

	const songLink = links[1]?.href; // musicbrainz song
	const recordingId = songLink.split("/").pop();

	// Get cover with catch if none exists
	let coverUrl = "";
	try {
		const releaseId = await getReleaseId(recordingId);
		if (releaseId) {
			coverUrl = "https://coverartarchive.org/release/" + releaseId + "/front-250";
		}
	} catch (e) {
		console.log("No cover art found");
	}

	// Return HTML
	document.getElementById("music-feed").innerHTML = `
		<div class="status-container">
			<a href="${songLink}" target="_blank" rel="noopener noreferrer">
				<img src="${coverUrl}" class="status-image" alt="User Avatar">
			</a>
			<span>
				<a href="${songLink}" target="_blank" rel="noopener noreferrer">
				<p>${title}</p>
				</a>
				<p class="subtext">${timeAgo(updated)}</p>
			</span>
		</div>
	`;
}

loadNowPlaying();