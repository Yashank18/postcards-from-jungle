import React from 'react';
import { Container, Button, Text, Paper, Group } from '@mantine/core';
import AWS from 'aws-sdk';
import { captureDivAsImage } from './util'; // Adjust the path as necessary

// Update AWS SDK configuration with your credentials
AWS.config.update({
    accessKeyId: 'YOUR_ACCESS_KEY_ID',
    secretAccessKey: 'YOUR_SECRET_ACCESS_KEY',
    region: 'YOUR_REGION',
});

const s3 = new AWS.S3();

const uploadImageToS3 = (blob: Blob, bucketName: string, key: string): Promise<AWS.S3.ManagedUpload.SendData> => {
    const params: AWS.S3.PutObjectRequest = {
        Bucket: bucketName,
        Key: key,
        Body: blob,
        ContentType: 'image/png', // Or the appropriate MIME type of your image
    };

    return s3.upload(params).promise();
};

const downloadImage = (blob: Blob, filename: string) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
};

const Postcard: React.FC = () => {
    const handleCaptureAndSave = async () => {
        try {
            const blob = await captureDivAsImage('myDivId');

            // Upload to S3
            const result = await uploadImageToS3(blob, 'my-bucket-name', 'my-image.png');
            console.log('Upload successful:', result);

            // Download locally
            downloadImage(blob, 'my-image.png');
        } catch (error) {
            console.error('Error capturing, uploading, or downloading image:', error);
        }
    };

    return (
        <Container size="md" p="xl">
            <Paper p="md" shadow="xs" style={{ textAlign: 'center' }}>
                <div id="myDivId" style={{ padding: '20px', borderRadius: '8px', background: '#f5f5f5' }}>
                    <img src="your-image-source" alt="Example" style={{ maxWidth: '100%', borderRadius: '8px' }} />
                    <Text size="lg" weight={500} style={{ marginTop: '10px' }}>
                        Your text here
                    </Text>
                </div>
                <Group position="center" style={{ marginTop: '20px' }}>
                    <Button onClick={handleCaptureAndSave} color="blue">
                        Save Postcard
                    </Button>
                </Group>
            </Paper>
        </Container>
    );
};

export default Postcard;
