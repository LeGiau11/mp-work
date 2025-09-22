export interface User {
	id?: string;
	isActive?: boolean;
	username: string;
	password: string;
	remember?: boolean;
	firstName?: string;
	lastName?: string;
	createdAt?: Date;
	createdBy?: string;
	updatedAt?: Date;
	updatedBy?: string;
}
