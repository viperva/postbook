 import React, { useState } from 'react';
// import { useForm } from 'react-hook-form';
// import { Trans, useTranslation } from 'react-i18next';
// import { Link } from 'react-router-dom';
// import { AxiosError } from 'axios';
// import clsx from 'clsx';
// import { SIGN_UP } from 'constants/selectors/authentication/register';
// import { signUp } from 'services/user';
// import { Button } from 'components/button';
// import { Input } from 'components/form';
// import {
//   EMAIL as EMAIL_REGEX,
//   NAME,
//   PASSWORD as PASSWORD_REGEX,
// } from 'helpers/validate';
// import { ReactComponent as Logo } from 'assets/img/logo.svg';
// import './authentication.scss';

// export enum RegisterInputNames {
//   EMAIL = 'email',
//   FIRST_NAME = 'first_name',
//   LAST_NAME = 'last_name',
//   POSITION = 'position',
//   PASSWORD = 'password',
//   REPEAT_PASSWORD = 'repeat_password',
// }

// const FinishRegister: React.FC = () => {
//   const { t } = useTranslation();
//   return (
//     <div
//       className={clsx(
//         'authentication',
//         'authentication--top',
//         SIGN_UP.FEEDBACK_CLASS
//       )}
//     >
//       <Logo className="authentication__logo" />
//       <span className="authentication__register-success">
//         {t('registration-success')}
//       </span>
//       <span className="authentication__register-success">
//         {t('registration-mail')}
//       </span>
//     </div>
//   );
// };

// export const Register: React.FC = () => {
//   const [message, setMessage] = useState('');
//   const [isRegisterFinished, setIsRegisterFinished] = useState(false);
//   const [loader, setLoader] = useState(false);
//   const { register, handleSubmit, watch, errors } = useForm();
//   const { t } = useTranslation();
//   const password = watch(RegisterInputNames.PASSWORD);

//   const submit = async (dataForm: Record<RegisterInputNames, string>) => {
//     setLoader(true);
//     try {
//       await signUp(dataForm);
//       setIsRegisterFinished(true);
//       setMessage('');
//     } catch (error) {
//       const axiosError = error as AxiosError;
//       const serverMessage = axiosError.response
//         ? axiosError.response.data.message
//         : axiosError.message;
//       if (serverMessage === 'User Already exists. Please login') {
//         setMessage(t('user-exists'));
//       } else {
//         setMessage(t('undefined-error'));
//       }
//     }
//     setLoader(false);
//   };

//   if (isRegisterFinished) {
//     return <FinishRegister />;
//   }
//   const registerValue = (regex: RegExp) =>
//     register({
//       required: true,
//       minLength: { value: 2, message: `${t('min-2-chars')}` },
//       maxLength: { value: 35, message: `${t('max-35-chars')}` },
//       pattern: {
//         value: regex,
//         message: `${t('name-only-chars')}`,
//       },
//     });
//   return (
//     <div className="authentication">
//       <Logo className="authentication__logo" />
//       <span className="authentication__title">{t('registration')}</span>
//       <form onSubmit={handleSubmit(submit)} className="authentication__form">
//         {message !== '' && message && (
//           <div
//             className={clsx(
//               'authentication__error-message',
//               SIGN_UP.FEEDBACK_CLASS
//             )}
//           >
//             {message}
//           </div>
//         )}
//         <Input
//           inputClassName={SIGN_UP.EMAIL_INPUT_CLASS}
//           errorClassName={SIGN_UP.EMAIL_ERROR_CLASS}
//           autoComplete="username"
//           label="Login"
//           name={RegisterInputNames.EMAIL}
//           placeholder="E-mail"
//           errors={errors}
//           register={register({
//             required: true,
//             pattern: {
//               value: EMAIL_REGEX,
//               message: `${t('invalid-email')}`,
//             },
//           })}
//         />
//         <Input
//           inputClassName={SIGN_UP.FIRST_NAME_INPUT_CLASS}
//           label={t('name')}
//           name={RegisterInputNames.FIRST_NAME}
//           type="text"
//           placeholder={t('enter-name')}
//           errors={errors}
//           register={registerValue(NAME)}
//         />
//         <Input
//           inputClassName={SIGN_UP.LAST_NAME_INPUT_CLASS}
//           label={t('last-name')}
//           name={RegisterInputNames.LAST_NAME}
//           type="text"
//           placeholder={t('enter-last-name')}
//           errors={errors}
//           register={registerValue(NAME)}
//         />
//         <Input
//           className={SIGN_UP.POSITION_INPUT_CLASS}
//           label={t('position')}
//           name={RegisterInputNames.POSITION}
//           type="text"
//           placeholder={t('enter-position')}
//           errors={errors}
//           register={registerValue(NAME)}
//         />
//         <Input
//           className={SIGN_UP.PASSWORD_INPUT_CLASS}
//           errorClassName={SIGN_UP.PASSWORD_ERROR_CLASS}
//           togglerClassName={SIGN_UP.TOGGLER_CLASS}
//           autoComplete="new-password"
//           label={t('password')}
//           name={RegisterInputNames.PASSWORD}
//           type="password"
//           placeholder={t('min-length', { length: 8 })}
//           errors={errors}
//           register={register({
//             required: true,
//             pattern: {
//               value: PASSWORD_REGEX,
//               message: `${t('password-invalid')}`,
//             },
//           })}
//         />
//         <Input
//           className={SIGN_UP.REPEAT_PASSWORD_INPUT_CLASS}
//           errorClassName={SIGN_UP.REPEAT_PASSWORD_ERROR_CLASS}
//           autoComplete="new-password"
//           label={t('password-rewrite')}
//           name={RegisterInputNames.REPEAT_PASSWORD}
//           type="password"
//           placeholder={t('password-rewrite')}
//           errors={errors}
//           register={register({
//             required: true,
//             validate: (value) =>
//               value === password || `${t('passwords-differ')}`,
//           })}
//         />
//         <Button
//           className={clsx('authentication__submit', SIGN_UP.SUBMIT_CLASS)}
//           type="submit"
//           variant="primary"
//           loading={loader}
//         >
//           {t('register')}
//         </Button>
//       </form>
//       <Link to="/" className="authentication__login-link">
//         <Trans i18nKey="have-account">
//           Have account? <span className="authentication__text-blue">Login</span>
//         </Trans>
//       </Link>
//     </div>
//   );
// };

// export default Register;
