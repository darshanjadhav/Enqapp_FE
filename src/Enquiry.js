import { useFormik } from "formik";
import axios from "axios";

export default function Enquiry() {
    const initialValues = {"name" : "", "phone": "", "query": ""};

    const validate = (values) => {
        const errors = {};

        if(values.name.trim().length < 2)
            errors.name = "invalid name";
        if( ! values.name.match('[A-Za-z ]+'))
            errors.name = "Name shud contain only alphabets";
        if(values.phone.toString().length !== 10)
            errors.phone = "Invalid Phone number";
        if(values.query.trim().length < 2)
            errors.query = "Invalid Query";

        return errors;
    }

    const onSubmit = (values, {resetForm}) => {
        let data = {"name": values.name, "phone": values.phone, "query": values.query};
        let urladd = "http://localhost:9000/save";
        axios.post(urladd, data)
        .then(res => {
            alert("we will get back to u");
            resetForm();
        })
        .catch(err => console.log(err));
    }

    const formik = useFormik({initialValues, validate, onSubmit});

    return(
        <>
        <center>
            <h1>Enquiry App</h1>
            <form onSubmit={formik.handleSubmit}>
                <input type="text" placeholder="Enter ur name" name = "name" 
                onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.name} />
                <br/><br/>
                {formik.touched.name && formik.errors.name ? <div className="err">{formik.errors.name}</div> : null}
                <input type="number" placeholder="Enter ur Phone number" name = "phone" 
                onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.phone} />
                {formik.touched.phone && formik.errors.phone ? <div className="err">{formik.errors.phone}</div> : null}
                <br/><br/>
                <textarea name="query" placeholder="Enter ur Query" rows={5} cols={30} 
                onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.query}></textarea>
                {formik.touched.query && formik.errors.query ? <div className="err">{formik.errors.query}</div> : null}
                <br/><br/>
                <input type="submit"/>
             </form>
        </center>
        </>
    );
}