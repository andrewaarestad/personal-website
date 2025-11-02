import type { Prisma } from "@prisma/client";

// Re-export commonly used Prisma types
export type { User, Post } from "@prisma/client";

// Useful type helpers for Prisma queries
export type UserWithPosts = Prisma.UserGetPayload<{
  include: { posts: true };
}>;

export type PostWithAuthor = Prisma.PostGetPayload<{
  include: { author: true };
}>;

// Input types for creating/updating records
export type CreateUserInput = Prisma.UserCreateInput;
export type UpdateUserInput = Prisma.UserUpdateInput;
export type CreatePostInput = Prisma.PostCreateInput;
export type UpdatePostInput = Prisma.PostUpdateInput;
