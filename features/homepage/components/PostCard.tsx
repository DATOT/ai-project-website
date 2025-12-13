// app/homepage/components/PostCard.tsx
import { PostType } from "@s/types/postType";
import ReactMarkdown from "react-markdown";

interface PostCardProps {
  post: PostType;
}

const PostCard = ({ post }: PostCardProps) => {
  return (
    <div
      className="card bg-base-100 w-full max-w-3xl rounded-2xl p-4 card-border cursor-pointer shadow-sm hover:shadow-lg transition-all duration-300"
      onClick={() => console.log("Card clicked:", post.getTitle())}
    >
      <div className="card-title font-bold text-lg truncate">{post.getTitle()}</div>
      <div className="divider my-1"></div>
      <div
        className="card-body prose max-h-60 overflow-y-auto text-gray-400"
      ><ReactMarkdown>{post.getRawBodyText()}</ReactMarkdown></div>

      <div className="flex items-center justify-between mt-4 text-gray-400 text-sm">
        <div className="flex items-center gap-4">
          <button
            className="flex items-center gap-1 px-2 py-1 rounded"
            onClick={(e) => { e.stopPropagation(); console.log("Upvote:", post.getTitle()); }}
          >
            ▲ <span>123</span>
          </button>
          <button
            className="flex items-center gap-1 px-2 py-1 rounded"
            onClick={(e) => { e.stopPropagation(); console.log("Downvote:", post.getTitle()); }}
          >
            ▼
          </button>
          <button
            className="px-2 py-1 rounded"
            onClick={(e) => { e.stopPropagation(); console.log("Reply to:", post.getTitle()); }}
          >
            Reply
          </button>
        </div>
        <button
          className="px-2 py-1 rounded"
          onClick={(e) => { e.stopPropagation(); console.log("More options for:", post.getTitle()); }}
        >
          ...
        </button>
      </div>
    </div>
  );
}

export default PostCard;
