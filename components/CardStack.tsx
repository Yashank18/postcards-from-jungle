import React, { useState, useEffect } from 'react';
import { Card, Image, Group, Button } from '@mantine/core';
import { motion, AnimatePresence } from 'framer-motion';

const questions: string[] = [
    'Preferred Environment',
    'Reaction to Threat',
    'Social Preference',
    'Preferred Activity',
    'Reaction to Change',
];

const choices: string[][] = [
    [
        'https://png.pngtree.com/background/20230528/original/pngtree-the-sunlight-shines-through-a-dense-forest-picture-image_2783546.jpg',
        'https://static.thehosteller.com/blogimage/kh4-b53c67-1709522201645.jpg',
    ],
    [
        'https://www.yourtango.com/sites/default/files/image_blog/what-means-when-bird-flies-front-you.png',
        'https://www.snexplores.org/wp-content/uploads/2019/11/051618_SM_animal-weapon_feat.jpg',
    ],
    [
        'https://images.twinkl.co.uk/tw1n/image/private/t_630/u/ux/tiger-164905_ver_1.jpg',
        'https://t4.ftcdn.net/jpg/05/06/97/33/360_F_506973329_NCSJOKETJUZjIW8udBA5LWfZ9vep4kV1.jpg',
    ],
    [
        'https://cdn.britannica.com/97/92697-050-39C05D91/Lions-warthog.jpg',
        'https://media.istockphoto.com/id/1273321807/photo/african-giraffe-in-zambia.jpg?s=612x612&w=0&k=20&c=vfaZXl5MfhLvC3U-Nbmw6PScQaFNk1lbSlk_-h-1BiI=',
    ],
    [
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9FOEf8SjZCsQGO4_twThOpUM10zlZdo9mHA&s',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSI-pzdoPDq731FiO-LLn0BhHcw6zOrNJDN7A&s',
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
    "You only live once, but if you do it right, once is enough."
];

const CardStack = ({ onFinish }: { onFinish: (answers: (number | null)[]) => void }) => {
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
            onFinish(newAnswers);
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
                            <Card shadow="sm" padding="lg" radius="md" style={{ backgroundColor: '#F4DEAA', height: '100%', width: '40vw', left: '-100px' }}>
                                <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between' }}>
                                    <Button
                                        variant="outline"
                                        onClick={handlePrevious}
                                        disabled={currentCard === 0}
                                    >
                                        <img src='https://static.thenounproject.com/png/950132-200.png' height='30%' />
                                    </Button>
                                    <h2>{questions[currentCard]}</h2>
                                    <div /> {/* Empty div for alignment */}
                                </div>
                                <Group position="center" spacing="lg">
                                    {choices[currentCard].map((src, index) => (
                                        <Image
                                            key={index}
                                            src={src}
                                            fit="contain"
                                            style={{
                                                border: selectedChoice === index ? '3px solid black' : 'none',
                                                cursor: 'pointer',
                                                width: '30%',
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
