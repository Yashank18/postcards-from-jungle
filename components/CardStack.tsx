import React, { useState, useEffect } from "react";
import { Card, Image, Group, Button, Text, Center, Stack, Flex, Box, createStyles } from "@mantine/core";
import { motion, AnimatePresence } from "framer-motion";

const questions: string[] = [
  "Preferred Environment",
  "Reaction to Threat",
  "Social Preference",
  "Preferred Activity",
  "Reaction to Change",
];

const choices: string[][] = [
  ["/questions/1-A.webp", "/questions/1-B.webp"],
  ["/questions/2-A.webp", "/questions/2-B.webp"],
  ["/questions/3-A.webp", "/questions/3-B.webp"],
  ["/questions/4-A.webp", "/questions/4-B.webp"],
  [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9FOEf8SjZCsQGO4_twThOpUM10zlZdo9mHA&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSI-pzdoPDq731FiO-LLn0BhHcw6zOrNJDN7A&s",
  ],
];

const quotes: string[] = [
  "The jungle is alive. It has a soul and senses.",
  "In the jungle, the mighty jungle, the lion sleeps tonight.",
  "The forest makes your heart gentle. You become one with it. No place for greed or anger there.",
  "In the jungle, life and death are one thread, the same line viewed from different sides.",
  "The jungle teaches you to adapt and survive.",
  "To walk in nature is to witness a thousand miracles.",
  "The wilderness holds answers to more questions than we have yet learned to ask.",
  "Saving the rainforest is not an option, it’s a necessity.",
  "The jungle is my home, and it gives me everything I need.",
  "In the silence of the jungle, we find our true selves.",
  "The earth has music for those who listen.",
  "To protect the jungle is to protect life itself.",
  "Nature does not hurry, yet everything is accomplished.",
  "The forest is a quiet place if only the best birds sing.",
  "Every leaf in the jungle is a work of art."
];

const CardStack = ({
  onFinish,
}: {
  onFinish: (answers: (number | null)[]) => void;
}) => {
  const [currentCard, setCurrentCard] = useState<number>(0);
  const [selectedChoice, setSelectedChoice] = useState<number | null>(null);
  const [answers, setAnswers] = useState<(number | null)[]>(
    Array(questions.length).fill(null)
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [quoteIndex, setQuoteIndex] = useState<number>(0);
  const { classes } = useStyles();

  useEffect(() => {
    let intervalId: ReturnType<typeof setInterval>;
    if (loading) {
      intervalId = setInterval(() => {
        setQuoteIndex((prev) => (prev + 1) % quotes.length);
      }, 3000); // Change quote every 3 seconds
    }
    return () => clearInterval(intervalId);
  }, [loading]);

  const handleChoice = (choiceIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[currentCard] = choiceIndex;
    setAnswers(newAnswers);

    if (currentCard < questions.length - 1) {
      setCurrentCard((prev) => prev + 1);
      setSelectedChoice(null);
    } else {
      setLoading(true);
      onFinish(newAnswers);
    }
  };

  const handlePrevious = () => {
    setCurrentCard((prev) => prev - 1);
    setSelectedChoice(answers[currentCard - 1] ?? null);
  };

  return (
    <Flex align={'center'} justify={'center'} h={'60%'}>
      <AnimatePresence>
        {!loading ? (
          currentCard < questions.length && (
            <motion.div
              key={currentCard}
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -100 }}
              transition={{ duration: 0.5 }}
              className={classes.motionDiv}
            >
              <Box h='100%' w={'80%'}>
                <Card
                  shadow="sm"
                  padding="lg"
                  radius="md"
                  style={{
                    backgroundColor: "#F4DEAA",
                    height: "100%",
                    width: "100%",
                  }}
                >
                  <Stack>
                    <Center>
                      <Text style={{ fontSize: 20, textAlign: 'center', letterSpacing: -1 }}>
                        Choose the image which appeals to you the most?
                      </Text>
                    </Center>
                    <Group position="center" spacing="lg">
                      {choices[currentCard].map((src, index) => (
                        <Image
                          key={index}
                          src={src}
                          alt={questions[currentCard]}
                          fit="cover"
                          style={{
                            border:
                              selectedChoice === index
                                ? "3px solid black"
                                : "none",
                            cursor: "pointer",
                            // width: "50%",
                          }}
                          width={300}
                          height={200}
                          onClick={() => handleChoice(index)}
                        />
                      ))}
                    </Group>
                  </Stack>
                </Card>
              </Box>
            </motion.div>
          )
        ) : (
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              minWidth: "40vw",
              textAlign: "center",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "18px",
              }}
            >
            <div style={{ flex: 1 }}>
              <AnimatePresence>
                <motion.div
                  key={quoteIndex}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 0.5, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 1 }}
                  style={{ color: "black" }}
                >
                    <div style={{ color: 'white' }}>{quotes[quoteIndex]}</div>

                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        )}
      </AnimatePresence>
    </Flex>
  );
};
const useStyles = createStyles((theme) => ({
  motionDiv: {
    position: "absolute",
    top: '20%',
    left: '30%',
    zIndex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    // for mobile screen
    "@media (max-width: 768px)": {
      top: '20%',
      left: '0%',
    },
  }
}));

export default CardStack;
