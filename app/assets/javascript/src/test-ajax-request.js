const scoresApiUrl = '/api/scores/new';

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