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
    case 'Android':
      platformElement = Android;
      break;
    case 'Apple':
      platformElement = Apple;
      break;
    case 'Linux':
      platformElement = Linux;
      break;
    case 'Web':
      platformElement = Web;
      break;
    case 'Windows':
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
