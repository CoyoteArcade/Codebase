import { ThemeIcon } from '@mantine/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAndroid as Android,
  faApple as Apple,
  faLinux as Linux,
  faWindows as Windows,
} from '@fortawesome/free-brands-svg-icons';
import { faGlobe as Web } from '@fortawesome/free-solid-svg-icons';

import classes from './PlatformIcon.module.css';

function PlatformIcon({ platform }: { platform: string }) {
  let platformElement: any = '';

  switch (platform) {
    case 'android':
      platformElement = Android;
      break;
    case 'mac':
      platformElement = Apple;
      break;
    case 'linux':
      platformElement = Linux;
      break;
    case 'web':
      platformElement = Web;
      break;
    case 'windows':
      platformElement = Windows;
      break;
  }

  return (
    <>
      {platformElement === '' || (
        <ThemeIcon classNames={{ root: classes.root }} aria-label="platform icon">
          <FontAwesomeIcon icon={platformElement} className={classes.icon} />
        </ThemeIcon>
      )}
    </>
  );
}

export default PlatformIcon;
