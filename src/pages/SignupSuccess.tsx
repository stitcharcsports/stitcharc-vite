import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function SignupSuccess() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="w-full max-w-md text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
          <Check className="h-6 w-6 text-green-600" />
        </div>
        <h2 className="mt-3 text-2xl font-bold text-gray-900">Registration Successful!</h2>
        <p className="mt-2 text-gray-600">Your account has been created successfully.</p>
        <Button 
          onClick={() => navigate('/login')} 
          className="mt-6"
        >
          Click here to login
        </Button>
      </div>
    </div>
  );
}