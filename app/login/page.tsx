import AcmeLogo from "@/app/ui/acme-logo";
import LoginForm from "@/app/ui/login-form";

const LoginPage = () => {
  return (
    <main className="flex justify-center items-center md:h-screen">
      <div className="relative flex flex-col w-full max-w-[400px] mx-auto p-4 space-y-2.5 md:mt-32">
        <div className="flex items-end w-full h-20 md:h-36 p-3 rounded-lg bg-blue-500">
          <div className="w-32 md:w-36 text-white">
            <AcmeLogo />
          </div>
        </div>
        <LoginForm />
      </div>
    </main>
  );
}
 
export default LoginPage;
