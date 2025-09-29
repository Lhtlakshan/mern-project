import React, { useState } from "react";

const ImageSlider = (props) => {
  const imagess = props.images;
  const [activeImage, setActiveImage] = useState(imagess[0])

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-[80%] aspect-square bg-green-800 relative">
        <img src={activeImage} alt="" className="w-full h-full object-cover"/>
        <div className="w-full h-[100px] bg-red-400 backdrop-blur-3xl absolute bottom-0 flex justify-center items-center">
          {imagess.map((image, index) => (
            <img
              key={index}
              src={image}
              alt=""
              className="h-full aspect-square pt-[8px] pb-[8px] cursor-pointer"
              onClick={()=>{
                setActiveImage(image)
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageSlider;
