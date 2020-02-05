/**
 * Profile should implemented by any object that has the profile information about the user
 */
export interface Profile {
    /**
     * ID is the unique id of the user
     */
    ID: number;
    /**
     * CreatedAt is the creation date
     */
    CreatedAt: Date;
    /**
     * UpdatedAt is the updated at date
     */
    UpdatedAt: Date;
    /**
     * DeletedAt is the deleted at date
     */
    DeletedAt: Date;
    /**
     * Email is the email of the signed in user
     */
    Email: string;
    /**
     * Name is the name of the user
     */
    Name: string;
    /**
     * Picture is the profile picture of the user
     */
    Picture: string;
    /**
     * Registered indicates that the user is registered or not
     */
    Registered: boolean;
}