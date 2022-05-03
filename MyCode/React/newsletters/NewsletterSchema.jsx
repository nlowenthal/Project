import * as Yup from 'yup';

const formSchema = Yup.object().shape({
    name: Yup.string().min(2).max(100).required('This is a Required Field'),

    link: Yup.string().min(1).required('Required*'),

    dateToPublish: Yup.string().min(1).required('This is a Required Field'),
});

export default formSchema;
