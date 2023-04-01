import React, { FC } from 'react'
import { usePWValidator } from './hooks/usePWValidator'
interface PasswordParams {
    password: string;   
  };

const PasswordChecker: FC<PasswordParams> = ({password}) => {
  return (
    <div>'usePWValidator(password)'</div>
  )
}

export default PasswordChecker

// import React, { FC } from 'react'
// import { usePWValidator } from './hooks/usePWValidator'

// interface PasswordParams {
//   password: string;
// };

// const PasswordChecker: FC<PasswordParams> = ({ password }) => {
//   const validationMessage = usePWValidator(password);

//   return (
//     {validationMessage}
//   )
// }
// export default PasswordChecker