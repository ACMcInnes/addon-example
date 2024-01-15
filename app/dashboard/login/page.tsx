import Link from 'next/link'
import LoginForm from "@/components/callback/login-form";

export default function Login() {
  return (
    <>
    <div>
      <p>Login Page</p>
      <p>You cannot login at this time. Fill in your details below, or return <Link href="/">Home</Link>.</p>
      <br/>
      <LoginForm />
    </div>
    <div>
      <p>Want to provide feedback? (to do)</p>
    </div>
    </>
  );
}
