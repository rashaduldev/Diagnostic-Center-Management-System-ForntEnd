import { useContext } from "react";
import { AuthContext } from "../Components/Auth/AuthProvider";
import ExtraLogin from "../Components/Extralogin";

const Login = () => {
  const { signIn } = useContext(AuthContext);

  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log(password, email);
    signIn(email, password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        let timerInterval;
        Swal.fire({
          title: "Login Successfully!",
          html: "I will close in <b></b> milliseconds.",
          timer: 2000,
          timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading();
            const timer = Swal.getPopup().querySelector("b");
            timerInterval = setInterval(() => {
              timer.textContent = `${Swal.getTimerLeft()}`;
            }, 100);
          },
          willClose: () => {
            clearInterval(timerInterval);
          },
        }).then((result) => {
          /* Read more about handling dismissals below */
          if (result.dismiss === Swal.DismissReason.timer) {
            console.log("I was closed by the timer");
          }
        });
        Navigate(from, { replace: true });
      })
      .catch((err) => {
        console.log("email or password not match");
        console.log(err.message);
      });
  };
    return (
        <div>
      {/* <Helmet>
        <title>Tourist | Login</title>
      </Helmet> */}

      <div className="bg-base-100 w-full my-10">
        <div className="flex flex-col lg:flex-row justify-center ">
          <div className="text-center flex-1  max-w-lg lg:text-left mx-auto">
            <h1 className="text-5xl font-bold text-center mb-9">Login now!</h1>
            <img src="https://i.ibb.co/7Jy41BM/authentication2.png" alt="" />
          </div>
          <div className="max-w-md flex-1 p-10 bg-base-200 mx-auto rounded-lg">
            {/* <!-- Form --> */}
            <form onSubmit={handleLogin}>
              <div className="grid gap-y-4">
                {/* <!-- Form Group --> */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm mb-2 dark:text-white"
                  >
                    Email address
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="email"
                      className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                      required
                      aria-describedby="email-error"
                    />
                    <div className="hidden absolute inset-y-0 end-0 flex items-center pointer-events-none pe-3">
                      <svg
                        className="h-5 w-5 text-red-500"
                        width="16"
                        height="16"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                        aria-hidden="true"
                      >
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                      </svg>
                    </div>
                  </div>
                  <p
                    className="hidden text-xs text-red-600 mt-2"
                    id="email-error"
                  >
                    Please include a valid email address so we can get back to
                    you
                  </p>
                </div>
                {/* <!-- End Form Group --> */}

                {/* <!-- Form Group --> */}
                <div>
                  <div className="flex justify-between items-center">
                    <label
                      htmlFor="password"
                      className="block text-sm mb-2 dark:text-white"
                    >
                      Password
                    </label>
                    <a
                      className="text-sm text-blue-600 decoration-2 hover:underline font-medium dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                      href="../examples/html/recover-account.html"
                    >
                      Forgot password?
                    </a>
                  </div>
                  <div className="relative">
                    <input
                    //   type={!showPassword ? "password" : "text"}
                      id="password"
                      name="password"
                      placeholder="password"
                      className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                      required
                      aria-describedby="password-error"
                    />
                    {/* <div
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute top-[10px] right-3"
                    >
                      {showPassword ? (
                        <button>
                          {" "}
                          <FaEye></FaEye>
                        </button>
                      ) : (
                        <button>
                          <FaEyeSlash></FaEyeSlash>
                        </button>
                      )}
                    </div> */}
                    <div className="hidden absolute inset-y-0 end-0 flex items-center pointer-events-none pe-3">
                      <svg
                        className="h-5 w-5 text-red-500"
                        width="16"
                        height="16"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                        aria-hidden="true"
                      >
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                      </svg>
                    </div>
                  </div>
                  <p
                    className="hidden text-xs text-red-600 mt-2"
                    id="password-error"
                  >
                    8+ characters required
                  </p>
                </div>
                {/* <!-- End Form Group --> */}

                <button
                  type="submit"
                  className="w-full mt-5 py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                >
                  Log in
                </button>
              </div>
            </form>
            {/* <!-- End Form --> */}
            <p className="text-center mt-7">
              Do not have an account ?{" "}
              <a className="text-blue-700 underline" href="register">
                Please signup
              </a>{" "}
            </p>
            <ExtraLogin></ExtraLogin>
          </div>
        </div>
      </div>
    </div>
    );
};

export default Login;