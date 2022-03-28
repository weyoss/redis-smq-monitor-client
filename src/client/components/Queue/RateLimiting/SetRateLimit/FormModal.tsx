import React, { useCallback, useEffect, useRef } from 'react';
import { ISetQueueRateLimitProps } from './SetRateLimit';
import useQuery, { EQueryStatus } from '../../../../hooks/useQuery';
import Modal from '../../../common/Modal';
import { Field, Form, Formik, FormikProps } from 'formik';
import { FormControl, FormGroup, FormLabel, Spinner } from 'react-bootstrap';
import { FieldProps } from 'formik/dist/Field';

interface IFormFields {
    interval: string;
    limit: string;
}

interface IHandlerProps extends ISetQueueRateLimitProps {
    closeHandlerCallback: () => void;
    onSubmitCallback: (values: any) => void;
}

const FormModal: React.FC<IHandlerProps> = ({ RequestFactory, requestSuccessCallback, closeHandlerCallback }) => {
    const formRef = useRef<FormikProps<IFormFields>>(null);
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
                        query.sendQuery(RequestFactory(Number(form.values.limit), Number(form.values.interval)));
                    }
                })
                .catch((e) => {
                    console.log(e);
                });
        }
    }, []);

    const validateInterval = (interval: string): string | void => {
        if (!interval) {
            return 'Required';
        }
        const intervalValue = Number(interval);
        if (isNaN(intervalValue) || intervalValue < 1000) {
            return 'Interval must be greater than or equal to 1000';
        }
    };

    const validateLimit = (limit: string): string | void => {
        if (!limit) {
            return 'Required';
        }
        const limitValue = Number(limit);
        if (isNaN(limitValue) || limitValue < 1) {
            return 'Limit must be greater than or equal to 1';
        }
    };

    return (
        <Modal title={'Queue Rate Limiting'} onSubmit={onSubmit} onCancel={closeHandlerCallback}>
            {query.state.status === EQueryStatus.LOADING ? (
                <Spinner animation={'border'} />
            ) : (
                <Formik innerRef={formRef} initialValues={{ interval: '', limit: '' }} onSubmit={() => void 0}>
                    {({ errors, touched }) => (
                        <Form id={'foo'}>
                            <Field
                                name={'limit'}
                                validate={validateLimit}
                                render={({ field }: FieldProps) => {
                                    return (
                                        <FormGroup className="mb-3">
                                            <FormLabel>Limit</FormLabel>
                                            <FormControl id={'limit'} type={'text'} {...field} />
                                            {errors.limit && touched.limit && (
                                                <p className={'text-danger'}>{errors.limit}</p>
                                            )}
                                        </FormGroup>
                                    );
                                }}
                            />

                            <Field
                                name={'interval'}
                                validate={validateInterval}
                                render={({ field }: FieldProps) => {
                                    return (
                                        <FormGroup className="mb-3">
                                            <FormLabel>Interval</FormLabel>
                                            <FormControl
                                                id={'interval'}
                                                aria-label="Enter rate limit"
                                                type={'text'}
                                                {...field}
                                            />
                                            {errors.interval && touched.interval && (
                                                <p className={'text-danger'}>{errors.interval}</p>
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
