import Head from "next/head";
import { Inter } from "next/font/google";
import { useState, useRef } from "react";
import { Button, clsx, createStyles } from "@mantine/core";
import { Result } from "@/components/types";
import Postcard from "@/components/postcard";
import CardStack from "@/components/CardStack";
import html2canvas from "html2canvas";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { classes } = useStyles();
  const [results, setResults] = useState<Result | null>(null);
  const [loading, setLoading] = useState(false);
  const postcardRef = useRef(null);

  const getResults = async (answers: (number | null)[]) => {
    try {
      setLoading(true);
      const parsedAnswers = answers
        .map((answer, index) => `${index + 1}-${answer === 0 ? 'A' : 'B'}`)
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
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const downloadImage = async () => {
    if (postcardRef.current) {
      const canvas = await html2canvas(postcardRef.current);
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = "postcard.png";
      link.click();
    }
  };

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={clsx(`${classes.root}`, `${inter.className}`)}>
        {!results ? <CardStack onFinish={getResults} /> : null}
        {results && (
          <div>
            <div ref={postcardRef}>
              <Postcard data={results} />
            </div>
            <Button onClick={downloadImage}>Download Image</Button>
          </div>
        )}
      </main>
    </>
  );
}

const useStyles = createStyles((theme) => ({
  root: {
    margin: "auto",
    width: "50%",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
}));
