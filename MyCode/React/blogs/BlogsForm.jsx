import { React, useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Card } from 'react-bootstrap';
import debug from 'sabio-debug';
import blogSchema from './blogSchema';
import toastr from 'toastr';
import FileUpload from '../file/FileUpload';
import * as blogService from '../../services/blogService';
import TextEditor from './TextEditor';

function BlogsForm() {
    const _logger = debug.extend('blogsForm');
    _logger('logger is firing');

    const [initialBlogData, setInitalBlogData] = useState({
        blogTypeId: '',
        authorId: 0,
        title: '',
        subject: '',
        content: '',
        isPublished: '1',
        imageUrl: '',
        datePublished: '',
        statusId: 1,
    });

    const blogTypes = [
        { id: 1, name: 'Elections' },
        { id: 2, name: 'Forecasts' },
        { id: 3, name: 'Surveys' },
    ];

    const mapBlogTypes = (blog) => (
        <option value={blog.id} key={`blog_${blog.id}`}>
            {blog.name}
        </option>
    );

    const onChangeBlog = (event) => {
        _logger('onChange', { syntheticEvent: event });
        const target = event.target;
        const newValue = target.value;
        const newName = target.name;
        _logger({ newValue, newName });
        setInitalBlogData((prevState) => {
            const addNewBlog = {
                ...prevState,
            };
            const pub = addNewBlog.isPublished;
            if (pub === '1') {
                addNewBlog.isPublished = true;
            } else {
                addNewBlog.isPublished = false;
            }

            addNewBlog[newName] = newValue;
            return addNewBlog;
        });
    };

    const onCreateBlog = (e) => {
        e.preventDefault();
        blogService.addBlog(initialBlogData).then(onAddNewBlogSuccess).catch(onAddNewBlogError);
    };

    const onAddNewBlogSuccess = (data) => {
        _logger(`This is the id: ${data.item}`);
        toastr.success('Blog has been Created!');

        setInitalBlogData((prevState) => {
            const updatedId = { ...prevState };
            updatedId.id = data.items;
            return updatedId;
        });
    };

    const onAddNewBlogError = (err) => {
        _logger(err);
        toastr.error('Blog failed to Create');
    };

    useEffect(() => {
        blogService.getBlogType().then(onGetBlogTypeSuccess).catch(onGetBlogTypeError);
    }, []);

    const onGetBlogTypeSuccess = (response) => {
        _logger(response.data.item.BlogTypes);
        setInitalBlogData((prevState) => {
            const newBlogData = { ...prevState };
            newBlogData.blogTypeId = response.data.item.BlogTypes;
            return newBlogData;
        });
    };

    const onGetBlogTypeError = (error) => {
        _logger(error);
    };

    const manageUpload = (files) => {
        return files.map(mapFiles);
        function mapFiles(upload) {
            const image = upload.url;
            setInitalBlogData((prevState) => {
                let updateImage = { ...prevState };
                updateImage.imageUrl = image;
                return updateImage;
            });
        }
    };

    const [editorLoaded, setEditorLoaded] = useState(false);
    const [data, setData] = useState('');
    _logger(data);

    useEffect(() => {
        setEditorLoaded(true);
    }, []);

    const setStateForTextEditor = (data) => {
        setInitalBlogData((prevState) => {
            let pd = { ...prevState };
            pd.content = data;
            return pd;
        });
    };

    return (
        <Card>
            <Card.Body>
                <Formik enableReinitialize={true} initialValues={initialBlogData} validationSchema={blogSchema}>
                    <Form>
                        <div className="form-group mb-3">
                            <h1>Create A Blog</h1>
                        </div>
                        <br />
                        <div className="form-group mb-3">
                            <label htmlFor="blogTypeId">Select Blog Category</label>
                            <Field
                                onChange={onChangeBlog}
                                value={initialBlogData.blogTypeId}
                                name="blogTypeId"
                                as="select"
                                className="form-control">
                                <option value="0">Please Select a Blog Category</option>
                                {blogTypes.map(mapBlogTypes)}
                            </Field>
                            <ErrorMessage name="blogTypeId" component="div" className="has-error" />
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="title">Title</label>
                            <Field
                                onChange={onChangeBlog}
                                value={initialBlogData.title}
                                type="text"
                                name="title"
                                className="form-control"
                            />
                            <ErrorMessage name="title" component="div" className="has-error" />
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="subject">Subject</label>
                            <Field
                                onChange={onChangeBlog}
                                value={initialBlogData.subject}
                                type="text"
                                name="subject"
                                className="form-control"
                            />
                            <ErrorMessage name="subject" component="div" className="has-error" />
                        </div>
                        <TextEditor
                            name="content"
                            onChange={(data) => {
                                setData(data);
                                setStateForTextEditor(data);
                            }}
                            isEditorLoaded={editorLoaded}
                            value={initialBlogData.content}
                        />
                        <div className="form-group mb-3">
                            <label htmlFor="isPublished">Do You Want to Publish?</label>
                            <Field
                                onChange={onChangeBlog}
                                value={initialBlogData.isPublished}
                                component="select"
                                name="isPublished"
                                className="form-select">
                                <option value="0">Please Select an Option</option>
                                <option value="1">Yes</option>
                                <option value="2">No</option>
                            </Field>
                            <ErrorMessage name="isPublished" component="div" className="has-error" />
                        </div>
                        <label>Upload Blog Image</label>
                        <FileUpload onFileChange={manageUpload} name="imageUrl" />
                        <br />
                        <div className="form-group mb-3">
                            <label htmlFor="datePublished">Date Published</label>
                            <Field
                                onChange={onChangeBlog}
                                value={initialBlogData.datePublished}
                                type="date"
                                name="datePublished"
                                className="form-control"
                            />
                            <ErrorMessage name="datePublished" component="div" className="has-error" />
                        </div>
                        <button type="submit" className="btn btn-primary" onClick={onCreateBlog}>
                            Create Blog
                        </button>
                    </Form>
                </Formik>
            </Card.Body>
        </Card>
    );
}

export default BlogsForm;
