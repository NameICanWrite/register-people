import { useState } from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import cropImageNow from '../utils/cropImageNow';
import dataURLtoFile from '../utils/dataUrlToFile';
  
export default function CropImageButton({onChangeFile, selectedFile, preview}) {
  const [crop, setCrop] = useState(null);
  const [image, setImage] = useState(null);
  const [showCrop, setShowCrop] = useState(false)
  

  
  return (
        <div>
          {!showCrop && <button className="cropImageButton" type="button" onClick={() => setShowCrop(true)}>Обрізати</button>}
          {showCrop && <button className="cropImageButton" type='button' onClick={() => {
                setShowCrop(false)
                cropImageNow(crop, image, onChangeFile)
                setCrop(null)
              }}>Підтвердити</button>
          }
          {showCrop && (
            <div className='cropImageWrapper'>
              <ReactCrop src={preview} 
                crop={crop} onChange={setCrop}>
                  <img src={preview} alt="" onLoad={(e) => setImage(e.currentTarget)} />
              </ReactCrop>
            </div>
          )}
          
        </div>
  );
}
  