import CardStack from "@/components/CardStack";
import LandingPage from "@/components/Landing";
import Postcard from "@/components/postcard";
import { Result } from "@/components/types";
import UserDataFetcher from "@/components/userDataFetcher";
import { Button, clsx, createStyles, Image, Stack } from "@mantine/core";
import { IconDownload } from "@tabler/icons-react";
import html2canvas from "html2canvas";
import { Manrope } from "next/font/google";
import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import { sql } from "@vercel/postgres";

export const font = Manrope({ subsets: ["latin"], weight: "400" });
export const fontBold = Manrope({ subsets: ["latin"], weight: "800" });

export default function Home() {
  const { classes } = useStyles();
  const [results, setResults] = useState<Result | null>(null);
  const [loading, setLoading] = useState(false);
  const [userName, setUserName] = useState("postcard");
  const postcardRef = useRef(null);
  const [currentPage, setCurrentPage] = useState("landing");

  const handleOldUser = () => {
    const data = localStorage.getItem("postcard-from-jungle");
    const jsonData = data ? JSON.parse(data) : null;
    if (jsonData) {
      setUserName(jsonData.user);
      setCurrentPage("results");
      setResults(jsonData.result);
    }
  };

  useEffect(() => {
    if (results) setCurrentPage("results");
  }, [results]);

  const handleResult = (answers: (number | null)[]) => {
    getResults(answers);
  };

  const setPostcardName = (name: string) => {
    setUserName(name);
  };

  const renderPage = () => {
    switch (currentPage) {
      case "landing":
        return <LandingPage onNext={() => setCurrentPage("twitter")} />;
      case "twitter":
        return (
          <UserDataFetcher
            onNext={() => setCurrentPage("questions")}
            setUser={setPostcardName}
            handleOldUser={() => handleOldUser()}
          />
        );
      case "questions":
        return <CardStack onFinish={handleResult} />;
      case "results":
        return (
          <Stack align="center" spacing={16}>
            <div ref={postcardRef}>
              <Postcard data={results!} userName={userName} />
            </div>
            <Button
              onClick={downloadImage}
              rightIcon={<IconDownload size={14} />}
            >
              Download postcard
            </Button>
          </Stack>
        );
    }
  };

  const getResults = async (answers: (number | null)[]) => {
    try {
      setLoading(true);
      const parsedAnswers = answers
        .map((answer, index) => `${index + 1}-${answer === 0 ? "A" : "B"}`)
        .join(", ");

      const response = await fetch("/api/results", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ answers: parsedAnswers }),
      });
      const data = await response.json();
      setResults(data.content);
      // set this result in local storage as well. Mapped with user name
      const dataToStore = {
        user: userName,
        result: data.content,
      };
      await sql`INSERT INTO postcard (user_name, answers ,result) VALUES (${userName}, (${parsedAnswers}), ${JSON.stringify(data.content)})`;
      localStorage.setItem("postcard-from-jungle", JSON.stringify(dataToStore));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const downloadImage = async () => {
    if (postcardRef.current) {
      const canvas = await html2canvas(postcardRef.current, {
        scale: 2,
      });
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      console.log(userName);
      link.download = `${userName}.png`;
      link.click();
    }
  };

  return (
    <>
      <Head>
        <title>Postcard</title>
        <meta name="Postcard From Jungle" content="Your spirit animal" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="https://i.ibb.co/XCtG67p/Remove-BG-Preview-July-25-Screenshot.png" />
      </Head>
      <main
        className={clsx(
          `${classes.root}`,
          `${font.className}`,
          `${fontBold.className}`
        )}
      >
        <div className={classes.background} draggable={false} />
        <Image
          className={classes.frontBottomLeftTopLeft}
          src={"/Artboard.png"}
          alt={"leaf"}
          draggable={false}
        />
        <Image
          className={classes.frontBottomRightBottomLeft}
          src={"/Artboard.png"}
          alt={"leaf"}
          draggable={false}
        />
        <Image
          className={classes.frontTopLeftTopRight}
          src={"/Artboard.png"}
          alt={"leaf"}
          draggable={false}
        />
        <Image
          className={classes.frontTopRightBottomRight}
          src={"/Artboard.png"}
          alt={"leaf"}
          draggable={false}
        />
        {renderPage()}
      </main>
    </>
  );
}

const useStyles = createStyles((theme) => ({
  root: {
    margin: "auto",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    width: "100vw",
    overflow: "hidden",
  },
  background: {
    position: "absolute",
    top: -200,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundImage: `url("/bg1.jpg")`,
    filter: "blur(0.5px) brightness(0.4) contrast(1.2)",
    zIndex: -1,
    // Center the background image
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  },
  frontBottomLeftTopLeft: {
    zIndex: 1,
    height: 10,
    position: "absolute",
    bottom: 150,
    left: -200,
    [theme.fn.largerThan("md")]: {
      top: "20%",
      bottom: "initial",
      left: -100,
      width: "40% !important",
      transform: "rotate(90deg)",
    },
    [theme.fn.largerThan("lg")]: {
      left: -100,
    },
  },
  frontBottomRightBottomLeft: {
    zIndex: 1,
    height: 10,
    position: "absolute",
    bottom: 150,
    right: -200,
    [theme.fn.largerThan("md")]: {
      top: "80%",
      bottom: "initial",
      left: -100,
      width: "40% !important",
      transform: "rotate(90deg)",
    },
    [theme.fn.largerThan("lg")]: {
      right: -100,
    },
  },
  frontTopLeftTopRight: {
    zIndex: 1,
    height: 10,
    position: "absolute",
    top: 150,
    left: -200,
    transform: "rotate(180deg)",
    [theme.fn.largerThan("md")]: {
      top: "20%",
      right: -100,
      bottom: "initial",
      left: "initial",
      width: "40% !important",
      transform: "rotate(270deg)",
    },
    [theme.fn.largerThan("lg")]: {
      right: -100,
    },
  },
  frontTopRightBottomRight: {
    zIndex: 1,
    height: 10,
    position: "absolute",
    top: 150,
    right: -200,
    transform: "rotate(180deg)",
    [theme.fn.largerThan("md")]: {
      top: "80%",
      right: -100,
      bottom: "initial",
      left: "initial",
      width: "40% !important",
      transform: "rotate(270deg)",
    },
    [theme.fn.largerThan("lg")]: {
      right: -100,
    },
  },
}));
