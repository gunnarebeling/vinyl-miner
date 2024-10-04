import {AdvancedImage} from '@cloudinary/react';
import {Cloudinary} from "@cloudinary/url-gen";
import { Transformation } from '@cloudinary/url-gen'
import { thumbnail, scale } from "@cloudinary/url-gen/actions/resize";
import { byRadius } from "@cloudinary/url-gen/actions/roundCorners";
import { sepia } from "@cloudinary/url-gen/actions/effect";
import { source } from "@cloudinary/url-gen/actions/overlay";
import { byAngle } from "@cloudinary/url-gen/actions/rotate";
import { format } from "@cloudinary/url-gen/actions/delivery";
import { opacity, brightness } from "@cloudinary/url-gen/actions/adjust";
import { image } from "@cloudinary/url-gen/qualifiers/source";
import { Position } from "@cloudinary/url-gen/qualifiers/position";
import { png } from "@cloudinary/url-gen/qualifiers/format";
import { focusOn, compass } from "@cloudinary/url-gen/qualifiers/gravity";
import { face } from "@cloudinary/url-gen/qualifiers/focusOn";
import { removeBackground } from '@cloudinary/url-gen/actions/effect';

export const ProfileImg = ({profileImage}) => {
    const cld = new Cloudinary({
        cloud: {
          cloudName: 'dt2kpy8ox'
        }
      }); 
      const myImage = cld.image(profileImage).resize(thumbnail().width(100).height(100).gravity(focusOn(face())));
    return (
        <div className='' style={{ width: '100px', 
          height: '100px', borderRadius: '50%',  overflow: 'hidden' }} >
            <AdvancedImage cldImg={myImage} alt="User Avatar"  style={{width: '100%', height: '100%', objectFit: 'cover'}}/>
        </div>
    )
}

