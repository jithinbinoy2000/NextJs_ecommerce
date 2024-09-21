import * as Yup from "yup";

const addressSchema = Yup.object().shape({
    firstname: Yup.string().required('* First Name is Required'),
    lastname:Yup.string().required("* Last name required"),
    email: Yup.string().required("* Email is Required").email("* Invalid Email"),
    address: Yup.string().required("* Address Required").min(10, '* Need a brief Address to Deliver Easily'),
    city: Yup.string().required('* City name is Required'),
    state: Yup.string().required('* state is Required'),
    zipcode: Yup.string()
        .required("* Zipcode is Required")
        .length(6, "* Zipcode must be exactly 6 digits")
        .matches(/^\d{6}$/, "* Zipcode must be a 6-digit number"),
});

export default addressSchema;
