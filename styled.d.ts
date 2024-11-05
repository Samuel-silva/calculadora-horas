import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      primary: string;
      secondary: string;
      success: string;
      danger: string;
      warnig: string;
      info: string;
      light: string;
      dark: string;
    };
  }
}
