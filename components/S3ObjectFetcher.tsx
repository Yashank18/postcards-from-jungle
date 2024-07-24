import React, { useState } from 'react';
import { Input, Button } from '@mantine/core';
// import AWS from 'aws-sdk';

// Configure AWS SDK using environment variables
// AWS.config.update({
//     region: import.meta.env.VITE_AWS_REGION,
//     credentials: new AWS.CognitoIdentityCredentials({
//         IdentityPoolId: import.meta.env.VITE_COGNITO_IDENTITY_POOL_ID,
//     }),
// });

// const s3 = new AWS.S3();

// Type for the response from S3 getObject
// interface S3ObjectData {
//     Body: Buffer;
// }

const S3ObjectFetcher = (props: { onNext: () => void, setUser: (name: string) => void }) => {
    const [key, setKey] = useState<string>('');
    const [objectData, setObjectData] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const fetchObject = () => {
        if (!key) {
            setError('Please enter an object key.');
            return;
        }

        // const params: AWS.S3.GetObjectRequest = {
        //     Bucket: import.meta.env.VITE_S3_BUCKET_NAME as string,
        //     Key: key,
        // };

        // s3.getObject(params, (err: AWS.AWSError, data: AWS.S3.GetObjectOutput) => {
        //     if (err) {
        //         if (err.code === 'NoSuchKey') {
        //             setError('Object not found.');
        //             setObjectData(null);
        //         } else {
        //             setError('An error occurred.');
        //             setObjectData(null);
        //         }
        //     } else {
        //         setObjectData((data.Body as Buffer).toString('utf-8')); // Assuming the object is a text file
        //         setError(null);
        //     }
        // });
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
            <Button onClick={() => handleNextClick()}>Next</Button>
        </div>
    );
};

export default S3ObjectFetcher;