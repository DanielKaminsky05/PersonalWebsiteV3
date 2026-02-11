import { getAllPosts } from "@/lib/blog";
import HomeWrapper from "@/components/home/HomeWrapper";

export default function Home() {
  const posts = getAllPosts();

  return (
    <HomeWrapper posts={posts} />
  );
}
