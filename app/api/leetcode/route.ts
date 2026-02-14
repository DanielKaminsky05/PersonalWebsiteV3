
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { query, variables } = body;

    const response = await fetch('https://leetcode.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Referer': 'https://leetcode.com',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      },
      body: JSON.stringify({ query, variables }),
    });

    const data = await response.json();
    
    // Log error if LeetCode returns errors structure
    if (data.errors) {
       console.error("API Proxy: LeetCode GraphQL errors", data.errors);
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching data from LeetCode:', error);
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}
