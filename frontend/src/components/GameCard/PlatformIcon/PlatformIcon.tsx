import { ThemeIcon } from '@mantine/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAndroid as Android,
  faApple as Apple,
  faLinux as Linux,
  faWindows as Windows,
} from '@fortawesome/free-brands-svg-icons';

import classes from './PlatformIcon.module.css';

function PlatformIcon({ platform }: { platform: string }) {
  let platformElement: any = undefined;

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
    case 'Windows':
      platformElement = Windows;
      break;
  }

  return (
    <ThemeIcon classNames={{ root: classes.root }} aria-label="platform icon">
      <FontAwesomeIcon icon={platformElement} className={classes.icon} />
    </ThemeIcon>
  );
}

export default PlatformIcon;
