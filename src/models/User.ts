import { ObjectId } from "mongodb";

export interface User {
	id?: ObjectId;
	isActive?: boolean;
	username: string;
	password: string;
	email?: string;
	remember?: boolean;
	firstName?: string;
	lastName?: string;
	createdAt?: Date;
	createdBy?: string;
	updatedAt?: Date;
	updatedBy?: string;
}
