import React, { useState } from 'react';
import Tesseract from 'tesseract.js';
import './OCRComponent.css';

const OCRComponent = () => {
  const [text, setText] = useState('');
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (event) => {
    setImage(URL.createObjectURL(event.target.files[0]));
    setText(''); // Clear the text when a new image is uploaded
  };

  const handleClick = () => {
    setIsLoading(true);
    Tesseract.recognize(
      image,
      'eng',
      {
        logger: (m) => console.log(m),
      }
    ).then(({ data: { text } }) => {
      setText(text);
      setIsLoading(false);
    }).catch((error) => {
      console.error(error);
      setIsLoading(false);
    });
  };

  return (
    <div className="container">
      <input type="file" onChange={handleChange} />
      <button onClick={handleClick} disabled={!image || isLoading}>
        Распознать текст
      </button>
      {isLoading && <p className="preloader">Распознавание текста...</p>}
      {text && <div className="recognized-text"><h3>Распознанный текст:</h3><p>{text}</p></div>}
      {image && <img src={image} alt="uploaded" />}
    </div>
  );
};

export default OCRComponent;
