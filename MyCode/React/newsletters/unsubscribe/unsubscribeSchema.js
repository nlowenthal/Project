import * as Yup from 'yup';

const FormSchema = Yup.object().shape({
    email: Yup.string()
        .min(2, 'A Email Must Have More Than 2 Characters')
        .max(255, 'A Email Must Be Less Than 225 Characters')
        .email('Invalid Email')
        .required('Required'),
});

export default FormSchema;
