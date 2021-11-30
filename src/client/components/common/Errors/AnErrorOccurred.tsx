import React from 'react';
import exclamation from './exclamation-circle-fill.svg';
import { Container } from 'react-bootstrap';

const AnErrorOccurred: React.FC<{ message?: string }> = ({ message }) => {
    return (
        <Container className={'text-center alert alert-secondary p-4'}>
            <h3 className={'display-6'}>An HTTP error occurred</h3>
            {message && <p>{message}</p>}
            <p>
                <img src={exclamation} alt="An error errored" width="200" height="200" className={'mx-auto'} />
            </p>
        </Container>
    );
};

export default AnErrorOccurred;
