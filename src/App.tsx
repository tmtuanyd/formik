import React from 'react';
import {Formik, Field, Form, useField, FieldAttributes, FieldArray} from "formik";
import {Button, TextField, Checkbox, Radio, FormControlLabel, Select, MenuItem} from "@material-ui/core";
import * as yup from 'yup';
type MyRadioProps = {label: string} & FieldAttributes<{}>

const MyRadio: React.FC<MyRadioProps> = ({label, ...props}) => {
    const [field] = useField<{}>(props);
    return(
        <FormControlLabel {...field}  control={<Radio/>} label={label}/>
    )
}
const MyTextField: React.FC<FieldAttributes<{}>> = ({placeholder, ...props}) => {
    const [field, meta] = useField<{}>(props)
    const errorText = meta.error && meta.touched ? meta.error : '';
    return (
        <TextField placeholder={placeholder} {...field} helperText={errorText} error={!!errorText}/>
    )
}
const validationSchema = yup.object({
    firstName: yup.string().required().max(10),
    pets: yup.array().of(yup.object({
        name: yup.string().required()
    }))
})
function App() {
  return (
    <div>
        <Formik initialValues={{firstName: '', lastName: '', isTall: true, cookies: [], yogurt: '', pets: [{type: 'cat', name: 'jarvis', id: "" + Math.random()}]}}
                // validate={(values)=>{
                //     const errors:Record<string, string> = {}
                //     if(!values.firstName.includes('bob')){
                //         errors.firstName = 'no bob'
                //     }
                //     return errors
                // }}
                validationSchema={validationSchema}
                onSubmit={(data, {setSubmitting})=> {
            setSubmitting(true)
            //make async call
            console.log('submit', data)
            setTimeout(()=>setSubmitting(false), 1000)
        }}>
            {({values,errors, isSubmitting, handleChange, handleBlur, handleSubmit})=> (
                <Form>
                    <MyTextField placeholder={'first name'} name={'firstName'} type={'input'} as={TextField}/>

                    <div>
                        <Field placeholder={'last name'}name={'lastName'} type={'input'} as={TextField}/>
                    </div>

                    {/*<TextField name={'firstName'} value={values.firstName} onChange={handleChange} onBlur={handleBlur}/>*/}
                    {/*<TextField name={'lastName'} value={values.lastName} onChange={handleChange} onBlur={handleBlur}/>*/}
                    <Field name={'isTall'} type={'checkbox'}  as={Checkbox}/>
                    <div>cookies: </div>
                    <Field name={'cookies'} type={'checkbox'} value={'chocolate chip'} as={Checkbox}/>
                    <Field name={'cookies'} type={'checkbox'} value={'snickerdoodle'} as={Checkbox}/>
                    <Field name={'cookies'} type={'checkbox'} value={'sugar'} as={Checkbox}/>
                    <div>yogurt: </div>
                    {/*<Field name={'yogurt'} type={'radio'} value={'peach'} as={MyRadio} label={'peach'}/>*/}
                    {/*<Field name={'yogurt'} type={'radio'} value={'blueberry'} as={MyRadio}/>*/}
                    {/*<Field name={'yogurt'} type={'radio'} value={'apple'} as={MyRadio}/>*/}
                    <MyRadio name={'yogurt'} type={'radio'} value={'peach'} label={'peach'}/>
                    <MyRadio name={'yogurt'} type={'radio'} value={'blueberry'} label={'blueberry'}/>
                    <MyRadio name={'yogurt'} type={'radio'} value={'apple'} label={'apple'}/>
                    <div>
                        <Button disabled={isSubmitting} type={'submit'}>Submit</Button>
                    </div>
                    <FieldArray name={'pets'}>
                        {(arrayHelper) => {
                            return (
                                <div>
                                    <Button onClick={()=> arrayHelper.push({
                                        type: 'frog',
                                        name: '',
                                        id: "" + Math.random()
                                    })}>Add pet</Button>
                                    {values.pets.map((pet, index) => {
                                        return (
                                            <div key={pet.id}>
                                                <MyTextField placeholder={'pet name'} name={`pets.${index}.name`} />
                                                <Field name={`pets.${index}.type`} type={'select'} as={Select}>
                                                    <MenuItem value={'cat'}>cat</MenuItem>
                                                    <MenuItem value={'dog'}>dog</MenuItem>
                                                    <MenuItem value={'frog'}>frog</MenuItem>
                                                </Field>
                                                <Button onClick={()=>arrayHelper.remove(index)}>x</Button>
                                            </div>
                                        )
                                    })}
                                </div>
                            )
                        }
                        }
                    </FieldArray>
                    <pre>{JSON.stringify(values)}</pre>
                    <pre>{JSON.stringify(errors)}</pre>
                </Form>
            )}

        </Formik>
    </div>
  );
}

export default App;
