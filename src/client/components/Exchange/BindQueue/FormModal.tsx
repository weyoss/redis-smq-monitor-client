import React, { useCallback, useEffect, useRef } from 'react';
import { IBindQueueProps } from './BindQueue';
import useQuery, { EQueryStatus, TQueryRequest } from '../../../hooks/useQuery';
import { Field, Form, Formik, FormikProps } from 'formik';
import { FormGroup, FormLabel, FormSelect, Spinner } from 'react-bootstrap';
import { FieldProps } from 'formik/dist/Field';
import Modal from '../../common/Modal';
import { IMessageQueue } from '../../../transport/http/api/common/IMessage';

interface IFormFields {
    queue: string;
}

interface IHandlerProps extends IBindQueueProps {
    RequestFactory: (queue: string) => TQueryRequest<void>;
    requestSuccessCallback: () => void;
    closeHandlerCallback: () => void;
    queues: IMessageQueue[];
    exchangeName: string;
}

const FormModal: React.FC<IHandlerProps> = ({ queues, RequestFactory, requestSuccessCallback, closeHandlerCallback }) => {
    const formRef = useRef<FormikProps<IFormFields> | null>(null);
    const query = useQuery();

    useEffect(() => {
        if (query.state.status === EQueryStatus.SUCCESS) {
            requestSuccessCallback();
            closeHandlerCallback();
        } else if (query.state.status === EQueryStatus.ERROR) {
            closeHandlerCallback();
        }
    }, [query.state.status]);

    const onSubmit = useCallback(() => {
        const form = formRef.current;
        if (form) {
            // Fixing submitForm bug (always get resolved when the form is invalid)
            // See formik/issues/1580
            form.submitForm()
                .then(form.validateForm)
                .then((errors) => {
                    if (!Object.keys(errors).length) {
                        query.sendQuery(RequestFactory(form.values.queue));
                    }
                })
                .catch((e) => {
                    console.log(e);
                });
        }
    }, []);

    const validateQueue = (key?: string): string | void => {
        if (!key || !key.length) {
            return 'Required'
        }
    };

    return (
        <Modal title={'Exchange queue binding'} onSubmit={onSubmit} onCancel={closeHandlerCallback}>
            {query.state.status === EQueryStatus.LOADING ? (
                <Spinner animation={'border'} />
            ) : (
                <Formik innerRef={formRef} initialValues={{ queue: '' }} onSubmit={() => void 0}>
                    {({ errors, touched }) => (
                        <Form id={'foo'}>
                            <Field
                                name={'queue'}
                                validate={validateQueue}
                                render={({ field }: FieldProps) => {
                                    return (
                                        <FormGroup className="mb-3">
                                            <FormLabel>Please select a queue</FormLabel>
                                            <FormSelect id={'queue'} {...field}>
                                                <option key={'queue-idx0'} />
                                                { queues.map((value, idx) => {
                                                    return <option key={`queue-idx-${idx+1}`} value={`${value.ns}@${value.name}`}>{value.ns}@{value.name}</option>
                                                }) }
                                            </FormSelect>
                                            {errors.queue && touched.queue && (
                                                <p className={'text-danger'}>{errors.queue}</p>
                                            )}
                                        </FormGroup>
                                    );
                                }}
                            />
                        </Form>
                    )}
                </Formik>
            )}
        </Modal>
    );
};

export default FormModal;
