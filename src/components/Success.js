import React, { useRef } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const Success = ({ formData, onStartNew }) => {
  const contentRef = useRef(null);

  const generatePDF = () => {
    const content = contentRef.current;
    const downloadSection = content.querySelector('.download-section');
    const newAppButton = content.querySelector('.new-application-button');
    
    // Hide download section and new application button before capturing
    downloadSection.style.display = 'none';
    newAppButton.style.display = 'none';
    
    html2canvas(content, {
      scale: 1.5,
      useCORS: true,
      logging: false,
      scrollY: -window.scrollY
    }).then(canvas => {
      // Show download section and new application button after capturing
      downloadSection.style.display = 'block';
      newAppButton.style.display = 'block';
      
      const imgWidth = 190;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const xOffset = (210 - imgWidth) / 2;
      const yOffset = 20;
      pdf.addImage(imgData, 'PNG', xOffset, yOffset, imgWidth, imgHeight);
      pdf.save('mars-visit-application.pdf');
    });
  };

  return (
    <div className="success-container">
      <div className="success-content" ref={contentRef}>
        <div className="success-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M22 4L12 14.01l-3-3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <h2>Application Submitted Successfully!</h2>
        <p>Thank you for your interest in visiting Mars, {formData.fullName}!</p>
        <div className="confirmation-details">
          <p>Your application has been received and is being processed. Here's a summary of your trip details:</p>
          <div className="summary-box">
            <div className="summary-item">
              <strong>Departure Date:</strong> 
              <span>{new Date(formData.departureDate).toLocaleDateString()}</span>
            </div>
            <div className="summary-item">
              <strong>Return Date:</strong> 
              <span>{new Date(formData.returnDate).toLocaleDateString()}</span>
            </div>
            <div className="summary-item">
              <strong>Accommodation:</strong> 
              <span>{formData.accommodation === 'spaceHotel' ? 'Space Hotel' : 'Martian Base'}</span>
            </div>
          </div>
          <p className="next-steps">
            We will contact you at <strong>{formData.email}</strong> with further instructions 
            and preparation details for your Mars journey.
          </p>
        </div>
        <div className="contact-info">
          <p>If you have any questions, please don't hesitate to contact our support team:</p>
          <p className="support-email">support@marsvisit.com</p>
        </div>
        <div className="download-section">
          <button 
            className="download-button primary-button"
            onClick={generatePDF}
          >
            Download Application Summary (PDF)
          </button>
        </div>
        <button 
          className="new-application-button center-button"
          onClick={onStartNew}
        >
          Start Another Application
        </button>
      </div>
    </div>
  );
};

export default Success; 