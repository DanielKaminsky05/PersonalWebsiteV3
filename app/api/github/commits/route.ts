import { NextResponse } from 'next/server';

const GITHUB_GRAPHQL_URL = 'https://api.github.com/graphql';

export async function GET() {
  try {
    const token = process.env.GITHUB_TOKEN;
    
    if (!token) {
      return NextResponse.json(
        { error: 'GitHub token not configured' },
        { status: 500 }
      );
    }

    // GraphQL query to fetch recent commits
    const query = `
      query {
        viewer {
          contributionsCollection {
            commitContributionsByRepository(maxRepositories: 5) {
              repository {
                name
                owner {
                  login
                }
              }
              contributions(first: 10) {
                nodes {
                  commitCount
                  occurredAt
                  commitDetails: commitCount
                }
              }
            }
          }
          repositories(first: 5, orderBy: {field: PUSHED_AT, direction: DESC}, ownerAffiliations: OWNER) {
            nodes {
              name
              defaultBranchRef {
                target {
                  ... on Commit {
                    history(first: 20) {
                      nodes {
                        message
                        committedDate
                        additions
                        deletions
                        repository {
                          name
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    `;

    const response = await fetch(GITHUB_GRAPHQL_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
    });

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.statusText}`);
    }

    const data = await response.json();

    if (data.errors) {
      console.error('GitHub GraphQL errors:', data.errors);
      return NextResponse.json(
        { error: 'Failed to fetch GitHub commits', details: data.errors },
        { status: 500 }
      );
    }

    const viewer = data.data.viewer;
    const repos = viewer.repositories.nodes;

    // Collect all commits from recent repositories
    const commits: any[] = [];
    repos.forEach((repo: any) => {
      if (repo.defaultBranchRef?.target?.history?.nodes) {
        repo.defaultBranchRef.target.history.nodes.forEach((commit: any) => {
          commits.push({
            message: commit.message,
            date: commit.committedDate,
            repository: repo.name,
            additions: commit.additions,
            deletions: commit.deletions,
          });
        });
      }
    });

    // Sort by date and take the most recent 20
    commits.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    const recentCommits = commits.slice(0, 20);

    return NextResponse.json(recentCommits);
  } catch (error) {
    console.error('Error fetching GitHub commits:', error);
    return NextResponse.json(
      { error: 'Failed to fetch GitHub commits' },
      { status: 500 }
    );
  }
}
