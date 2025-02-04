import React, { useState } from 'react';
import './App.css';
import PersonalInfo from './components/PersonalInfo';
import TravelPreferences from './components/TravelPreferences';
import HealthSafety from './components/HealthSafety';
import Success from './components/Success';

function App() {
  const [stage, setStage] = useState(1);
  const [formData, setFormData] = useState({
    // Personal Info
    fullName: '',
    dateOfBirth: '',
    nationality: '',
    email: '',
    phone: '',
    // Travel Preferences
    departureDate: '',
    returnDate: '',
    accommodation: '',
    specialRequests: '',
    // Health and Safety
    healthDeclaration: false,
    emergencyContact: '',
    medicalConditions: ''
  });

  const nextStage = () => {
    setStage(stage + 1);
  };

  const previousStage = () => {
    setStage(stage - 1);
  };

  const handleFormData = (data) => {
    setFormData({ ...formData, ...data });
  };

  const renderStage = () => {
    switch (stage) {
      case 1:
        return <PersonalInfo 
          formData={formData} 
          handleFormData={handleFormData} 
          nextStage={nextStage} 
        />;
      case 2:
        return <TravelPreferences 
          formData={formData} 
          handleFormData={handleFormData} 
          nextStage={nextStage} 
          previousStage={previousStage} 
        />;
      case 3:
        return <HealthSafety 
          formData={formData} 
          handleFormData={handleFormData} 
          previousStage={previousStage} 
          nextStage={nextStage} 
        />;
      case 4:
        return <Success formData={formData} />;
      default:
        return <PersonalInfo 
          formData={formData} 
          handleFormData={handleFormData} 
          nextStage={nextStage} 
        />;
    }
  };

  return (
    <div className="App">
      <div className="form-container">
        <h1>Mars Visit Application</h1>
        <div className="progress-bar">
          <div className={`progress-step ${stage >= 1 ? 'active' : ''}`}>1</div>
          <div className={`progress-step ${stage >= 2 ? 'active' : ''}`}>2</div>
          <div className={`progress-step ${stage >= 3 ? 'active' : ''}`}>3</div>
        </div>
        {renderStage()}
      </div>
    </div>
  );
}

export default App;
