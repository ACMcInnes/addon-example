'use client'
 
import { useFormStatus } from 'react-dom'
 
export function SubmitButton() {
  const { pending } = useFormStatus()
 
  return (
    <button type="submit" aria-disabled={pending} className="inline-block ml-1 py-2 px-4 rounded-md text-gray-100 bg-sky-500 border-transparent">
      Submit
    </button>
  )
}
