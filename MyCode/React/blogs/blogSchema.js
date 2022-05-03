import * as Yup from 'yup';

const blogSchema = Yup.object().shape({
    blogTypeId: Yup.number().required('This Field is Required'),
    userId: Yup.number().required('This Field is Required'),
    title: Yup.string()
        .min(2, 'The Title must be more than 2 characters long')
        .max(50)
        .required('This Field is Required'),
    subject: Yup.string()
        .min(2, 'The Subject must be more than 2 characters long')
        .max(50)
        .required('This Field is Required'),
    content: Yup.string().min(2, 'The Content must be more than 2 characters long').required('This Field is Required'),
    isPublished: Yup.bool().required('This Field is Required'),
    imageUrl: Yup.string()
        .min(10, 'The Url must be more than 10 characters long')
        .max(255)
        .required('This Field is Required'),
    statusId: Yup.number().required('This Field is Required'),
});

export default blogSchema;
