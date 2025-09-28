import { JWTPayload } from "jose";

export interface IResUser {
	id?: string; // thay thế cho _id
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

export interface IDecode extends JWTPayload {
	username: string;
	type: string;
	exp: number;
}
