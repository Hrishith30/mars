import * as Yup from 'yup';

// Import validation schemas from components (you'll need to export these from your components)
const personalInfoSchema = Yup.object({
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

const travelPreferencesSchema = Yup.object({
  departureDate: Yup.date()
    .required('Departure date is required')
    .min(new Date(), 'Departure date must be in the future'),
  returnDate: Yup.date()
    .required('Return date is required')
    .min(Yup.ref('departureDate'), 'Return date must be after departure date'),
  accommodation: Yup.string()
    .required('Accommodation preference is required')
    .oneOf(['spaceHotel', 'martianBase'], 'Please select a valid accommodation'),
  specialRequests: Yup.string()
    .max(500, 'Special requests must be less than 500 characters')
});

const healthSafetySchema = Yup.object({
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

describe('Personal Information Validation', () => {
  test('validates full name', async () => {
    const validData = { fullName: 'John Doe' };
    const invalidData = { fullName: 'J' };

    await expect(personalInfoSchema.validateAt('fullName', validData)).resolves.toBe('John Doe');
    await expect(personalInfoSchema.validateAt('fullName', invalidData)).rejects.toThrow();
  });

  test('validates email format', async () => {
    const validData = { email: 'test@example.com' };
    const invalidData = { email: 'invalid-email' };

    await expect(personalInfoSchema.validateAt('email', validData)).resolves.toBe('test@example.com');
    await expect(personalInfoSchema.validateAt('email', invalidData)).rejects.toThrow();
  });

  test('validates phone number format', async () => {
    const validData = { phone: '+1 (555) 123-4567' };
    const invalidData = { phone: 'abc123' };

    await expect(personalInfoSchema.validateAt('phone', validData)).resolves.toBe('+1 (555) 123-4567');
    await expect(personalInfoSchema.validateAt('phone', invalidData)).rejects.toThrow();
  });
});

describe('Travel Preferences Validation', () => {
  test('validates departure date is in future', async () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    const validData = { departureDate: tomorrow };
    const invalidData = { departureDate: yesterday };

    await expect(travelPreferencesSchema.validateAt('departureDate', validData)).resolves.toBe(tomorrow);
    await expect(travelPreferencesSchema.validateAt('departureDate', invalidData)).rejects.toThrow();
  });

  test('validates return date is after departure date', async () => {
    const departureDate = new Date();
    departureDate.setDate(departureDate.getDate() + 1);
    
    const returnDate = new Date();
    returnDate.setDate(returnDate.getDate() + 2);

    const validData = { 
      departureDate: departureDate,
      returnDate: returnDate,
      accommodation: 'spaceHotel'
    };
    const invalidData = { 
      departureDate: returnDate,
      returnDate: departureDate,
      accommodation: 'spaceHotel'
    };

    await expect(travelPreferencesSchema.validate(validData)).resolves.toEqual(validData);
    await expect(travelPreferencesSchema.validate(invalidData)).rejects.toThrow();
  });

  test('validates accommodation selection', async () => {
    const validData = { accommodation: 'spaceHotel' };
    const invalidData = { accommodation: 'invalidOption' };

    await expect(travelPreferencesSchema.validateAt('accommodation', validData)).resolves.toBe('spaceHotel');
    await expect(travelPreferencesSchema.validateAt('accommodation', invalidData)).rejects.toThrow();
  });
});

describe('Health and Safety Validation', () => {
  test('validates health declaration', async () => {
    const validData = { healthDeclaration: true };
    const invalidData = { healthDeclaration: false };

    await expect(healthSafetySchema.validateAt('healthDeclaration', validData)).resolves.toBe(true);
    await expect(healthSafetySchema.validateAt('healthDeclaration', invalidData)).rejects.toThrow();
  });

  test('validates emergency contact information', async () => {
    const validData = {
      emergencyContact: {
        name: 'Jane Doe',
        relationship: 'Spouse',
        phone: '+1 (555) 987-6543'
      }
    };
    const invalidData = {
      emergencyContact: {
        name: '',
        relationship: '',
        phone: 'invalid'
      }
    };

    await expect(healthSafetySchema.validateAt('emergencyContact', validData)).resolves.toEqual(validData.emergencyContact);
    await expect(healthSafetySchema.validateAt('emergencyContact', invalidData)).rejects.toThrow();
  });

  test('validates medical conditions length', async () => {
    const validData = { medicalConditions: 'None' };
    const invalidData = { medicalConditions: 'a'.repeat(1001) };

    await expect(healthSafetySchema.validateAt('medicalConditions', validData)).resolves.toBe('None');
    await expect(healthSafetySchema.validateAt('medicalConditions', invalidData)).rejects.toThrow();
  });
}); 