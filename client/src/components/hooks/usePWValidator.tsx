import React, { useEffect, useState } from "react";

export function usePWValidator(password: string) {
  //         const [msg, setMsg] = useState('');
  //         let uppers = /[A-Z]/.test(password); // Есть хотя бы одна буква в верхнем регистре
  //         let lowers = /[a-z]/.test(password); // Есть хотя бы одна буква в нижнем регистре
  //         let numbers = /\d/.test(password); // Есть хотя бы одна цифра
  //         // Длина пароля не меньше 6-ми символов. Пароль использует только латинские буквы и цифры.
  //         let onlylatin = /^[A-Za-z\d]{6,}$/.test(password);
  //        // return uppers && lowers && numbers && onlylatin && {msg: msg};
  //        if (uppers == false){
  //         setMsg('One letter minimum must be in upper case')
  //        }
  //        else if(lowers == false){
  //         setMsg('at least one letter must be in lowercase')
  //        }
  //        else if(numbers == false){
  //         setMsg('Must be at least one digit')
  //        }
  //        else if(onlylatin == false){
  //         setMsg('Password length is at least 6 characters. The password uses only latin letters and numbers')
  //        }

  //        return msg || '';
 const [msg, setMsg] = useState('');

    let uppers = /[A-Z]/.test(password);
    let lowers = /[a-z]/.test(password);
    let numbers = /\d/.test(password);
    let onlylatin = /^[A-Za-z\d]{6,}$/.test(password);

    useEffect(() => {
      if (uppers == false) {
        setMsg('One letter minimum must be in upper case');
      } else if (lowers == false) {
        setMsg('At least one letter must be in lowercase');
      } else if (numbers == false) {
        setMsg('Must be at least one digit');
      } else if (onlylatin == false) {
        setMsg('Password length is at least 6 characters. The password uses only latin letters and numbers');
      } else {
        setMsg('');
      }
    }, [password]);

    return { msg };

//   const [errorMsg, setErrorMsg] = useState("");

//   let uppers = /[A-Z]/.test(password);
//   let lowers = /[a-z]/.test(password);
//   let numbers = /\d/.test(password);
//   let onlylatin = /^[A-Za-z\d]{6,}$/.test(password);

//   if (uppers === false) {
//     setErrorMsg("One letter minimum must be in upper case");
//   } else if (lowers === false) {
//     setErrorMsg("At least one letter must be in lowercase");
//   } else if (numbers === false) {
//     setErrorMsg("Must be at least one digit");
//   } else if (onlylatin === false) {
//     setErrorMsg(
//       "Password length is at least 6 characters. The password uses only latin letters and numbers"
//     );
//   }

//   return errorMsg ? <div>{errorMsg}</div> : null;
 }
