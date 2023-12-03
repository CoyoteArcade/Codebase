import { createFormActions } from '@mantine/form';
import type { FormValues } from './Upload';

export const uploadFormActions = createFormActions<FormValues>('upload-form');
