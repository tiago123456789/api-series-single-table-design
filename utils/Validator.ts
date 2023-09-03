import * as yup from 'yup';

export const getValidationErrors = async (
  validationSchema: yup.ObjectSchema<any>,
  body: { [key: string]: any },
): Promise<any> => {
  try {
    await validationSchema.validate(body, { abortEarly: false });
    return null;
  } catch (error) {
    // @ts-ignore
    return error?.errors || null;
  }
};
