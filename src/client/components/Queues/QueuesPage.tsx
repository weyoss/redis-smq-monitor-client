import React from 'react';
import { IMessageQueue } from '../../transport/http/api/common/IMessage';
import { Badge, ListGroup } from 'react-bootstrap';
import DeleteQueue from './DeleteQueue/DeleteQueue';
import { Link } from 'react-router-dom';
import { queue } from '../../routes/routes';

interface IQueuesPageProps {
    queues: IMessageQueue[];
}


const QueuesPage: React.FC<IQueuesPageProps> = ({ queues }) => {
    if (!queues.length) {
        return <p>No queues found.</p>
    }
    return (
        <ListGroup as="ol" numbered>
            {
                queues.map((q, index) => {
                    return <ListGroup.Item
                        as="li"
                        className="d-flex justify-content-between align-items-start"
                        key={index}
                    >
                        <div className="ms-2 me-auto">
                            <Link to={queue.getLink({ namespace: q.ns, queueName: q.name })}>{q.ns}@{q.name}</Link>
                        </div>
                        <Badge bg="light" pill>
                            <DeleteQueue queue={q} />
                        </Badge>
                    </ListGroup.Item>

                })
            }
        </ListGroup>
    )
}


export default QueuesPage;