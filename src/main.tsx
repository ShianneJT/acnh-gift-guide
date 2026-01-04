import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Provider } from "@/components/ui/provider";
import { Theme } from "@chakra-ui/react";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<Provider defaultTheme="dark">
			<Theme colorPalette="purple">
				<App />
			</Theme>
		</Provider>
	</StrictMode>
);
