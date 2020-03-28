/**
 * App should implemented by any object that has the information of a user app
 */
export interface App {
    /**
     * ID is the unique id of the user
     */
    ID: number;
    /**
     * Name of the column
     */
    Name?: string;
    /**
     * Description of the column
     */
    Description?: string;
    /**
     * UserID of the user who created the app
     */
    UserID?: number;
    /**
     * AccessToken for the app
     */
    AccessToken: boolean;
    /**
     * Email associated with the app
     */
    Email: string;
    /**
     * UID unique identifier for the app
     */
    UID: string;
}