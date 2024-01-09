import Link from 'next/link'

export default function Login() {
  return (
    <div>
      <p>Login Page</p>
      <p>You cannot login at this time. return to <Link href="/dashboard">Dashboard</Link>.</p>
    </div>
  );
}
