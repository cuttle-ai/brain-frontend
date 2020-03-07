/**
 * Column should implemented by any object that has the column information of a dataset
 */
export interface Column {
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
     * Name of the column
     */
    Name?: string;
    /**
     * Description of the column
     */
    Description?: string;
    /**
     * Dimension states whether the column is of type dimension
     */
    Dimension: boolean;
    /**
     * Measure states whether the column is of type measure
     */
    Measure: boolean;
    /**
     * AggregationFn to be used as default for the column
     */
    AggregationFn: string;
    /**
     * DataType of the column
     */
    DataType: string;
    /**
     * Word is the display name with which the column can be identified
     */
    Word: string;
}