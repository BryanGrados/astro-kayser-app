import { ColorSchemeProvider, MantineProvider } from "@mantine/core";
import { useHotkeys, useLocalStorage } from "@mantine/hooks";
import { NotificationsProvider } from "@mantine/notifications";
import { useEffect } from "react";
import App from "../app/App";

export default function MantineLayout() {
	const [colorScheme, setColorScheme] = useLocalStorage({
		key: "colorScheme",
		defaultValue: "light",
		getInitialValueInEffect: true,
	});

	useEffect(() => {
		document.body.classList.toggle("dark", colorScheme === "dark");
	}, [colorScheme]);

	const toggleColorScheme = () => {
		setColorScheme(colorScheme === "light" ? "dark" : "light");
	};

	useHotkeys([["mod+J", () => toggleColorScheme()]]);

	return (
		<ColorSchemeProvider
			colorScheme={colorScheme}
			toggleColorScheme={toggleColorScheme}
		>
			<MantineProvider theme={{ colorScheme }} withGlobalStyles>
				<NotificationsProvider>
					<App />
				</NotificationsProvider>
			</MantineProvider>
		</ColorSchemeProvider>
	);
}
