import { RouterProvider } from "react-router";
import { router } from "./routes";
import { Toaster } from 'sonner'
import { ThemeProvider } from "./components/theme/theme-provider";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/react-query";

export function App() {
  return (
    <>
      <ThemeProvider storageKey="optimi-dash" defaultTheme="dark">
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router}/>
          <Toaster richColors/>
        </QueryClientProvider>
      </ThemeProvider>
    </>
  )
}