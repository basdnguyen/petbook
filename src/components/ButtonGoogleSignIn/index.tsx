import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useRouter } from "next/navigation";

interface Props {
  setIsProcessing: (value: boolean) => void;
}

export const ButtonGoogleSignIn = ({ setIsProcessing }: Props) => {
  const router = useRouter();

  const onGoogleSignIn = async (credentialResponse: CredentialResponse) => {
    setIsProcessing(true);
    const { data: { jwt } } = await axios.post('/api/auth/google', {
      token: credentialResponse.credential,
      client_id: credentialResponse.clientId,
    });
    localStorage.setItem('jwt', jwt);
    setIsProcessing(false);
    router.push('/');
  }

  const onError = () => {
  }

  return <GoogleLogin onSuccess={onGoogleSignIn} onError={onError} />
}