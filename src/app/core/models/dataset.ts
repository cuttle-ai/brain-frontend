/**
 * Dataset should implemented by any object that has the dataset information
 */
export interface Dataset {
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
     * Name of the file
     */
    Name: string;
    /**
     * Description of the dataset
     */
    Description: string;
    /**
     * UserID is the id of the user who uploaded the file
     */
    UserID: string;
    /**
     * ResourceID is the id of the source associated with
     */
    ResourceID: number;
    /**
     * Source is the type of the dataset source
     */
    Source: string;
    /**
     * UploadedDataset has the more info about the dataset source
     */
    UploadedDataset: any;
}