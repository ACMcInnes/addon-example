"use client"

import { ThemeProvider as NextThemesProvider} from "next-themes";
type ThemeProviderProps = React.ComponentProps<typeof NextThemesProvider>;

export default function Providers ({ children, ...props}: { children: React.ReactNode, props: ThemeProviderProps }) {
  return (
    <NextThemesProvider {...props}>
      {children}
    </NextThemesProvider>
  );
}
