import React, { ChangeEvent } from 'react';
import { Alert, Form, Spinner } from 'react-bootstrap';
import { EQueryStatus, IQueryState } from '../../../../../hooks/useQuery';
import { EMessagePriority } from '../../../../../transport/http/api/common/IMessage';

interface IProps {
    messageId: string;
    messagePriority: EMessagePriority;
    onSelectPriority: (event: ChangeEvent<HTMLSelectElement>) => void;
    queryState: IQueryState<void>;
}

const FormBody: React.FC<IProps> = ({ messageId, messagePriority, onSelectPriority, queryState }) => {
    return (
        <>
            {queryState.status === EQueryStatus.LOADING ? (
                <Spinner animation={'border'} />
            ) : (
                <>
                    {queryState.errorMessage && <Alert variant={'danger'}>{queryState.errorMessage}</Alert>}

                    <Form.Group className="mb-3">
                        <Form.Label>Message ID</Form.Label>
                        <Form.Control id={'messageId'} type={'text'} value={messageId} readOnly={true} />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Select message priority</Form.Label>
                        <Form.Select
                            id={'messagePriority'}
                            aria-label="Select message priority"
                            onChange={onSelectPriority}
                            value={messagePriority}
                        >
                            <option value="7">Lowest</option>
                            <option value="6">Very Low</option>
                            <option value="5">Low</option>
                            <option value="4">Normal</option>
                            <option value="3">Above Normal</option>
                            <option value="2">High</option>
                            <option value="1">Very High</option>
                            <option value="0">Highest</option>
                        </Form.Select>
                    </Form.Group>
                </>
            )}
        </>
    );
};

export default FormBody;
