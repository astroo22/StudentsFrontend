export interface School{
    school_id: string;
    school_owner_id: string;
    school_name: string
    avg_gpa: number;        
	ranking: number;       
    professor_list: string[];
    class_list: string[];
    student_list: string[];
    userOwned?: boolean;
}
