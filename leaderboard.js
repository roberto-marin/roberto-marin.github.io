const highScoresList = document.getElementById("highScoresList");
const clearLeaderboardBtn = document.getElementById('clearLeaderboardBtn');
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

highScoresList.innerHTML = highScores
  .map(score => {
    return `<li class="high-score">${score.name} - ${score.score}</li>`;
  })
  .join("");

clearLeaderboardBtn.onclick = function() {
  localStorage.removeItem("highScores");
  location.href = 'leaderboard.html';
}