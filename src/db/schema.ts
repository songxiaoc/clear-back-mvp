import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const users = sqliteTable('users', {
  id: text('id').notNull().primaryKey(),
  name: text('name'),
  email: text('email').notNull().unique(),
  emailVerified: integer('emailVerified'),
  image: text('image'),
  credits: integer('credits').default(5).notNull(),
  createdAt: integer('createdAt').$defaultFn(() => Date.now()),
});

export const transactions = sqliteTable('transactions', {
  id: text('id').notNull().primaryKey(),
  userId: text('userId').notNull().references(() => users.id),
  type: text('type').notNull(),
  amount: integer('amount').notNull(),
  description: text('description'),
  createdAt: integer('createdAt').$defaultFn(() => Date.now()),
});
