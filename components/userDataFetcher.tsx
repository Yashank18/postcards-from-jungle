import React, { useState } from 'react';
import { Input, Button, Stack, createStyles } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { IconAt } from '@tabler/icons-react';


const UserDataFetcher = (props: { onNext: () => void, setUser: (name: string) => void, handleOldUser: () => void }) => {
    const [key, setKey] = useState<string>('');
    const [objectData, setObjectData] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const { classes } = useStyles();
    const largerThanMd = useMediaQuery("(min-width: 768px)");

    const fetchObject = () => {
        if (!key) {
            setError('Please enter an object key.');
            return;
        }
        const data = localStorage.getItem('postcard-from-jungle');
        const jsonData = data ? JSON.parse(data) : null;
        props.setUser(key);
        if (jsonData && jsonData.user !== key) {
            handleNextClick();
            props.onNext();
            return;
        }
        else if (!jsonData) {
            props.onNext();
            return;
        } else {

            props.handleOldUser();
        }
    };

    const handleNextClick = () => {
        props.setUser(key);
        props.onNext();
    };

    return (
        <Stack style={{ display: 'flex' }}>
            <Input
                type="text"
                value={key}
                size='lg'
                onChange={(e) => setKey(e.target.value)}
                placeholder="Enter your twitter handle"
                className={classes.input}
                icon={<IconAt />}
            />
            {error && <div style={{ color: 'red' }}>{error}</div>}
            {objectData && (
                <div>
                    <h3>Object Data:</h3>
                    <pre>{objectData}</pre>
                </div>
            )}
            <Button onClick={fetchObject} size={largerThanMd ? "lg" : "md"}>Next</Button>
        </Stack>
    );
};

export default UserDataFetcher;

const useStyles = createStyles((theme) => ({
    input: {
        width: 400,
    },
}));