export interface User {
	owner_id?: string;
    user_name?: string;
	email?:string;
	password?:string;
	school_list?: string[];
	userOwned?: boolean;
}
