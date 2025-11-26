//Ignore infinite reload in dev server, works in production
import { Button } from '@/components/ui/button'
import { HomeIcon } from 'lucide-react'
import Link from 'next/link'

export default function NotFound() {
    return (
        <div className='flex flex-col justify-center items-center py-10'>
            <h2 className='text-2xl font-extrabold'>Not Found</h2>
            <p>Could not find requested resource</p>
            <Link href="/">
                <Button className='mt-3 bg-radyonatin-blue hover:bg-radyonatin-blue/90 text-white'>
                    <HomeIcon className='mr-2 h-4 w-4' />
                    Return Home
                </Button>
            </Link>
        </div>
    )
}