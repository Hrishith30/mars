import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const TravelPreferences = ({ formData, handleFormData, nextStage, previousStage }) => {
  const validationSchema = Yup.object({
    departureDate: Yup.date()
      .required('*Departure date is required')
      .min(new Date(), '*Departure date must be in the future'),
    returnDate: Yup.date()
      .required('*Return date is required')
      .min(Yup.ref('departureDate'), 'Return date must be after departure date'),
    accommodation: Yup.string()
      .required('*Accommodation preference is required')
      .oneOf(['spaceHotel', 'martianBase'], '*Please select a valid accommodation'),
    specialRequests: Yup.string()
      .max(500, '*Special requests must be less than 500 characters')
  });

  const formik = useFormik({
    initialValues: {
      departureDate: formData.departureDate,
      returnDate: formData.returnDate,
      accommodation: formData.accommodation,
      specialRequests: formData.specialRequests
    },
    validationSchema,
    onSubmit: (values) => {
      handleFormData(values);
      nextStage();
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="form-stage">
      <h2>Travel Preferences</h2>
      
      <div className="form-group">
        <label htmlFor="departureDate">Departure Date</label>
        <input
          id="departureDate"
          name="departureDate"
          type="date"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.departureDate}
          className={formik.touched.departureDate && formik.errors.departureDate ? 'error' : ''}
        />
        {formik.touched.departureDate && formik.errors.departureDate && (
          <div className="error-message">{formik.errors.departureDate}</div>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="returnDate">Return Date</label>
        <input
          id="returnDate"
          name="returnDate"
          type="date"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.returnDate}
          className={formik.touched.returnDate && formik.errors.returnDate ? 'error' : ''}
        />
        {formik.touched.returnDate && formik.errors.returnDate && (
          <div className="error-message">{formik.errors.returnDate}</div>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="accommodation">Accommodation Preference</label>
        <select
          id="accommodation"
          name="accommodation"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.accommodation}
          className={formik.touched.accommodation && formik.errors.accommodation ? 'error' : ''}
        >
          <option value="">Select accommodation</option>
          <option value="spaceHotel">Space Hotel</option>
          <option value="martianBase">Martian Base</option>
        </select>
        {formik.touched.accommodation && formik.errors.accommodation && (
          <div className="error-message">{formik.errors.accommodation}</div>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="specialRequests">Special Requests</label>
        <textarea
          id="specialRequests"
          name="specialRequests"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.specialRequests}
          className={formik.touched.specialRequests && formik.errors.specialRequests ? 'error' : ''}
          placeholder="Enter any special requests or preferences..."
          rows="4"
        />
        {formik.touched.specialRequests && formik.errors.specialRequests && (
          <div className="error-message">{formik.errors.specialRequests}</div>
        )}
      </div>

      <div className="button-group">
        <button type="button" onClick={previousStage} className="back-button">
          Back
        </button>
        <button type="submit" className="next-button">
          Next
        </button>
      </div>
    </form>
  );
};

export default TravelPreferences; 