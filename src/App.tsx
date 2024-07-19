import "./App.css";
import { MantineProvider } from "@mantine/core";
import CardStack from "./CardStacks";

function App() {
	return (
		<MantineProvider>
			<div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
				<CardStack />
			</div>
		</MantineProvider>
	);
}

export default App;
