import React, { useCallback, useEffect, useRef } from 'react';
import useQuery, { EQueryStatus, TQueryRequest } from '../../../hooks/useQuery';
import { Field, Form, Formik, FormikProps } from 'formik';
import { FormControl, FormGroup, FormLabel, Spinner, FormSelect } from 'react-bootstrap';
import { FieldProps } from 'formik/dist/Field';
import Modal from '../../common/Modal';
import { IMessageQueue } from '../../../transport/http/api/common/IMessage';
import { EQueueType } from '../../../transport/websocket/streams/websocketMainStream';

interface IFormFields {
    ns: string;
    name: string;
    type: number;
}

interface IFormModalProps {
    RequestFactory: (queue: IMessageQueue, type: number) => TQueryRequest<void>;
    requestSuccessCallback: () => void;
    closeHandlerCallback: () => void;
    onSubmitCallback: (values: any) => void;
}

const FormModal: React.FC<IFormModalProps> = ({ RequestFactory, requestSuccessCallback, closeHandlerCallback }) => {
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
                        query.sendQuery(RequestFactory({ ns: form.values.ns, name: form.values.name }, Number(form.values.type)));
                    }
                })
                .catch((e) => {
                    console.log(e);
                });
        }
    }, []);

    const validateName =  (key?: string): string | void => {
        if (!key || !key.length) {
            return 'Required'
        }
        const filtered = key
            .toLowerCase()
            .replace(/(?:[a-z][a-z0-9]?)+(?:[-_.]?[a-z0-9])*/, '');
        if (filtered.length) {
            return 'Valid characters are letters (a-z) and numbers (0-9). (-_) are allowed between alphanumerics. Use a dot (.) to denote hierarchies.';
        }
    };

    const validateNs = (key?: string): string | void => {
        if (key && key.length) {
            const lcKey = key.toLowerCase();
            if (lcKey === 'global') {
                return 'You can not use [global] as a namespace';
            }
            const v = validateName(lcKey);
            if (v) return v;
        }
    }

    const validateType = (key?: string): string | void => {
        if (![0,1,2].includes(Number(key))) {
            return 'Required'
        }
    };

    return (
        <Modal title={'Create a queue'} onSubmit={onSubmit} onCancel={closeHandlerCallback}>
            {query.state.status === EQueryStatus.LOADING ? (
                <Spinner animation={'border'} />
            ) : (
                <Formik innerRef={formRef} initialValues={{ name: '', ns: '', type: 1 }} onSubmit={() => void 0}>
                    {({ errors, values, touched, setFieldValue }) => (
                        <Form id={'foo'}>
                            <Field
                                name={'name'}
                                validate={validateName}
                                render={({ field }: FieldProps) => {
                                    return (
                                        <FormGroup className="mb-3">
                                            <FormLabel>Queue name</FormLabel>
                                            <FormControl id={'name'} type={'text'} {...field} />
                                            {errors.name && touched.name && (
                                                <p className={'text-danger'}>{errors.name}</p>
                                            )}
                                        </FormGroup>
                                    );
                                }}
                            />

                            <Field
                                name={'ns'}
                                validate={validateNs}
                                render={({ field }: FieldProps) => {
                                    return (
                                        <FormGroup className="mb-3">
                                            <FormLabel>Namespace (optional)</FormLabel>
                                            <FormControl id={'ns'} type={'text'} {...field} />
                                            {errors.ns && touched.ns && (
                                                <p className={'text-danger'}>{errors.ns}</p>
                                            )}
                                        </FormGroup>
                                    );
                                }}
                            />

                            <Field
                                name={'type'}
                                validate={validateType}
                                render={({ field }: FieldProps) => {
                                    return (
                                        <FormGroup className="mb-3">
                                            <FormLabel>Queue type</FormLabel>
                                            <FormSelect id={'type'} {...field}>
                                                <option value={-1} />
                                                <option value={EQueueType.LIFO_QUEUE}>LIFO Queue</option>
                                                <option value={EQueueType.FIFO_QUEUE}>FIFO Queue</option>
                                                <option value={EQueueType.PRIORITY_QUEUE}>Priority Queue</option>
                                            </FormSelect>
                                            {errors.type && touched.type && (
                                                <p className={'text-danger'}>{errors.type}</p>
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
