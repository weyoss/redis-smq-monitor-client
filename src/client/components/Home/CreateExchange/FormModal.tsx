import React, { useCallback, useEffect, useRef } from 'react';
import { ICreateExchangeProps } from './CreateExchange';
import useQuery, { EQueryStatus } from '../../../hooks/useQuery';
import { Field, Form, Formik, FormikProps } from 'formik';
import { FormControl, FormGroup, FormLabel, Spinner } from 'react-bootstrap';
import { FieldProps } from 'formik/dist/Field';
import Modal from '../../common/Modal';

interface IFormFields {
    exchangeName: string;
}

interface IHandlerProps extends ICreateExchangeProps {
    closeHandlerCallback: () => void;
    onSubmitCallback: (values: any) => void;
}

const FormModal: React.FC<IHandlerProps> = ({ RequestFactory, requestSuccessCallback, closeHandlerCallback }) => {
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
                        query.sendQuery(RequestFactory(form.values.exchangeName));
                    }
                })
                .catch((e) => {
                    console.log(e);
                });
        }
    }, []);

    const validateExchangeName = (key?: string): string | void => {
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

    return (
        <Modal title={'Create a fanout exchange'} onSubmit={onSubmit} onCancel={closeHandlerCallback}>
            {query.state.status === EQueryStatus.LOADING ? (
                <Spinner animation={'border'} />
            ) : (
                <Formik innerRef={formRef} initialValues={{ exchangeName: '' }} onSubmit={() => void 0}>
                    {({ errors, touched }) => (
                        <Form id={'foo'}>
                            <Field
                                name={'exchangeName'}
                                validate={validateExchangeName}
                                render={({ field }: FieldProps) => {
                                    return (
                                        <FormGroup className="mb-3">
                                            <FormLabel>Exchange Name</FormLabel>
                                            <FormControl id={'exchangeName'} type={'text'} {...field} />
                                            {errors.exchangeName && touched.exchangeName && (
                                                <p className={'text-danger'}>{errors.exchangeName}</p>
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
