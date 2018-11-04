/**
 * Theme has to be implmented by the object that provides a theme for the application
 */
export interface Theme {
    /*
     * PrimaryBackgroundColor is the main background color of the theme
     */
    PrimaryBackgroundColor: string;
    /**
     * PrimaryForegroundColor is the primary foreground color.
     * For text and other elements coming directly appearing over the background will be following
     * the primary foreground color
     */
    PrimaryForegroundColor: string;
    /**
     * SecondaryBackgroundColor is the secondary backgournd color is the fill color for the
     * elements coming directly above the primary foreground elements.
     */
    SecondaryBackgroundColor: string;
    /**
     * SecondaryForegroundColor is the foreground like border, text inside secondary items etc to differentiate between the primary foreground
     * and secondary backround 
     */
    SecondaryForegroundColor: string;
}

/**
 * DarkTheme is the theme that can used for black theme pages.
 * Pages like login page etc follow this theme.
 */
export class DarkTheme implements Theme {
    PrimaryBackgroundColor: string = '#000';
    PrimaryForegroundColor: string = '#fff';
    SecondaryBackgroundColor: string = '#353535';
    SecondaryForegroundColor: string = '#fff';
}