import { FaFacebook, FaGithub, FaGoogle } from "react-icons/fa6";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosPublick from "../Hooks/useAxiosPublick";
import useAuth from "../Hooks/useAuth";

const ExtraLogin = () => {
    const {googleSignin}=useAuth();
    const navigate=useNavigate();
    const Location=useLocation();
    const from=Location.state?.from?.pathname || "/";
    console.log("pathname: ", Location.state);
    const axiosPublic=useAxiosPublick();

    const handleGoogleSignin =()=>{
        googleSignin()
        .then(res=>{
            console.log(res);
            const userInfo={
              email:res.user?.email,
              name:res.user?.displayName
            }
            axiosPublic.post('/users',userInfo)
            .then(res=>{
              console.log(res.data);
            });
            // reset();
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Login Successfully",
            showConfirmButton: false,
            timer: 1500
          });
          navigate(from,{replace:true});
        })
    }
  return (
    <div className="px-4 flex flex-col lg:flex-row gap-3 mx-auto mt-10 justify-center w-full py-4">
      <div 
      onClick={handleGoogleSignin}
      className="btn btn-primary flex items-center gap-2 text-xl">
        
        <button type="button" className="py-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg text-white disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
        <FaGoogle></FaGoogle>
        Google
      </button>
      </div>
      <div 
      onClick={handleGoogleSignin}
      className="btn btn-primary flex items-center gap-2 text-xl">
        
        <button type="button" className="py-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg text-white disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
        <FaFacebook></FaFacebook>
        Facebook
      </button>
      </div>
      <div 
      onClick={handleGoogleSignin}
      className="btn btn-primary flex items-center gap-2 text-xl">
        
        <button type="button" className="py-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg text-white disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
        <FaGithub></FaGithub>
        Github
      </button>
      </div>
    </div>
  );
};

export default ExtraLogin;
