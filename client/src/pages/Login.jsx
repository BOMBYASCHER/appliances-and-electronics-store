import { useEffect, useState } from "react";
import { useLoginMutation } from "../slices/api/authApi";
import { useNavigate } from "react-router";

const Login = () => {
  const [login, { isSuccess }] = useLoginMutation();
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
 
  const handleForm = (e) => {
    e.preventDefault();
    login({ phone, password });
    // navigate(-1);
  };

  useEffect(() => {
    if (isSuccess) {
      console.log('IS SUCCESS')
      navigate(-1);
    }
    
  }, [isSuccess]);

  const handlePhone = ({ target: { value } }) => {
    setPhone(value);
  };

  const handlePassword = ({ target: { value } }) => {
    setPassword(value);
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-100">
      <form className="d-grid gap-2 w-25" onSubmit={(e) => handleForm(e)}>
        <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
        <div className="form-floating">
          <input
            type="tel"
            className="form-control"
            id="floatingInput"
            placeholder="+22 607 123 4567"
            value={phone}
            onChange={(e) => handlePhone(e)}
          />
          <label for="floatingInput">Phone</label>
        </div>
        <div className="form-floating">
          <input
            type="password"
            className="form-control"
            id="floatingPassword"
            placeholder="password"
            value={password}
            onChange={(e) => handlePassword(e)}
          />
          <label for="floatingPassword">Password</label>
        </div>
        <button className="btn btn-primary w-100 py-2" type="submit">Sign in</button>
      </form>
    </div>
  );
};

export default Login;
