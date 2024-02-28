import Link from 'next/link'

export default function Assets() {
  return (
    <>
      <p>Assets</p>
      <p>Return <Link href="/" className="text-sky-500">Home</Link></p>
    </>
  );
}
