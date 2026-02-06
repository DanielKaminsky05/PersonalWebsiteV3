# Blog System

Your portfolio now has a complete blog system! Here's how to use it.

## Structure

```
content/blog/          # Your blog posts (MDX files)
app/blog/             # Blog pages
  ├── page.tsx        # Blog home (list of posts)
  └── [slug]/
      └── page.tsx    # Individual post pages
lib/blog.ts           # Helper functions
components/
  └── BlogPostCard.tsx # Post card component
```

## Writing a New Post

1. Create a new `.mdx` file in `content/blog/`:

```bash
content/blog/my-new-post.mdx
```

2. Add frontmatter at the top:

```mdx
---
title: "Your Post Title"
date: "2026-02-05"
excerpt: "A brief description of your post"
tags: ["Tag1", "Tag2", "Tag3"]
featured: false
---

# Your Post Title

Your content here...
```

3. Write your content using Markdown or MDX

## Features

### ✅ What's Included

- **Blog home page** at `/blog` with post grid
- **Individual post pages** at `/blog/[slug]`
- **Tag filtering** on the blog home page
- **Syntax highlighting** for code blocks
- **Reading time** calculation
- **SEO metadata** for each post
- **Responsive design** matching your portfolio
- **Smooth animations** on scroll

### 📝 Markdown Support

You can use all standard Markdown:

- Headings (`#`, `##`, `###`)
- **Bold** and *italic* text
- Links `[text](url)`
- Code blocks with syntax highlighting
- Lists (ordered and unordered)
- Blockquotes
- Tables
- Images

### 💻 Code Syntax Highlighting

Code blocks are automatically highlighted:

\`\`\`typescript
const greeting = "Hello, World!";
console.log(greeting);
\`\`\`

Supported languages: JavaScript, TypeScript, Python, Java, C++, and many more!

## Example Posts

I've created two example posts for you:

1. **building-my-portfolio.mdx** - About building your portfolio
2. **leetcode-journey.mdx** - About your LeetCode experience

Feel free to edit or delete these and add your own!

## URLs

- Blog home: `http://localhost:3000/blog`
- Example post: `http://localhost:3000/blog/building-my-portfolio`

## Tips

- Keep post slugs (filenames) lowercase with hyphens
- Use descriptive titles and excerpts for SEO
- Add 2-4 relevant tags per post
- Include code examples to showcase your skills
- Write in a conversational, authentic tone

Happy blogging! 🚀
