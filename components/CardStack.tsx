import React, { useState, useEffect } from "react";
import { Card, Image, Group, Button, Text, Center, Stack, Flex, Box } from "@mantine/core";
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
  "The best way to predict the future is to invent it.",
  "Life is what happens when you're busy making other plans.",
  "The only limit to our realization of tomorrow is our doubts of today.",
  "Do not wait to strike till the iron is hot, but make it hot by striking.",
  "It does not do to dwell on dreams and forget to live.",
  "The purpose of our lives is to be happy.",
  "You have within you right now, everything you need to deal with whatever the world can throw at you.",
  "The only impossible journey is the one you never begin.",
  "In three words I can sum up everything I've learned about life: it goes on.",
  "To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment.",
  "The greatest glory in living lies not in never falling, but in rising every time we fall.",
  "The way to get started is to quit talking and begin doing.",
  "Success is not final, failure is not fatal: It is the courage to continue that counts.",
  "Life is short, and it is up to you to make it sweet.",
  "You only live once, but if you do it right, once is enough.",
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
              style={{
                position: "absolute",
                top: '20%',
                left: '30%',
                zIndex: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
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
            <div
              style={{ color: "red", fontSize: "24px", marginRight: "10px" }}
            >
              Do you know?
            </div>
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
                  {quotes[quoteIndex]}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        )}
      </AnimatePresence>
    </Flex>
  );
};

export default CardStack;
