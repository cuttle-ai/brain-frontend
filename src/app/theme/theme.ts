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
     * PrimaryTextColor is the text color that should be used on the text that are appearing in the application
     */
    PrimaryTextColor: string;
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
    /**
     * ThemeShadow is the shadow to be given to the elements
     */
    ThemeShadow: string;
}

/**
 * DarkTheme is the theme that can used for black theme pages.
 * Pages like login page etc follow this theme.
 */
export class DarkTheme implements Theme {
    PrimaryBackgroundColor: string = '#3e0473';
    PrimaryForegroundColor: string = '#fff';
    PrimaryTextColor: string = '#fff';
    SecondaryBackgroundColor: string = '#320a94';
    SecondaryForegroundColor: string = '#fff';
    ThemeShadow: string = '0 0.5vw 1vw -0.5vw #fff';
}

/**
 * LighTheme is the theme that can used for light theme pages.
 * Pages like terms and condition page etc follow this theme.
 */
export class LightTheme implements Theme {
    PrimaryBackgroundColor: string = '#d0d0d0';
    PrimaryForegroundColor: string = '#fff';
    PrimaryTextColor: string = '#000';
    SecondaryBackgroundColor: string = '#000';
    SecondaryForegroundColor: string = '#fff';
    ThemeShadow: string = '0 0.5vw 1vw -0.5vw #000';
}