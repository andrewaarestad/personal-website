/**
 * Type definitions for database models
 *
 * Note: These are stub types until Prisma client is generated.
 * Run `pnpm db:generate` in this package to generate the actual Prisma types.
 * Once generated, these will be automatically replaced by the Prisma-generated types.
 */

// Stub types - will be replaced by Prisma-generated types after running db:generate
export type User = {
  id: string;
  email: string;
  name: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export type Post = {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string | null;
  published: boolean;
  publishedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
  authorId: string;
};

// Useful type helpers for queries
export type UserWithPosts = User & {
  posts: Post[];
};

export type PostWithAuthor = Post & {
  author: User;
};

// Input types for creating/updating records
export type CreateUserInput = Omit<User, "id" | "createdAt" | "updatedAt">;
export type UpdateUserInput = Partial<Omit<User, "id" | "createdAt" | "updatedAt">>;
export type CreatePostInput = Omit<Post, "id" | "createdAt" | "updatedAt">;
export type UpdatePostInput = Partial<Omit<Post, "id" | "createdAt" | "updatedAt">>;
