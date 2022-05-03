import * as Yup from 'yup';

const NewsletterTemplateSchema = Yup.object().shape({
    title: Yup.string().min(10).max(30).required('A Title is Required.'),
    about: Yup.string().min(10).max(300).required('About is Required.'),
    description: Yup.string().min(10).max(300).required('A Description is Required'),
});

export default NewsletterTemplateSchema;
