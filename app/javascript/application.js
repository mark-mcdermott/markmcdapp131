// Entry point for the build script in your package.json
import "@hotwired/turbo-rails"
import "./controllers"
import * as bootstrap from "bootstrap"

const scoresApiUrl = '/api/scores/new';

// this is the post request the js uses to send the game score to rails when a game finished
function scoresApiPostRequest(url, val, userId) {
	console.log('in post request')
	var csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
	var xhr = new XMLHttpRequest();
	xhr.open('POST', url);
	xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
	xhr.setRequestHeader('X-CSRF-Token', csrfToken);
	xhr.onload = function () { console.log('Scores API post request success'); };
	xhr.send(JSON.stringify({ score: { "val": val, "user_id": userId }}));
}

// this form submit listener on /api/scores/new is a test for the javascript sending the score in post 
// request to rails. you can go to /api/scores/new in your browser and fill in the form and click submit 
// to simulate the automatic call that will happen when a game ends and the js sends the score to rails
document.addEventListener("DOMContentLoaded", function(event) {
  if(document.getElementById('testScoresApiSubmit')){
		const formElem = document.querySelector('form');
		formElem.addEventListener('submit', (e) => {
			e.preventDefault();
			const val = formElem.querySelector('input[name="score[val]"]').value; 
			const user_id = formElem.querySelector('input[name="score[user_id]"]').value; 
			console.log ('val: ' + val + ', user_id: ' + user_id)
			scoresApiPostRequest(scoresApiUrl,val,user_id)
		});
  }
});