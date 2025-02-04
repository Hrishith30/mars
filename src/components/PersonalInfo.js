import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { countries } from 'countries-list';

const PersonalInfo = ({ formData, handleFormData, nextStage }) => {
  // Convert countries object to sorted array of country names
  const countryNames = Object.values(countries)
    .map(country => country.name)
    .sort();

  const validationSchema = Yup.object({
    fullName: Yup.string()
      .required('Full name is required')
      .min(2, 'Name must be at least 2 characters'),
    dateOfBirth: Yup.date()
      .required('Date of birth is required')
      .max(new Date(), 'Date cannot be in the future'),
    nationality: Yup.string()
      .required('Nationality is required'),
    email: Yup.string()
      .email('Invalid email format')
      .required('Email is required'),
    phone: Yup.string()
      .matches(/^[0-9+\-() ]+$/, 'Invalid phone number')
      .required('Phone number is required'),
  });

  const formik = useFormik({
    initialValues: {
      fullName: formData.fullName,
      dateOfBirth: formData.dateOfBirth,
      nationality: formData.nationality,
      email: formData.email,
      phone: formData.phone,
    },
    validationSchema,
    onSubmit: (values) => {
      handleFormData(values);
      nextStage();
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="form-stage">
      <h2>Personal Information</h2>
      <div className="form-group">
        <label htmlFor="fullName">Full Name</label>
        <input
          id="fullName"
          name="fullName"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.fullName}
          className={formik.touched.fullName && formik.errors.fullName ? 'error' : ''}
        />
        {formik.touched.fullName && formik.errors.fullName && (
          <div className="error-message">{formik.errors.fullName}</div>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="dateOfBirth">Date of Birth</label>
        <input
          id="dateOfBirth"
          name="dateOfBirth"
          type="date"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.dateOfBirth}
          className={formik.touched.dateOfBirth && formik.errors.dateOfBirth ? 'error' : ''}
        />
        {formik.touched.dateOfBirth && formik.errors.dateOfBirth && (
          <div className="error-message">{formik.errors.dateOfBirth}</div>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="nationality">Nationality</label>
        <select
          id="nationality"
          name="nationality"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.nationality}
          className={formik.touched.nationality && formik.errors.nationality ? 'error' : ''}
          style={{ width: '100%' }}
        >
          <option value="">Select a country</option>
          {countryNames.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>
        {formik.touched.nationality && formik.errors.nationality && (
          <div className="error-message">{formik.errors.nationality}</div>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
          className={formik.touched.email && formik.errors.email ? 'error' : ''}
        />
        {formik.touched.email && formik.errors.email && (
          <div className="error-message">{formik.errors.email}</div>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="phone">Phone Number</label>
        <input
          id="phone"
          name="phone"
          type="tel"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.phone}
          className={formik.touched.phone && formik.errors.phone ? 'error' : ''}
        />
        {formik.touched.phone && formik.errors.phone && (
          <div className="error-message">{formik.errors.phone}</div>
        )}
      </div>

      <div className="button-group">
        <button type="submit" className="next-button">
          Next
        </button>
      </div>
    </form>
  );
};

export default PersonalInfo; 