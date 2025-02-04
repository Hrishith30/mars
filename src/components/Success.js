import React, { useRef } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const Success = ({ formData, onStartNew }) => {
  const contentRef = useRef(null);

  const generatePDF = () => {
    const content = contentRef.current;
    const downloadSection = content.querySelector('.download-section');
    const newAppButton = content.querySelector('.new-application-button');
    const successHeading = content.querySelector('.success-heading');
    
    // Hide download section and new application button before capturing
    downloadSection.style.display = 'none';
    newAppButton.style.display = 'none';
    
    // Temporarily change text color to black for PDF
    const originalColor = successHeading.style.color;
    successHeading.style.color = 'black';

    // Add media query check for mobile devices
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    
    html2canvas(content, {
      scale: isMobile ? 2 : 1.5,
      useCORS: true,
      logging: true,
      backgroundColor: '#ffffff',
      scrollY: -window.scrollY,
      windowWidth: document.documentElement.clientWidth,
      windowHeight: document.documentElement.clientHeight,
      onclone: (clonedDoc) => {
        const clonedContent = clonedDoc.querySelector('.success-content');
        if (clonedContent) {
          clonedContent.style.width = '100%';
          clonedContent.style.backgroundColor = '#ffffff';
          clonedContent.style.padding = '10px';
          
          if (isMobile) {
            clonedContent.style.margin = '0';
            clonedContent.style.position = 'relative';
            clonedContent.style.zIndex = '1';
            clonedContent.style.transform = 'scale(0.9)';
            clonedContent.style.transformOrigin = 'top center';
            
            // Force black text color and white background for all text elements
            const textElements = clonedContent.querySelectorAll('p, h2, strong, span, .support-email');
            textElements.forEach(element => {
              element.style.color = '#000000';
              element.style.backgroundColor = '#ffffff';
            });

            // Special handling for summary box
            const summaryBox = clonedContent.querySelector('.summary-box');
            if (summaryBox) {
              summaryBox.style.backgroundColor = '#ffffff';
              summaryBox.style.border = '1px solid #000000';
            }

            // Ensure SVG icon is visible
            const successIcon = clonedContent.querySelector('.success-icon svg');
            if (successIcon) {
              successIcon.style.stroke = '#000000';
            }
          }
        }
      }
    }).then(canvas => {
      // Show download section and new application button after capturing
      downloadSection.style.display = 'block';
      newAppButton.style.display = 'block';
      
      // Restore original text color
      successHeading.style.color = originalColor;
      
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      
      // Calculate dimensions to fit A4 page properly
      const margin = 10; // Reduced margin for better fit
      const maxWidth = pageWidth - (margin * 2);
      
      // Get the canvas aspect ratio
      const canvasAspectRatio = canvas.height / canvas.width;
      
      // Calculate dimensions to fit the content properly on A4
      let imgWidth = maxWidth;
      let imgHeight = imgWidth * canvasAspectRatio;
      
      // If the height exceeds the page height, scale it down
      if (imgHeight > (pageHeight - margin * 2)) {
        imgHeight = pageHeight - (margin * 2);
        imgWidth = imgHeight / canvasAspectRatio;
      }
      
      // Center the image horizontally
      const xOffset = (pageWidth - imgWidth) / 2;
      const yOffset = margin;
      
      const imgData = canvas.toDataURL('image/png', 1.0);
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
        <h2 className="success-heading" style={{ fontWeight: 'bold' }}>Application Submitted Successfully!</h2>
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