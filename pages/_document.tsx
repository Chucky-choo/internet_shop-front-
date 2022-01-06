import Document, { Html, Head, Main, NextScript } from "next/document";
import PrimarySearchAppBar from "../components/Header";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { orange } from "@mui/material/colors";

declare module "@mui/material/styles" {
  interface Theme {
    status: {
      danger: string;
      dark: string;
    };
  }

  // allow configuration using `createTheme`
  interface ThemeOptions {
    status?: {
      danger?: string;
      dark?: string;
    };
  }
}

export const theme = createTheme({
  status: {
    danger: orange[500],
    dark: "linear-gradient(90deg, rgba(15,32,39,1) 0%, rgba(32,58,67,1) 50%, rgba(44,83,100,1) 100%)",
  },
  palette: {
    primary: {
      main: "rgba(0,4,12,0.87)",
    },
    secondary: {
      main: "rgba(36,183,36,0.87)",
    },
  },
});

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head />
        <ThemeProvider theme={theme}>
          <body>
            <Main />
            <NextScript />
          </body>
        </ThemeProvider>
      </Html>
    );
  }
}

export default MyDocument;
