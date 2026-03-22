export type Post = {
    id: number;
    title: string;
    content: string;
    image?: string;
    authorId: number;
    authorName: string;
    likesCount: number;
    likedByMe: boolean;
    createdAt: string;
}