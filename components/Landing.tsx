// basic React page with a title in center and a button

import React from 'react';
import { Container, Button } from '@mantine/core';

export default function LandingPage(props: { onNext: () => void }) {
    return (
        <Container size="md" style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>Ready to find your spirit animal?</h1>
            <Button color="green" size="xl" style={{ marginTop: '20px' }} onClick={props.onNext}>
                Find your tribe
            </Button>
        </Container>
    );
}