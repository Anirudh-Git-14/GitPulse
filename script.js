async function showUsername() {
  let username = document.getElementById("usernameInput").value.trim();
  let resultBox = document.getElementById("result");
  let analyzeBtn = document.getElementById("analyzeBtn");

  if (username === "") {
    showError("Enter username bro.");
    return;
  }

  showLoading();

  try {
    let response = await fetch("https://api.github.com/users/" + username);

    if (response.ok === false) {
      showError("GitHub user not found. What bro it's very wrong bro!");
      return;
    }

    let data = await response.json();

    let repoResponse = await fetch(
      "https://api.github.com/users/" + username + "/repos?sort=updated&per_page=10"
    );

    let repos = await repoResponse.json();

    let repoList = "";
    let totalStars = 0;
    let totalForks = 0;
    let languageCount = {};

    for (let repo of repos) {
      totalStars = totalStars + repo.stargazers_count;
      totalForks = totalForks + repo.forks_count;

      if (repo.language !== null) {
        if (languageCount[repo.language] === undefined) {
          languageCount[repo.language] = 1;
        } else {
          languageCount[repo.language] = languageCount[repo.language] + 1;
        }
      }

      repoList = repoList + `
        <div class="repo-card">
          <h3>${repo.name}</h3>
          <p>Language: ${repo.language || "Not specified"}</p>
          <p>Stars: ${repo.stargazers_count}</p>
          <p>Forks: ${repo.forks_count}</p>
          <a href="${repo.html_url}" target="_blank">Open Repo</a>
        </div>
      `;
    }

    let mostUsedLanguage = "Not enough data";
    let highestCount = 0;

    for (let language in languageCount) {
      if (languageCount[language] > highestCount) {
        highestCount = languageCount[language];
        mostUsedLanguage = language;
      }
    }

    let languageTypes = Object.keys(languageCount).length;

    if (repos.length === 0) {
      repoList = "<p>No public repositories found.</p>";
    }

    let score = 0;

    if (data.bio !== null) {
      score = score + 10;
    }

    if (data.public_repos >= 5) {
      score = score + 20;
    } else {
      score = score + data.public_repos * 4;
    }

    if (data.followers >= 20) {
      score = score + 15;
    } else {
      score = score + data.followers;
    }

    if (totalStars >= 10) {
      score = score + 20;
    } else {
      score = score + totalStars * 2;
    }

    if (totalForks >= 5) {
      score = score + 10;
    } else {
      score = score + totalForks * 2;
    }

    if (languageTypes >= 3) {
      score = score + 15;
    } else {
      score = score + languageTypes * 5;
    }

    if (repos.length >= 5) {
      score = score + 10;
    } else {
      score = score + repos.length * 2;
    }

    if (score > 100) {
      score = 100;
    }

    let profileLevel = "";

    if (score >= 80) {
      profileLevel = "Strong Developer Profile";
    } else if (score >= 60) {
      profileLevel = "Active Developer Profile";
    } else if (score >= 35) {
      profileLevel = "Growing Developer Profile";
    } else {
      profileLevel = "Beginner GitHub Profile";
    }

    let suggestions = "";

    if (data.bio === null) {
      suggestions = suggestions + "<p>Add a GitHub bio to make your profile more professional.</p>";
    }

    if (data.public_repos < 5) {
      suggestions = suggestions + "<p>Build and upload more public projects.</p>";
    }

    if (totalStars === 0) {
      suggestions = suggestions + "<p>Improve your project README files so people understand your work.</p>";
    }

    if (languageTypes < 2) {
      suggestions = suggestions + "<p>Try building projects using more than one technology.</p>";
    }

    if (suggestions === "") {
      suggestions = "<p>Your GitHub profile looks good. Keep improving your projects.</p>";
    }

    analyzeBtn.innerText = "Analyze";
    analyzeBtn.disabled = false;

    resultBox.className = "success-state";

    resultBox.innerHTML = `
      <section class="profile-section">
        <img src="${data.avatar_url}" width="120">

        <h2>${data.name || "No name available"}</h2>
        <p>@${data.login}</p>
        <p>${data.bio || "No bio available"}</p>

        <div class="profile-stats">
          <div>
            <span>${data.public_repos}</span>
            <p>Public Repos</p>
          </div>

          <div>
            <span>${data.followers}</span>
            <p>Followers</p>
          </div>

          <div>
            <span>${data.following}</span>
            <p>Following</p>
          </div>
        </div>

        <a href="${data.html_url}" target="_blank">View Github Profile</a>
      </section>

      <section class="score-section">
        <h2>GitPulse Score</h2>

        <div class="score-box">
          <span>${score}</span>
          <p>/ 100</p>
        </div>

        <p>${profileLevel}</p>
      </section>

      <h2>GitPulse Insights</h2>

      <section class="insight-grid">
        <div class="insight-card">
          <span>${repos.length}</span>
          <p>Repos Analyzed</p>
        </div>

        <div class="insight-card">
          <span>${totalStars}</span>
          <p>Total Stars</p>
        </div>

        <div class="insight-card">
          <span>${totalForks}</span>
          <p>Total Forks</p>
        </div>

        <div class="insight-card">
          <span>${mostUsedLanguage}</span>
          <p>Most Used Language</p>
        </div>

        <div class="insight-card">
          <span>${languageTypes}</span>
          <p>Languages Used</p>
        </div>
      </section>

      <h2>Suggestions</h2>

      <section class="suggestions-box">
        ${suggestions}
      </section>

      <h2>Top Repositories</h2>

      <section class="repo-list">
        ${repoList}
      </section>
    `;
  } catch (error) {
    showError("Something went wrong. Check your internet connection and try again.");
  }
}

function showLoading() {
  let resultBox = document.getElementById("result");
  let analyzeBtn = document.getElementById("analyzeBtn");

  analyzeBtn.innerText = "Scanning...";
  analyzeBtn.disabled = true;

  resultBox.className = "loading-state";

  resultBox.innerHTML = `
    <div class="loading-box">
      <h2>GitPulse Scan Started</h2>

      <div class="terminal-loader">
        <p>Initializing GitPulse engine...</p>
        <p>Fetching GitHub profile data...</p>
        <p>Scanning public repositories...</p>
        <p>Calculating developer signal...</p>
        <p>Building intelligence report...</p>
      </div>
    </div>
  `;
}

function showError(message) {
  let resultBox = document.getElementById("result");
  let analyzeBtn = document.getElementById("analyzeBtn");

  analyzeBtn.innerText = "Analyze";
  analyzeBtn.disabled = false;

  resultBox.className = "error-state";

  resultBox.innerHTML = `
    <div class="error-box">
      <h2>Scan Failed</h2>
      <p>${message}</p>
    </div>
  `;
}

document.getElementById("usernameInput").addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    showUsername();
  }
});

document.addEventListener("mousemove", function(event) {
  document.body.style.setProperty("--mouseX", event.clientX + "px");
  document.body.style.setProperty("--mouseY", event.clientY + "px");
});