import debug from 'sabio-debug';
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as newsletterService from '../../../services/newsletterService';
import FormSchema from './unsubscribeSchema';

const _logger = debug.extend('Unsubscribe');

class Unsubscribe extends React.Component {
    state = {
        formData: {
            email: '',
        },
    };

    handleSubmit = (formData) => {
        _logger(formData);
        newsletterService.unsubscribe(formData);
    };

    render() {
        return (
            <div className="container">
                <div className="row ">
                    <div className="col-4">
                        <Formik
                            enableReinitialize={true}
                            initialValues={this.state.formData}
                            validationSchema={FormSchema}
                            onSubmit={this.handleSubmit}>
                            <Form>
                                <div className="form-group">
                                    <label htmlFor="email">Enter your email</label>
                                    <Field type="email" name="email" className="form-control" />
                                    <ErrorMessage name="email" components="div" />
                                </div>
                                <button type="submit" className="btn btn-primary">
                                    Unsubscribe
                                </button>
                            </Form>
                        </Formik>
                    </div>
                </div>
            </div>
        );
    }
}
export default Unsubscribe;
