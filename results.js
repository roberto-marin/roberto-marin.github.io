const username = document.getElementById('username');
const saveScoreBtn = document.getElementById('saveScoreBtn');
const finalScore = document.getElementById('finalScore');
const mostRecentScore = localStorage.getItem('mostRecentScore');
const mostRecentTimeTaken = localStorage.getItem('mostRecentTimeTaken');
const finalTimeTaken = document.getElementById('finalTimeTaken');


const highScores = JSON.parse(localStorage.getItem('highScores')) || [];

const leaderboardCount = 5;

finalScore.innerText = "Points: "+mostRecentScore;

if (mostRecentTimeTaken > 60) {
    finalTimeTaken.innerText = "Time: "+parseInt(mostRecentTimeTaken / 60)+":"+(mostRecentTimeTaken % 60);
} else {
    finalTimeTaken.innerText = "Time: 0:"+mostRecentTimeTaken;
}

username.addEventListener('keyup', () => {
    saveScoreBtn.disabled = !username.value;
});

saveScore = (e) => {
    e.preventDefault();

    const score = {
        score: mostRecentScore,
        name: username.value,
    };
    highScores.push(score);
    highScores.sort((a, b) => b.score - a.score);
    highScores.splice(leaderboardCount);

    localStorage.setItem('highScores', JSON.stringify(highScores));
    window.location.assign('/');

    location.href = "index.html";
};