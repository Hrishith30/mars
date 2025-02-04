import React, { useState, useEffect } from 'react';
import './App.css';
import PersonalInfo from './components/PersonalInfo';
import TravelPreferences from './components/TravelPreferences';
import HealthSafety from './components/HealthSafety';
import Success from './components/Success';

function App() {
  const [stage, setStage] = useState(() => {
    // Get saved stage from localStorage or default to 1
    return parseInt(localStorage.getItem('marsVisitStage')) || 1;
  });
  const [stars, setStars] = useState([]);
  const [shootingStars, setShootingStars] = useState([]);
  const [formData, setFormData] = useState(() => {
    // Get saved form data from localStorage or use default empty values
    const savedFormData = localStorage.getItem('marsVisitFormData');
    return savedFormData ? JSON.parse(savedFormData) : {
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
      emergencyContact: {
        name: '',
        relationship: '',
        phone: ''
      },
      medicalConditions: '',
      medications: '',
      allergies: ''
    };
  });

  // Save stage to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('marsVisitStage', stage);
  }, [stage]);

  // Save form data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('marsVisitFormData', JSON.stringify(formData));
  }, [formData]);

  useEffect(() => {
    const generateStars = () => {
      const numberOfStars = 200;
      const numberOfShootingStars = 3;
      const newStars = [];
      const newShootingStars = [];
      
      for (let i = 0; i < numberOfStars; i++) {
        newStars.push({
          id: i,
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}vh`,
          animationDelay: `${Math.random() * 3}s`
        });
      }

      for (let i = 0; i < numberOfShootingStars; i++) {
        newShootingStars.push({
          id: i,
          left: `-50px`,
          top: `${Math.random() * 30}vh`,
          animationDelay: `${i * 7}s`
        });
      }
      
      setStars(newStars);
      setShootingStars(newShootingStars);
    };

    generateStars();
  }, []);

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
        return <Success 
          formData={formData} 
          onStartNew={() => {
            // Clear localStorage and reset state when starting new application
            localStorage.removeItem('marsVisitStage');
            localStorage.removeItem('marsVisitFormData');
            setStage(1);
            setFormData({
              fullName: '',
              dateOfBirth: '',
              nationality: '',
              email: '',
              phone: '',
              departureDate: '',
              returnDate: '',
              accommodation: '',
              specialRequests: '',
              healthDeclaration: false,
              emergencyContact: {
                name: '',
                relationship: '',
                phone: ''
              },
              medicalConditions: '',
              medications: '',
              allergies: ''
            });
          }}
        />;
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
      <div className="starry-background">
        {stars.map((star) => (
          <div
            key={star.id}
            className="star"
            style={{
              left: star.left,
              top: star.top,
              animationDelay: star.animationDelay
            }}
          />
        ))}
        {shootingStars.map((star) => (
          <div
            key={`shooting-${star.id}`}
            className="shooting-star"
            style={{
              left: star.left,
              top: star.top,
              animationDelay: star.animationDelay
            }}
          />
        ))}
      </div>
      <div className="mars-planet" style={{ zIndex: 0 }} />
      <h1 style={{ position: 'relative', zIndex: 1 }}>Mars Visit Application</h1>
      <h4 className="form-subtitle" style={{ position: 'relative', zIndex: 1 }}>Your journey to Mars begins here</h4>
      <div className="form-container" style={{ position: 'relative', zIndex: 1 }}>
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
