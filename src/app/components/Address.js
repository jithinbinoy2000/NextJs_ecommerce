"use client";

import { useFormik } from "formik";
import addressValidation from '../lib/addressValidation';
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setAddress, setEmail } from "../lib/paymentSlice";

export default function Address({ onDataChange, onTouched }) {
  const dispatch = useDispatch()
  const formik = useFormik({
    initialValues: {
      email: "",
      firstname: "",
      lastname: "",
      address: "",
      city: "",
      state: "",
      zipcode: ""
    },
    validationSchema: addressValidation,
    onSubmit: (values) => {
      // console.log(values);
      dispatch(setAddress(values))
      dispatch(setEmail(values.email))
      
    },
  });

  useEffect(() => {
    const isValid = Object.keys(formik.errors).length === 0 && formik.touched;
    onDataChange(isValid);
  }, [formik.errors, formik.touched, onDataChange]);


  useEffect(()=>{
    if(Object.keys(formik.touched).length===0){
        onTouched(false)
    }else{
        onTouched(true)
    }
  },[Object.keys(formik.touched)])

  return (
    <div className="p-4">
      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-5 max-w-[50rem] mx-auto">
        <div className="flex flex-col">
          <p className="text-lg font-semibold">Contact</p>
          <input
            type="email"
            name="email"
            placeholder="Email"
            {...formik.getFieldProps('email')}
           
            className="h-10 text-black p-2 rounded-md w-full"
          />
          <span className="text-red-500 text-sm font-extralight">{formik.touched.email && formik.errors.email}</span>
        </div>

        <div>
          <p className="text-lg font-semibold">Shipping Address</p>
          <div className="flex flex-col">
            <input
              type="text"
              name="firstname"
              placeholder="First Name"
              {...formik.getFieldProps("firstname")}
              
              className="h-10 text-black p-2 rounded-md w-full"
            />
            <span className="text-red-500 text-sm font-extralight">{formik.touched.firstname && formik.errors.firstname}</span>

            <input
              type="text"
              name="lastname"
              placeholder="Last Name"
              {...formik.getFieldProps("lastname")}
              
              className="h-10 text-black p-2 rounded-md w-full mt-2"
            />
            <span className="text-red-500 text-sm font-extralight">{formik.touched.lastname && formik.errors.lastname}</span>

            <textarea
              name="address"
              placeholder="Address"
              {...formik.getFieldProps("address")}
              
              className="h-20 text-black p-2 rounded-md w-full mt-2 resize-none"
            />
            <span className="text-red-500 text-sm font-extralight">{formik.touched.address && formik.errors.address}</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
            <div className="flex flex-col">
              <input
                type="text"
                name="city"
                placeholder="City"
                {...formik.getFieldProps("city")}
                
                className="h-10 text-black p-2 rounded-md w-full"
              />
              <span className="text-red-500 text-sm font-extralight">{formik.touched.city && formik.errors.city}</span>
            </div>
            <div className="flex flex-col">
              <input
                type="text"
                name="state"
                placeholder="State"
                {...formik.getFieldProps("state")}
                
                className="h-10 text-black p-2 rounded-md w-full"
              />
              <span className="text-red-500 text-sm font-extralight">{formik.touched.state && formik.errors.state}</span>
            </div>
            <div className="flex flex-col">
              <input
                type="text"
                name="zipcode"
                placeholder="Pincode"
                {...formik.getFieldProps("zipcode")}
                
                className="h-10 text-black p-2 rounded-md w-full"
              />
              <span className="text-red-500 text-sm font-extralight">{formik.touched.zipcode && formik.errors.zipcode}</span>
            </div>
          </div>
        <div className="w-full flex justify-center">
        <button type="submit" className="mt-4 p-2 bg-blue-600 j text-white rounded hover:bg-blue-700">
            Continue to Shipping
          </button>
        </div>
         
        </div>
      </form>
    </div>
  );
}
