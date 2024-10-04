import {AdvancedImage} from '@cloudinary/react';
import {Cloudinary} from "@cloudinary/url-gen";
import { thumbnail} from "@cloudinary/url-gen/actions/resize";
import { focusOn } from "@cloudinary/url-gen/qualifiers/gravity";
import { face } from "@cloudinary/url-gen/qualifiers/focusOn";


export const ProfileImg = ({profileImage, navPic = false}) => {
  
    const cld = new Cloudinary({
        cloud: {
          cloudName: 'dt2kpy8ox'
        }
      }); 
      let picSize = navPic ? 50 : 150
      
      const myImage = profileImage ?
      cld.image(profileImage).resize(thumbnail().width(picSize).height(picSize).gravity(focusOn(face()))) :
      cld.image('rzkqpgmp75zmjzx90i8n').resize(thumbnail().width(picSize).height(picSize).gravity(focusOn(face())));
    return (
        <div className='' 
          style={{ 
            width: `${picSize}px`, 
            height: `${picSize}px`, 
            borderRadius: '50%',  
            overflow: 'hidden' 
          }} 
        >
            <AdvancedImage 
              cldImg={myImage} 
              alt="User Avatar"  
              style={{width: '100%', height: '100%', objectFit: 'cover'}}
            />
        </div>
    )
}

