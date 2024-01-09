import Link from 'next/link'

export default function Dashboard() {
  return (
    <div>
      <p>Your dashboard</p>
      <p>Return to <Link href="/">Home</Link>.</p>
    </div>
  );
}
