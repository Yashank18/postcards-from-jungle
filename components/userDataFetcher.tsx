import React, { useState } from 'react';
import { Input, Button } from '@mantine/core';


const UserDataFetcher = (props: { onNext: () => void, setUser: (name: string) => void, handleOldUser: () => void }) => {
    const [key, setKey] = useState<string>('');
    const [objectData, setObjectData] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

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
        <div style={{ display: 'flex' }}>
            <Input
                type="text"
                value={key}
                onChange={(e) => setKey(e.target.value)}
                placeholder="Enter your twitter handle"
            />
            {/* <button onClick={fetchObject}>Fetch Object</button> */}

            {error && <div style={{ color: 'red' }}>{error}</div>}
            {objectData && (
                <div>
                    <h3>Object Data:</h3>
                    <pre>{objectData}</pre>
                </div>
            )}
            <Button onClick={() => fetchObject()}>Next</Button>
        </div>
    );
};

export default UserDataFetcher;