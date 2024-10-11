
import { useEffect, useRef } from "react"


export const UploadWidget = ({dispatch,register, setUser, user}) => {
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
                if (register) {
                  let copy = 
                  {...user,
                    profileImage: uploadedImageUrl
                  }
                  setUser(copy)
                }else{
                  dispatch({
                    type: 'handleInput',
                    field: "profileImage",
                    value: uploadedImageUrl
                  });
                }
              } else if (error) {
                console.error("Upload error:", error);
              }
            }
          );
        }, [dispatch, setUser, user , register]);
        
    return (
        <button 
          className=" btn btn-outline-primary mt-3" 
          onClick={() =>  widgetRef.current?.open()}>{register ? 
            "upload profile pic" : "Change Profile Picture"}
        </button>
    )
}