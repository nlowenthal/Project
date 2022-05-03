import React, { useState } from 'react';
import toastr from 'toastr';
import debug from 'sabio-debug';
import FileUpload from '../file/FileUpload';
import { Button } from 'react-bootstrap';
import * as newsletterService from '../../services/newsletterService';
import PropTypes from 'prop-types';
import { Field, Form, Formik, ErrorMessage } from 'formik';
import formSchema from './NewsletterSchema';

const _logger = debug.extend('NewsletterInsert');

function NewsletterFormInsert(props) {
    const [initialAddFormData, setInitialAddFormData] = useState({
        templateId: '',
        name: '',
        link: '',
        coverPhoto: '',
        dateToPublish: '',
    });

    const onAddRequested = (formData) => {
        let data = { ...formData, coverPhoto: initialAddFormData.coverPhoto };
        props.onClose(() => false);
        newsletterService.add(data).then(onAddNewsletterSuccess).catch(onAddNewsletterError);
    };

    const onAddNewsletterSuccess = (data) => {
        _logger(`Here is the Id: ${data.item}`);
        toastr.success('A Newsletter was Successfully Added');
    };

    const onAddNewsletterError = (err) => {
        _logger(err);
        toastr.error('Adding a Newsletter was Unsuccessful, Please make sure all fields were filled properly');
    };

    const manageUpload = (files) => {
        _logger(files);
        return files.map(mapFiles);

        function mapFiles(upload) {
            const photo = upload.url;
            _logger(photo);
            setInitialAddFormData((prevState) => {
                let formUpdate = { ...prevState };
                formUpdate.coverPhoto = photo;
                return formUpdate;
            });
        }
    };

    return (
        <div className="container">
            <Formik initialValues={initialAddFormData} validationSchema={formSchema} onSubmit={onAddRequested}>
                <Form>
                    <div className="form-group">
                        <label htmlFor="InputTemplateId">Template Id</label>
                        <Field
                            name="templateId"
                            type="text"
                            className="form-control"
                            id="InputTemplateId"
                            placeholder="Enter in a Template Id"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="InputName">Name</label>
                        <Field
                            name="name"
                            type="text"
                            className="form-control"
                            id="InputName"
                            placeholder="Enter Newsletter Name..."
                        />
                        <ErrorMessage name="name" component="div" className="mx-3" style={{ color: 'red' }} />
                    </div>
                    <div className="form-group pt-2">
                        <label htmlFor="InputLink">Link</label>
                        <Field
                            name="link"
                            type="text"
                            className="form-control"
                            id="InputLink"
                            placeholder="Enter Link"
                        />
                        <ErrorMessage name="link" component="div" className="mx-3" style={{ color: 'red' }} />
                    </div>
                    <div className="form-group pt-2">
                        <label htmlFor="InputCoverPhoto">Cover Image</label>
                        <FileUpload onFileChange={manageUpload} type="file" name="coverPhoto" />
                    </div>
                    <div className="form-group pt-2">
                        <label htmlFor="InputDateToPublish">Publish Date</label>
                        <Field
                            name="dateToPublish"
                            type="date"
                            className="form-control"
                            id="InputdateToPublish"
                            placeholder="Enter the Publish Date"
                        />
                        <ErrorMessage name="dateToPublish" component="div" className="mx-3" style={{ color: 'red' }} />
                    </div>
                    <div className="pt-3">
                        <Button type="submit" className="btn btn-primary">
                            Add Newsletter
                        </Button>
                    </div>
                </Form>
            </Formik>
        </div>
    );
}

NewsletterFormInsert.propTypes = {
    onClose: PropTypes.func,
};

export default NewsletterFormInsert;
