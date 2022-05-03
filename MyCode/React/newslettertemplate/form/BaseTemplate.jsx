import React, { useState } from 'react';
import debug from 'sabio-debug';
import newsletterTemplateService from '../../../services/newsletterTemplateService';
import toastr from 'toastr';
import 'toastr/build/toastr.css';
import FileUpload from '../../file/FileUpload';
import { SketchPicker } from 'react-color';
import PropTypes from 'prop-types';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import NewsletterTemplateSchema from './NewsletterTemplateSchema';
import { Row, Col, Container, Button } from 'react-bootstrap';

const BaseTemplate = () => {
    const _logger = debug.extend('newslettertemplateform');
    const [color, setColor] = useState();
    const [colorPicker, setColorPicker] = useState(false);
    const [templateBody, setTemplateBody] = useState({
        title: '',
        about: '',
        description: '',
        primaryImage: '',
    });

    const onChangeForm = (event) => {
        _logger('formChange', { syntheticEvent: event });
        const target = event.target;
        const newValue = target.value;
        const newField = target.name;

        setTemplateBody((prevState) => {
            const newObject = {
                ...prevState,
            };
            newObject[newField] = newValue;

            return newObject;
        });
    };

    const submitForm = (values) => {
        newsletterTemplateService(values).then(onAddNewsletterSuccess).catch(onErrorNewsletter);
    };

    const onAddNewsletterSuccess = (response) => {
        _logger('onAddNewsletterSuccess', response);
        toastr.success('Successfully added a template.');
    };

    const onErrorNewsletter = (error) => {
        _logger('onErrorNewsletter', error);
        toastr.error('Failed to upload template.');
    };

    const manageFile = (files) => {
        _logger(files);

        return files.map(mapFiles);

        function mapFiles(uploadImg) {
            const images = uploadImg.url;
            setTemplateBody((prevState) => {
                let img = { ...prevState };
                img.primaryImage = images;

                return img;
            });
        }
    };

    const formStyles = {
        float: 'left',
        padding: '10px',
        width: '24%',
        backgroundColor: '#fff',
        right: '35%',
    };

    const previewStyles = {
        float: 'right',
        backgroundColor: '#fff',
        width: '70%',
        left: '20%',
        textAlign: 'center',
        padding: '10px',
    };

    const imageStyles = {
        width: '350px',
        height: '350px',
    };

    const formPadding = {
        padding: '3px',
    };

    const mainTitle = {
        color: '#5c5858',
        textAlign: 'center',
    };

    const errorStyles = {
        color: 'red',
    };

    const buttonStyles = {
        marginTop: '10px',
    };

    return (
        <React.Fragment>
            <Formik
                enableReinitialize={true}
                initialValues={templateBody}
                validationSchema={NewsletterTemplateSchema}
                onSubmit={submitForm}>
                <Form>
                    <Container style={formStyles}>
                        <Row>
                            <Col>
                                <h3 style={mainTitle}>Add a Newsletter Template</h3>
                                <div style={formPadding}>
                                    <label className="col">Header Title</label>
                                    <Field
                                        type="text"
                                        className="form-control"
                                        id="title"
                                        name="title"
                                        placeholder="Enter a Title"
                                        value={templateBody.title}
                                        onChange={onChangeForm}
                                    />
                                    <ErrorMessage name="title" component="div" style={errorStyles} />
                                </div>
                                <div style={formPadding}>
                                    <label className="col">About</label>
                                    <Field
                                        type="text"
                                        className="form-control"
                                        id="about"
                                        name="about"
                                        placeholder="About the Newsletter"
                                        value={templateBody.about}
                                        onChange={onChangeForm}
                                    />
                                    <ErrorMessage name="about" component="div" style={errorStyles} />
                                </div>
                                <div style={formPadding}>
                                    <label className="col">Description</label>
                                    <Field
                                        as="textarea"
                                        type="text"
                                        className="form-control"
                                        id="description"
                                        name="description"
                                        placeholder="Enter a Description"
                                        value={templateBody.description}
                                        onChange={onChangeForm}
                                    />
                                    <ErrorMessage name="description" component="div" style={errorStyles} />
                                </div>
                                <div style={formPadding}>
                                    <FileUpload onFileChange={manageFile}></FileUpload>
                                </div>
                                <div className="container" style={buttonStyles}>
                                    <Button
                                        variant="danger"
                                        onClick={() => setColorPicker((colorPicker) => !colorPicker)}>
                                        {colorPicker ? 'Close' : 'Add a Background Color'}
                                    </Button>
                                    {colorPicker && (
                                        <SketchPicker color={color} onChangeComplete={(color) => setColor(color.hex)} />
                                    )}
                                    <div style={buttonStyles}>
                                        <Button variant="primary" type="submit">
                                            Submit
                                        </Button>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </Form>
            </Formik>
            <Container style={previewStyles}>
                <Row>
                    <h1>Preview</h1>
                    <Col style={{ backgroundColor: color }}>
                        <h1>{templateBody.title ? templateBody.title : 'Enter Title'}</h1>
                        <h3>{templateBody.about ? templateBody.about : 'Enter About'}</h3>
                        <img
                            src={templateBody.primaryImage}
                            onError={(event) => (event.target.style.display = 'none')}
                            onLoad={(event) => (event.target.style.display = 'inline-block')}
                            alt=""
                            style={imageStyles}
                        />
                        <h4>{templateBody.description ? templateBody.description : 'Enter Description'}</h4>
                    </Col>
                </Row>
            </Container>
        </React.Fragment>
    );
};

BaseTemplate.propTypes = {
    title: PropTypes.string.isRequired,
    about: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
};

export default BaseTemplate;
