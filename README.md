# GitPulse

GitPulse is a futuristic GitHub Profile Analyzer that fetches real GitHub profile data and generates useful developer insights.

It helps users analyze any public GitHub profile by showing profile details, repository stats, GitPulse score, insights, and improvement suggestions.

A clean GitHub profile analyzer built using HTML, CSS, JavaScript, and GitHub API.

## Features

* Search any GitHub user by username
* Fetch real-time GitHub profile data using GitHub API
* Display profile image, name, bio, followers, following, and public repositories
* Show top repositories with language, stars, forks, and repo links
* Calculate GitPulse Score out of 100
* Show developer profile level
* Generate profile improvement suggestions
* Terminal-style loading animation
* Error handling for empty input and wrong usernames
* Futuristic hacker-themed responsive UI
* Mouse-reactive background effect

## Tech Stack

* HTML
* CSS
* JavaScript
* GitHub REST API

## How It Works

1. User enters a GitHub username.
2. GitPulse fetches profile data from GitHub API.
3. It fetches public repositories of that user.
4. It calculates total stars, total forks, most used language, and number of languages used.
5. It generates a GitPulse Score based on profile completeness and repository activity.
6. It displays suggestions to improve the GitHub profile.

## GitPulse Score Factors

The score is calculated using:

* GitHub bio availability
* Number of public repositories
* Followers count
* Total stars
* Total forks
* Number of languages used
* Number of repositories analyzed

## Project Structure

```text
GitPulse
├── index.html
├── style.css
└── script.js
```

## How to Run Locally

1. Download or clone this repository.
2. Open the project folder.
3. Open `index.html` in a browser.
4. Enter a GitHub username and click Analyze.

## Future Improvements

* Add contribution graph analysis
* Add repository README quality check
* Add profile comparison feature
* Add downloadable profile report
* Improve GitPulse score logic
* Add more advanced developer insights
