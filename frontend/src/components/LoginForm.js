// import React, {useState} from 'react';
// import {login} from '../api/auth';
// import {setAuthToken} from '../context/AuthContext';
//
// const LoginForm = () => {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [error, setError] = useState(null);
//
//     const handleSubmit = async e => {
//         e.preventDefault();
//         try {
//             const res = await login(email, password);
//             setAuthToken(res.data.access, res.data.refresh);
//         } catch (e) {
//             setError('Invalid email or password');
//         }
//     };
//
//     return (
//         <form onSubmit={handleSubmit}>
//             {error && <p>{error}</p>}
//             <input
//                 type="text"
//                 placeholder="Email"
//                 value={email}
//                 onChange={e => setEmail(e.target.value)}
//             />
//             <input
//                 type="password"
//                 placeholder="Password"
//                 value={password}
//                 onChange={e => setPassword(e.target.value)}
//             />
//             <button type="submit">Log in</button>
//         </form>
//     );
// };
//
// export default LoginForm;