const functions = require("firebase-functions");
const axios = require("axios");

exports.getGithubContributions = functions.https.onRequest(async (req, res) => {
  const token = functions.config().github.token;
  const username = req.query.username || "alisha-sapkal";

  const query = `
    query {
      user(login: "${username}") {
        contributionsCollection {
          contributionCalendar {
            weeks {
              contributionDays {
                date
                contributionCount
              }
            }
          }
        }
      }
    }
  `;

  try {
    const response = await axios.post(
      "https://api.github.com/graphql",
      { query },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const weeks = response.data.data.user.contributionsCollection.contributionCalendar.weeks;
    const contributions = weeks.flatMap((week) => week.contributionDays);

    res.status(200).json({ contributions });
  } catch (error) {
    console.error("Error fetching GitHub contributions:", error.message);
    res.status(500).json({ error: "Failed to fetch GitHub contributions" });
  }
});
