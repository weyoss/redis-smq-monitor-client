import React from 'react';
import { RouteComponentProps } from 'react-router';
import { IProducerRouteParams } from '../../routes/routes/producer';

const Producer: React.FC<RouteComponentProps<IProducerRouteParams>> = ({ match }) => {
    const { producerId } = match.params;
    return <h1 className={'display-4'}>Producer ID {producerId}</h1>;
};

export default Producer;
