/**
 * FileUpload should implemented by any object that has the file upload information
 */
export interface FileUpload {
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
     * UserID is the id of the user who uploaded the file
     */
    UserID: string;
    /**
     * Status is the status of the uploaded dataset
     */
    Status: string;
    /**
     * Type of the uploaded file source
     */
    Type: string;
}

/**
 * FileSources has the map fo supported file sources
 */
export const FileSources = {
    CSV: {
        name: 'CSV',
        description: 'Comma separated files',
        icon: 'fa fa-file',
        tags: ['file', 'csv'],
        acceptedFileTypes: '.csv',
    }
}

/**
 * FileUploadError should implemented by any object that has the file upload error information
 */
export interface FileUploadError {
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
     * FileUploadID is the id of the fileupload to which error belongs to
     */
    FileUploadID: number;
    /**
     * Error is the error associated
     */
    Error: string;
}