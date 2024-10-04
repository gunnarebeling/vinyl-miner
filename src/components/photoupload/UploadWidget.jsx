
import { useEffect, useRef } from "react"


export const UploadWidget = ({dispatch}) => {
    const cloudindaryRef = useRef()
    const widgetRef = useRef()
    


    useEffect(() => {
        cloudindaryRef.current = window.cloudinary;
        widgetRef.current = cloudindaryRef.current.createUploadWidget({
            cloudName: 'dt2kpy8ox',
            uploadPreset: 'hwivfpg6'
        }, (error,result) => {
           
            if (!error && result && result.event === "success") {
                
                const uploadedImageUrl = result.info.public_id || 'emptyAvatar.png';
      
                dispatch({
                  type: 'handleInput',
                  field: "profileImage",
                  value: uploadedImageUrl
                });
              } else if (error) {
                console.error("Upload error:", error);
              }
            }
          );
        }, [dispatch]);
    return (
        <button onClick={() => widgetRef.current?.open()}>Upload Photo</button>


    )
}