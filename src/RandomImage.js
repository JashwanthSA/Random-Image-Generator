import React, { useState } from 'react';
import axios from 'axios';

const RandomImage = () => {
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState('nature');
  const [width, setWidth] = useState('640');
  const [height, setHeight] = useState('480');
  const [imageBlob,setImageBlob]=useState(null);

  const fetchImage = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://api.api-ninjas.com/v1/randomimage', {
        headers: {
          'X-Api-Key': 'WnM3Ttvr831dO5VnOI5lHw==n7wJz28nxDyOGzyN',
          'Accept': 'image/jpg'
        },
        params: {
          category,
          width,
          height
        },
        responseType: 'arraybuffer'
      });
      const blob = new Blob([response.data], { type: 'image/jpg' });
      const imageObjectUrl = URL.createObjectURL(blob);
      setImageBlob(blob);
      setImageUrl(imageObjectUrl);
    } catch (error) {
      console.error('Error: ', error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };
  const handleImageClick = () => {
    if (imageBlob) {
      const link = document.createElement('a');
      link.href = imageUrl;
      link.download = `random-image-`+category+`.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };
  const desStyle={
    fontFamily: "Roboto, sans-serif",
  fontWeight: "400",
  fontStyle: "normal"
  }
  return (
    <div>
    <p style={desStyle}>Select the category, height and width of image and click 'Get Random Image' to proceed. Note that the height and width values should be between 1 to 5000. Click the image to download it.</p>
      <div>
        <label>
          Category:
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option name='nature'>Nature</option>
        <option name='city'>City</option>
        <option name='technology'>Technology</option>
        <option name='food'>Food</option>
        <option name='still_life'>Still Life</option>
        <option name='abstract'>Abstract</option>
        <option name='wildlife'>Wildlife</option>
      </select>
        </label>
        <label>
          Width:
          <input
            type="number"
            value={width}
            onChange={(e) => setWidth(e.target.value)}
            placeholder="Enter width"
          />
        </label>
        <label>
          Height:
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            placeholder="Enter height"
          />
        </label>
        <button onClick={fetchImage}>Get Random Image</button>
        <br/>
      </div>
      
      {loading ? <div class='loaddiv'><div class="loader"></div></div> : imageUrl && <img src={imageUrl} alt="Random" onClick={handleImageClick} style={{cursor:'pointer'}}/>}
    </div>
  );
};

export default RandomImage;
