/**
 * Profile should implemented by any object that has the profile information about the user
 */
export interface Profile {
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
    /**
     * LastSeen is the last seen time of the user
     */
    LastSeen: Date;
    /**
     * LastSynced is the last synced time of the user's profile
     */
    LastSynced: Date;
}