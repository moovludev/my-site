// Load up statuscafe
document.writeln('<div id="statuscafe"><div id="statuscafe-username"></div><div id="statuscafe-content"></div></div>');

fetch("https://status.cafe/users/moovlu/status.json")
  .then( r => r.json() )
  .then( r => {
    document.getElementById("statuscafe-username").innerHTML = '<a href="https://status.cafe/users/moovlu" target="_blank">' + r.author + '</a> ' + r.face + ' ' + r.timeAgo
    document.getElementById("statuscafe-content").innerHTML = r.content
  })


// Load a random tip
const tip_list = ["bacon tastes nice", "i have no tips for you :("];

let random_tip_index = Math.floor(Math.random() * tip_list.length);
let selected_tip = tip_list[random_tip_index];

function writeTip(text) {
  document.getElementById("tip").innerHTML = text;
}

// Write in text slowly
for (let i=0; i <= selected_tip.length; i++) {
  console.log(i)
  setTimeout(() => {
    writeTip(selected_tip.slice(0,i));
  }, 100 * i);
}
