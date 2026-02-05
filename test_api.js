


async function testApi() {
  try {
    const query = `
      query userProblems($username: String!) { 
        matchedUser(username: $username) { 
           problemsSolvedBeatsStats {
            difficulty
            percentage
           }
           submitStats {
            acSubmissionNum {
              difficulty
              count
              submissions
            }
            totalSubmissionNum {
              difficulty
              count
              submissions
            }
          }
        } 
      }
    `;
    
    const variables = { username: "DanielKaminsky" };

    console.log("Sending request to http://localhost:3000/api/leetcode...");
    const response = await fetch('http://localhost:3000/api/leetcode', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, variables })
    });

    console.log("Response Status:", response.status);
    const data = await response.json();
    console.log("Response Data:", JSON.stringify(data, null, 2));

  } catch (error) {
    console.error("Test Request Failed:", error);
  }
}

testApi();
