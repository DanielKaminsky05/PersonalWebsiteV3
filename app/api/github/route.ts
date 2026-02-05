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

    // GraphQL query to fetch user stats
    const query = `
      query {
        viewer {
          login
          repositories(first: 100, ownerAffiliations: OWNER, privacy: PUBLIC) {
            totalCount
            nodes {
              name
              defaultBranchRef {
                target {
                  ... on Commit {
                    history {
                      totalCount
                    }
                  }
                }
              }
              languages(first: 10, orderBy: {field: SIZE, direction: DESC}) {
                edges {
                  size
                  node {
                    name
                  }
                }
              }
            }
          }
          contributionsCollection {
            contributionYears
          }
          followers {
            totalCount
          }
          following {
            totalCount
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
        { error: 'Failed to fetch GitHub data', details: data.errors },
        { status: 500 }
      );
    }

    const viewer = data.data.viewer;
    const repos = viewer.repositories.nodes;

    // Calculate total commits across all repositories
    let totalCommits = 0;
    repos.forEach((repo: any) => {
      if (repo.defaultBranchRef?.target?.history) {
        totalCommits += repo.defaultBranchRef.target.history.totalCount;
      }
    });

    // Calculate top languages by total size
    const languageSizes: Record<string, number> = {};
    repos.forEach((repo: any) => {
      repo.languages.edges.forEach((edge: any) => {
        const langName = edge.node.name;
        languageSizes[langName] = (languageSizes[langName] || 0) + edge.size;
      });
    });

    const topLanguages = Object.entries(languageSizes)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 3)
      .map(([name]) => name);

    // Calculate years active
    const contributionYears = viewer.contributionsCollection.contributionYears;
    const yearsActive = contributionYears.length;

    const stats = {
      repositories: viewer.repositories.totalCount,
      commits: totalCommits,
      yearsActive,
      topLanguages,
      followers: viewer.followers.totalCount,
      following: viewer.following.totalCount,
    };

    return NextResponse.json(stats);
  } catch (error) {
    console.error('Error fetching GitHub stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch GitHub stats' },
      { status: 500 }
    );
  }
}
