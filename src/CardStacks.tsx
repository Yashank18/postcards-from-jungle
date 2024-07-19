import React, { useState, useEffect } from 'react';
import { Card, Image, Group, Button } from '@mantine/core';
import { motion, AnimatePresence } from 'framer-motion';

const questions: string[] = [
    'Choose your favorite color:',
    'Choose your favorite animal:',
];

// Random image URLs for demonstration purposes
const choices: string[][] = [
    [
        'https://via.placeholder.com/100x100.png?text=Red',
        'https://via.placeholder.com/100x100.png?text=Blue',
    ],
    [
        'https://via.placeholder.com/100x100.png?text=Cat',
        'https://via.placeholder.com/100x100.png?text=Dog',
    ],
];

// Example quotes
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
    "You only live once, but if you do it right, once is enough."
];

const CardStack: React.FC = () => {
    const [currentCard, setCurrentCard] = useState<number>(0);
    const [selectedChoice, setSelectedChoice] = useState<number | null>(null);
    const [answers, setAnswers] = useState<(number | null)[]>(Array(questions.length).fill(null));
    const [loading, setLoading] = useState<boolean>(false);
    const [quoteIndex, setQuoteIndex] = useState<number>(0);

    useEffect(() => {
        let intervalId: ReturnType<typeof setInterval>;
        if (loading) {
            intervalId = setInterval(() => {
                setQuoteIndex(prev => (prev + 1) % quotes.length);
            }, 3000); // Change quote every 3 seconds
        }
        return () => clearInterval(intervalId);
    }, [loading]);

    const handleChoice = (choiceIndex: number) => {
        const newAnswers = [...answers];
        newAnswers[currentCard] = choiceIndex;
        setAnswers(newAnswers);

        if (currentCard < questions.length - 1) {
            setCurrentCard(prev => prev + 1);
            setSelectedChoice(null);
        } else {
            setLoading(true);
        }
    };

    const handlePrevious = () => {
        setCurrentCard(prev => prev - 1);
        setSelectedChoice(answers[currentCard - 1] ?? null);
    };

    return (
        <div style={{ position: 'relative', height: '300px', width: '400px' }}>
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
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '100%',
                                zIndex: 1,
                            }}
                        >
                            <Card shadow="sm" padding="lg" radius="md" style={{ backgroundColor: '#F4DEAA', height: '100%' }}>
                                <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between' }}>
                                    <Button
                                        variant="outline"
                                        onClick={handlePrevious}
                                        disabled={currentCard === 0}
                                    >
                                        Previous
                                    </Button>
                                    <h2>{questions[currentCard]}</h2>
                                    <div /> {/* Empty div for alignment */}
                                </div>
                                <Group position="center" spacing="md">
                                    {choices[currentCard].map((src, index) => (
                                        <Image
                                            key={index}
                                            src={src}
                                            width={100}
                                            height={100}
                                            fit="contain"
                                            style={{
                                                border: selectedChoice === index ? '2px solid black' : 'none',
                                                cursor: 'pointer',
                                            }}
                                            onClick={() => handleChoice(index)}
                                        />
                                    ))}
                                </Group>
                            </Card>
                        </motion.div>
                    )
                ) : (
                    <div
                        style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            minWidth: '40vw',
                            textAlign: 'center',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            fontSize: '18px',
                        }}
                    >
                        <div style={{ color: 'red', fontSize: '24px', marginRight: '10px' }}>
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
                                    style={{ color: 'black' }}
                                >
                                    {quotes[quoteIndex]}
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default CardStack;
