import { useState } from "react";
import "./App.css";
import { MantineProvider } from "@mantine/core";
import CardStack from "./CardStacks";
import LandingPage from "./LandingPage";
import S3ObjectFetcher from "./FindImage";

function App() {
	const [currentPage, setCurrentPage] = useState("landing");

	const renderPage = () => {
		switch (currentPage) {
			case "landing":
				return <LandingPage onNext={() => setCurrentPage("twitter")} />;
			case "twitter":
				return <S3ObjectFetcher onNext={() => setCurrentPage("questions")} />;
			case "questions":
				return <CardStack onNext={() => setCurrentPage("results")} />;
		}
	};
	return (
		<MantineProvider>
			{renderPage()}
		</MantineProvider>
	);
}

export default App;
