import * as Yup from 'yup';

export type FormErrors = Record<string, string>;

export type YupSchema<T extends Yup.AnyObject> = Yup.ObjectSchema<T>;

export const checkValidationErrors = async <T extends Yup.AnyObject, E>(
    validationSchema: YupSchema<T>,
    formData: E, 
    setErrors: React.Dispatch<React.SetStateAction<FormErrors>>
): Promise<boolean> => {    
    try{
        await validationSchema.validate(formData, { abortEarly: false });
        return true;
    } catch (err: unknown) {
        if (err instanceof Yup.ValidationError) {
            const errorsList: FormErrors = {};
            err.inner.forEach((error) => {
                if (error.path) {
                    errorsList[error.path] = error.message;                    
                }
            });
            setErrors(errorsList);            
        } else {
            console.error("Unexpected error:", err);
        }
        return false;
    }
}