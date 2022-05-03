import React, { useState, useEffect } from 'react';
import toastr from 'toastr';
import PropTypes from 'prop-types';
import debug from 'sabio-debug';
import { Button } from 'react-bootstrap';
import FileUpload from '../file/FileUpload';
import * as newsletterService from '../../services/newsletterService';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import FormSchema from './NewsletterSchema';

const _logger = debug.extend('NewsletterUpdate');

function NewsletterFormUpdate(props) {
    const [initialUpdateFormData, setInitialUpdateFormData] = useState({
        id: 0,
        templateId: '',
        name: '',
        link: '',
        coverPhoto: '',
        dateToPublish: '',
    });

    useEffect(() => {
        const letter = props.letter;
        setInitialUpdateFormData((prevState) => {
            let newData = { ...prevState };
            let dateTaken = letter.dateToPublish.toString().slice(0, 10);
            newData = letter;
            newData.dateToPublish = dateTaken;
            return newData;
        });
    }, []);

    const onUpdateRequested = (formData) => {
        props.onClose(false);
        newsletterService.update(formData, formData.id).then(onUpdateNewsletterSuccess).catch(onUpdateNewsletterError);
    };

    const onUpdateNewsletterSuccess = (data) => {
        _logger(data);
        toastr.success('Updating a Newsletter was Successful');
    };

    const onUpdateNewsletterError = (err) => {
        _logger(err);
        toastr.error('Updating a Newsletter was Unsuccessful');
    };

    const manageUpload = (files) => {
        return files.map(mapFiles);

        function mapFiles(upload) {
            const photo = upload.url;
            _logger(photo);
            setInitialUpdateFormData((prevState) => {
                let formUpdate = { ...prevState };
                formUpdate.coverPhoto = photo;
                return formUpdate;
            });
        }
    };

    return (
        <div className="container">
            <Formik
                enableReinitialize={true}
                initialValues={initialUpdateFormData}
                onSubmit={onUpdateRequested}
                validationSchema={FormSchema}>
                <Form>
                    <div className="form-group">
                        <label htmlFor="InputTemplateId">Template Id</label>
                        <Field
                            name="templateId"
                            type="text"
                            className="form-control"
                            id="templateId"
                            placeholder="Enter in a Template Id"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="InputName">Name</label>
                        <Field
                            name="name"
                            type="text"
                            className="form-control"
                            id="name"
                            placeholder="Enter Newsletter Name..."
                        />
                        <ErrorMessage name="name" component="div" className="mx-3" style={{ color: 'red' }} />
                    </div>
                    <div className="form-group pt-2">
                        <label htmlFor="InputLink"> Link</label>
                        <Field name="link" type="text" className="form-control" id="link" placeholder="Enter Link" />
                        <ErrorMessage name="link" component="div" className="mx-3" style={{ color: 'red' }} />
                    </div>
                    <div className="form-group pt-2">
                        <label htmlFor="InputCoverPhoto">Cover Image</label>
                        <Field name="coverPhoto" type="text" className="form-control" />
                        <FileUpload onFileChange={manageUpload} type="file" name="coverPhoto" />
                    </div>
                    <div className="form-group pt-2">
                        <label htmlFor="InputDateToPublish">Publish Date</label>
                        <Field name="dateToPublish" type="date" className="form-control" id="dateToPublish" />
                        <ErrorMessage name="dateToPublish" component="div" className="mx-3" style={{ color: 'red' }} />
                    </div>
                    <div className="pt-3">
                        <Button type="submit" className="btn btn-primary">
                            Save
                        </Button>
                    </div>
                </Form>
            </Formik>
        </div>
    );
}
NewsletterFormUpdate.propTypes = {
    letter: PropTypes.shape({
        id: PropTypes.number.isRequired,
        templateId: PropTypes.number.isRequired,
        link: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        coverPhoto: PropTypes.string.isRequired,
        dateToPublish: PropTypes.string.isRequired,
    }),
    onClose: PropTypes.func,
};

export default NewsletterFormUpdate;
