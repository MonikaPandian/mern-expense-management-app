import React, { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { message } from 'antd';
import Spinner from '../components/Spinner'
import axios from "axios";

const ResetPassword = () => {
    const { id, token } = useParams();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const submitHandler = async (e) => {
        e.preventDefault();
        if (!password || !confirmPassword) {
            message.warning("Please fill all the fields");
            return;
        }
        if (!(password === confirmPassword)) {
            message.warning("Passwords do not match");
            return;
        }
        try {
            setLoading(true);
            await axios.post(`/users/reset-password/${id}/${token}`, { password })
            setLoading(false);
            message.success("Password updated successfully !!");
            navigate("/login");
        } catch (error) {
            setLoading(false);
            message.error(error.response.data);
        }
    };

    return (
        <div className='bg-default'>
            <div className="main-content">
                {/* Navbar */}
                <nav className="navbar navbar-top navbar-horizontal navbar-expand-md navbar-dark">
                    <div className="container px-4">
                        <span className="navbar-brand" style={{ fontSize: "20px", color: "white" }}>
                            Expense Management App
                        </span>

                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar-collapse-main" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon" />
                        </button>
                        <div className="collapse navbar-collapse" id="navbar-collapse-main">
                            {/* Collapse header */}
                            <div className="navbar-collapse-header d-md-none">
                                <div className="row">
                                    <div className="col-6 collapse-brand">
                                        <span>
                                            Expense Management App
                                        </span>
                                    </div>
                                    <div className="col-6 collapse-close">
                                        <button type="button" className="navbar-toggler" data-toggle="collapse" data-target="#navbar-collapse-main" aria-controls="sidenav-main" aria-expanded="false" aria-label="Toggle sidenav">
                                            <span />
                                            <span />
                                        </button>
                                    </div>
                                </div>
                            </div>
                            {/* Navbar items */}
                            <ul className="navbar-nav ml-auto">
                                <li className="nav-item">
                                    <Link to="/register" className="nav-link nav-link-icon">
                                        <i className="ni ni-circle-08" />&nbsp;&nbsp;
                                        <span className="nav-link-inner--text">Register</span>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/login" className="nav-link nav-link-icon">
                                        <i className="ni ni-key-25" />&nbsp;&nbsp;
                                        <span className="nav-link-inner--text">Login</span>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
                {/* Header */}

                <div className="header bg-gradient-primary py-7 py-lg-6">
                    <div className="container">
                        <div className="header-body text-center mb-7">
                            <div className="row justify-content-center">
                                <div className="col-lg-5 col-md-6">
                                    <h1 className="text-white">Welcome!</h1>
                                    <p className="text-lead text-light">Miss your expense history? signin to see your expenses💰.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="separator separator-bottom separator-skew zindex-100">
                        <svg x={0} y={0} viewBox="0 0 2560 100" preserveAspectRatio="none" version="1.1" xmlns="http://www.w3.org/2000/svg">
                            <polygon className="fill-default" points="2560 0 2560 100 0 100" />
                        </svg>
                    </div>
                </div>
                {/* Page content */}
                <div className="container mt--8 pb-5" >
                    <div className="row justify-content-center" >

                        <div className="col-lg-5 col-md-7">
                            {loading && <Spinner />}
                            <div className="card shadow border-0">

                                <div className="card-header bg-transparent">
                                    <div className="btn-wrapper text-center">
                                        <h2>Reset Password</h2>
                                    </div>
                                </div>
                                <div className="card-body px-lg-5 py-lg-5">
                                    <form onSubmit={submitHandler}>
                                        <div className="form-group">
                                            <div className="input-group input-group-alternative">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text"><i className="ni ni-lock-circle-open" /></span>
                                                </div>
                                                <input className="form-control" placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <div className="input-group input-group-alternative">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text"><i className="ni ni-lock-circle-open" /></span>
                                                </div>
                                                <input className="form-control" placeholder="Confirm password" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                                            </div>
                                        </div>
                                        <div className="text-center">
                                            <button type="submit" className="btn btn-primary my-4">Update</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Footer */}
            <footer className="py-5">
                <div className="container">
                    <div className="row align-items-center justify-content-xl-between">
                        <div className="col-xl-6">
                            <div className="copyright text-center text-xl-left text-muted text-white">
                                © <span href="#" className="font-weight-bold ml-1 text-light" target="_blank">Expense_Management_App</span>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default ResetPassword
