import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const HealthSafety = ({ formData, handleFormData, nextStage, previousStage }) => {
  const validationSchema = Yup.object({
    healthDeclaration: Yup.boolean()
      .oneOf([true], 'You must agree to the health declaration'),
    emergencyContact: Yup.object().shape({
      name: Yup.string()
        .required('Emergency contact name is required'),
      relationship: Yup.string()
        .required('Relationship is required'),
      phone: Yup.string()
        .matches(/^[0-9+\-() ]+$/, 'Invalid phone number')
        .required('Emergency contact phone is required'),
    }),
    medicalConditions: Yup.string()
      .max(1000, 'Medical conditions description must be less than 1000 characters'),
    medications: Yup.string()
      .max(500, 'Medications list must be less than 500 characters'),
    allergies: Yup.string()
      .max(500, 'Allergies list must be less than 500 characters'),
  });

  const formik = useFormik({
    initialValues: {
      healthDeclaration: formData.healthDeclaration || false,
      emergencyContact: formData.emergencyContact || {
        name: '',
        relationship: '',
        phone: '',
      },
      medicalConditions: formData.medicalConditions || '',
      medications: formData.medications || '',
      allergies: formData.allergies || '',
    },
    validationSchema,
    onSubmit: (values) => {
      handleFormData(values);
      nextStage();
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="form-stage">
      <h2>Health and Safety Information</h2>

      <div className="form-group checkbox-group">
        <label className="checkbox-label">
          <input
            type="checkbox"
            name="healthDeclaration"
            checked={formik.values.healthDeclaration}
            onChange={formik.handleChange}
          />
          I declare that I am in good health and fit for space travel
        </label>
        {formik.touched.healthDeclaration && formik.errors.healthDeclaration && (
          <div className="error-message">{formik.errors.healthDeclaration}</div>
        )}
      </div>

      <div className="form-section">
        <h3>Emergency Contact</h3>
        <div className="form-group">
          <label htmlFor="emergencyContact.name">Contact Name</label>
          <input
            id="emergencyContact.name"
            name="emergencyContact.name"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.emergencyContact.name}
            className={
              formik.touched.emergencyContact?.name && 
              formik.errors.emergencyContact?.name ? 'error' : ''
            }
          />
          {formik.touched.emergencyContact?.name && formik.errors.emergencyContact?.name && (
            <div className="error-message">{formik.errors.emergencyContact.name}</div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="emergencyContact.relationship">Relationship</label>
          <input
            id="emergencyContact.relationship"
            name="emergencyContact.relationship"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.emergencyContact.relationship}
            className={
              formik.touched.emergencyContact?.relationship && 
              formik.errors.emergencyContact?.relationship ? 'error' : ''
            }
          />
          {formik.touched.emergencyContact?.relationship && formik.errors.emergencyContact?.relationship && (
            <div className="error-message">{formik.errors.emergencyContact.relationship}</div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="emergencyContact.phone">Contact Phone</label>
          <input
            id="emergencyContact.phone"
            name="emergencyContact.phone"
            type="tel"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.emergencyContact.phone}
            className={
              formik.touched.emergencyContact?.phone && 
              formik.errors.emergencyContact?.phone ? 'error' : ''
            }
          />
          {formik.touched.emergencyContact?.phone && formik.errors.emergencyContact?.phone && (
            <div className="error-message">{formik.errors.emergencyContact.phone}</div>
          )}
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="medicalConditions">Medical Conditions (if any)</label>
        <textarea
          id="medicalConditions"
          name="medicalConditions"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.medicalConditions}
          className={formik.touched.medicalConditions && formik.errors.medicalConditions ? 'error' : ''}
          placeholder="Please list any medical conditions..."
          rows="3"
        />
        {formik.touched.medicalConditions && formik.errors.medicalConditions && (
          <div className="error-message">{formik.errors.medicalConditions}</div>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="medications">Current Medications (if any)</label>
        <textarea
          id="medications"
          name="medications"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.medications}
          className={formik.touched.medications && formik.errors.medications ? 'error' : ''}
          placeholder="Please list any medications..."
          rows="3"
        />
        {formik.touched.medications && formik.errors.medications && (
          <div className="error-message">{formik.errors.medications}</div>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="allergies">Allergies (if any)</label>
        <textarea
          id="allergies"
          name="allergies"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.allergies}
          className={formik.touched.allergies && formik.errors.allergies ? 'error' : ''}
          placeholder="Please list any allergies..."
          rows="3"
        />
        {formik.touched.allergies && formik.errors.allergies && (
          <div className="error-message">{formik.errors.allergies}</div>
        )}
      </div>

      <div className="button-group">
        <button type="button" onClick={previousStage} className="back-button">
          Back
        </button>
        <button type="submit" className="next-button">
          Submit Application
        </button>
      </div>
    </form>
  );
};

export default HealthSafety; 